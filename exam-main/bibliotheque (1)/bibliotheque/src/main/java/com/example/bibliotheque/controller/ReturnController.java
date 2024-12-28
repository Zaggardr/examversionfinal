package com.example.bibliotheque.controller;

import com.example.bibliotheque.model.Book;
import com.example.bibliotheque.model.Borrow;
import com.example.bibliotheque.model.ReturnRequest;
import com.example.bibliotheque.repository.BookRepository;
import com.example.bibliotheque.repository.BorrowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ReturnController {

    @Autowired
    private BorrowRepository borrowRepository;

    @Autowired
    private BookRepository bookRepository;

    @PostMapping("/returns")
    public ResponseEntity<String> returnBook(@RequestBody ReturnRequest returnRequest) {
        // Recherche de l'emprunt
        Optional<Borrow> borrow = borrowRepository.findByBookIdAndUserEmail(returnRequest.getBookId(), returnRequest.getUserEmail());

        if (borrow.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Emprunt non trouvé.");
        }

        Borrow borrowRecord = borrow.get();
        borrowRecord.setReturnDate(LocalDate.now());
        borrowRecord.setReturned(true); // Marque l'emprunt comme retourné
        borrowRepository.save(borrowRecord);

        // Mise à jour du statut du livre
        Book book = bookRepository.findById(returnRequest.getBookId())
                .orElseThrow(() -> new RuntimeException("Livre introuvable"));
        book.setBookStatus(Book.BookStatus.DISPONIBLE);
        bookRepository.save(book);

        return ResponseEntity.ok("Retour effectué avec succès.");
    }
}



