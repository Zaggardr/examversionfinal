package com.example.bibliotheque.controller;

import com.example.bibliotheque.model.Book;
import com.example.bibliotheque.model.User;
import com.example.bibliotheque.repository.BookRepository;
import com.example.bibliotheque.repository.UserRepository;
import com.example.bibliotheque.service.BookService;
import com.example.bibliotheque.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private FileService fileService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> addBook(
            @RequestParam String title,
            @RequestParam String author,
            @RequestParam String category,
            @RequestParam String description,
            @RequestParam(required = false) MultipartFile image) {
        try {
            String imageUrl = null;
            if (image != null && !image.isEmpty()) {
                imageUrl = fileService.saveFile(image);  // Sauvegarder l'image et récupérer l'URL
            }

            // Créer un objet Book avec les informations reçues
            Book book = new Book();
            book.setTitle(title);
            book.setAuthor(author);
            book.setCategory(category);
            book.setDescription(description);
            book.setImageUrl(imageUrl);

            // Sauvegarder le livre dans la base de données
            Book savedBook = bookService.addBook(book);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedBook);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors du traitement de l'image : " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur interne : " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book updatedBook) {
        Book updated = bookService.updateBook(id, updatedBook);
        if (updated != null) {
            return new ResponseEntity<>(updated, HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        boolean isDeleted = bookService.deleteBook(id);
        if (isDeleted) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping("/{id}/borrow")
    public ResponseEntity<String> borrowBook(@PathVariable Long id,
                                             @RequestParam String userEmail) {
        Optional<Book> optionalBook = bookRepository.findById(id);
        if (optionalBook.isPresent()) {
            Book book = optionalBook.get();

            // Vérifier si le livre est déjà emprunté
            if (book.getBookStatus() == Book.BookStatus.EMPRUNTE) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Le livre est déjà emprunté");
            }

            Optional<User> optionalUser = userRepository.findByEmail(userEmail);
            if (optionalUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("L'utilisateur n'existe pas");
            }

            User user = optionalUser.get();
            try {
                // Appeler le service pour emprunter le livre avec la date actuelle et la date de retour (7 jours plus tard)
                bookService.borrowBook(id, user);

                return ResponseEntity.status(HttpStatus.OK)
                        .body("Emprunt enregistré avec succès : " + book.getTitle());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Erreur lors de l'emprunt du livre : " + e.getMessage());
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Livre non trouvé");
        }
    }




    @PutMapping("/{id}/return")
    public ResponseEntity<String> returnBook(@PathVariable Long id) {
        Optional<Book> optionalBook = bookRepository.findById(id);
        if (optionalBook.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Livre introuvable avec ID : " + id);
        }

        Book book = optionalBook.get();
        if (book.getBookStatus() == Book.BookStatus.DISPONIBLE) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Le livre n'a pas été emprunté ou a déjà été retourné.");
        }

        // Retourner le livre
        book.setBookStatus(Book.BookStatus.DISPONIBLE);
        book.setBorrowDate(null);
        book.setReturnDate(LocalDate.now());
        bookRepository.save(book);

        return ResponseEntity.ok("Livre retourné avec succès.");
    }

    @GetMapping("/search")
    public List<Book> searchBooks(@RequestParam(required = false) String query,
                                  @RequestParam(required = false) String title,
                                  @RequestParam(required = false) String author,
                                  @RequestParam(required = false) String category) {
        if (query != null) {
            return bookService.searchBooks(query);
        } else {
            return bookService.searchBooks(title, author, category);
        }
    }

    @GetMapping
    public List<Book> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        for (Book book : books) {
            if (book.getBookStatus() == Book.BookStatus.EMPRUNTE) {
                book.setBookStatus(Book.BookStatus.EMPRUNTE);  // Mettre à jour le statut si emprunté
            } else {
                book.setBookStatus(Book.BookStatus.DISPONIBLE); // Mettre à jour le statut si disponible
            }
        }
        return books;
    }
}
