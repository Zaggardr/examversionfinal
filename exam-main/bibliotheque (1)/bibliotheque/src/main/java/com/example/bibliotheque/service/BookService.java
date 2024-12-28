package com.example.bibliotheque.service;

import com.example.bibliotheque.model.Book;
import com.example.bibliotheque.model.Borrow;
import com.example.bibliotheque.model.User;
import com.example.bibliotheque.repository.BookRepository;
import com.example.bibliotheque.repository.BorrowRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeParseException;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;
    private static final Logger logger = LoggerFactory.getLogger(BookService.class);
    @Autowired
    private BorrowRepository borrowRepository;

    // Ajouter un livre
    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    // Modifier un livre
    // Modifier un livre
    public Book updateBook(Long id, Book updatedBook) {
        if (bookRepository.existsById(id)) {
            Book existingBook = bookRepository.findById(id).orElse(null);
            if (existingBook != null) {
                // Mettre à jour les champs du livre existant sans toucher à l'ID
                existingBook.setTitle(updatedBook.getTitle());
                existingBook.setAuthor(updatedBook.getAuthor());
                existingBook.setCategory(updatedBook.getCategory());
                existingBook.setBookStatus(Book.BookStatus.EMPRUNTE);
                existingBook.setBorrowDate(updatedBook.getBorrowDate());
                existingBook.setReturnDate(updatedBook.getReturnDate());
                return bookRepository.save(existingBook);
            }
        }
        return null;
    }


    // Supprimer un livre
    public boolean deleteBook(Long id) {
        // Vérifie si le livre existe
        Book book = bookRepository.findById(id).orElse(null);
        if (book != null) {
            // Supprimer le livre si trouvé
            bookRepository.delete(book);
            return true;  // Retourne vrai si la suppression a réussi
        }
        return false;  // Retourne faux si le livre n'a pas été trouvé
    }

    // Rechercher un livre par titre, auteur ou catégorie
    public List<Book> searchBooks(String query) {
        return bookRepository.findByTitleContainingOrAuthorContainingOrCategoryContaining(query, query, query);
    }

    // Consulter tous les livres
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // Emprunter un livre
    @Transactional
    public void borrowBook(Long id, User user) {
        logger.info("Tentative d'emprunt du livre avec ID: {}", id);

        // Récupérer le livre par son ID
        Book book = bookRepository.findById(id).orElseThrow(() -> {
            logger.error("Le livre avec ID {} n'existe pas", id);
            return new IllegalArgumentException("Le livre avec l'ID " + id + " n'existe pas");
        });

        // Vérifier si le livre est déjà emprunté
        if (Book.BookStatus.EMPRUNTE.equals(book.getBookStatus())) {
            logger.warn("Le livre {} est déjà emprunté", book.getTitle());
            throw new IllegalStateException("Le livre est déjà emprunté");
        }

        // Définir la date courante pour borrowDate
        LocalDate borrowLocalDate = LocalDate.now();

        // Définir la date de retour comme la date courante + 7 jours
        LocalDate returnLocalDate = borrowLocalDate.plusDays(7);

        // Mise à jour du statut du livre et ajout des dates
        book.setBookStatus(Book.BookStatus.EMPRUNTE); // Mettre à jour le statut du livre
        book.setBorrowDate(borrowLocalDate);
        book.setReturnDate(returnLocalDate);

        // Sauvegarder le livre mis à jour
        bookRepository.save(book);

        // Créer un nouvel emprunt
        Borrow borrow = new Borrow();
        borrow.setBook(book);
        borrow.setUser(user);
        borrow.setBorrowDate(borrowLocalDate);
        borrow.setReturnDate(returnLocalDate);
        borrow.setReturned(false);
        borrow.setNotificationSent(false);

        // Sauvegarder l'emprunt
        borrowRepository.save(borrow);

        logger.info("Le livre '{}' a été emprunté avec succès", book.getTitle());
    }










    // Méthode pour convertir Date en LocalDate
    private LocalDate convertToLocalDate(Date date) {
        return date.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
    }

    // Méthode pour retourner un livre
    public String returnBook(Long borrowId) {
        Borrow borrow = borrowRepository.findById(borrowId)
                .orElseThrow(() -> new RuntimeException("Emprunt introuvable avec ID : " + borrowId));

        Book book = borrow.getBook();

        if (book.getBookStatus() != Book.BookStatus.EMPRUNTE) {
            return "Le livre n'est pas emprunté ou a déjà été retourné.";
        }

        book.returnBook(); // Mise à jour du statut avec la méthode utilitaire
        bookRepository.save(book);

        borrow.setReturned(true);
        borrowRepository.save(borrow);

        return "Livre retourné avec succès.";
    }


    public List<Book> searchBooks(String title, String author, String category) {
        return bookRepository.findAll().stream()
                .filter(book -> (title == null || book.getTitle().toLowerCase().contains(title.toLowerCase())) &&
                        (author == null || book.getAuthor().toLowerCase().contains(author.toLowerCase())) &&
                        (category == null || book.getCategory().toLowerCase().contains(category.toLowerCase())))
                .collect(Collectors.toList());
    }

    // Récupérer un livre par son ID
    public Book getBookById(Long id) {
        return bookRepository.findById(id).orElse(null);
    }


}
