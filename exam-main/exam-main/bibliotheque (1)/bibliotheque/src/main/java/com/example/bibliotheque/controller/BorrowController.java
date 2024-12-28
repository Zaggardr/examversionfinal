package com.example.bibliotheque.controller;

import com.example.bibliotheque.model.Book;
import com.example.bibliotheque.model.Borrow;
import com.example.bibliotheque.model.BorrowRequest;
import com.example.bibliotheque.model.User;
import com.example.bibliotheque.repository.BookRepository;
import com.example.bibliotheque.repository.BorrowRepository;
import com.example.bibliotheque.repository.UserRepository;
import com.example.bibliotheque.service.BorrowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@RestController
@RequestMapping("/api/borrows")
public class BorrowController {

    @Autowired
    private BorrowRepository borrowRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<Void> borrowBook(@RequestBody BorrowRequest borrowRequest) {
        Logger logger = LoggerFactory.getLogger(BorrowController.class);

        try {
            logger.info("Requête d'emprunt pour l'email : {}", borrowRequest.getUserEmail());

            // Vérification de l'utilisateur dans la base de données
            Optional<User> userOptional = userRepository.findByEmail(borrowRequest.getUserEmail());

            if (userOptional.isEmpty()) {
                logger.warn("Utilisateur non trouvé pour l'email : {}", borrowRequest.getUserEmail());
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();  // Retourner 404 si utilisateur non trouvé
            }

            User user = userOptional.get();

            // Recherche du livre dans la base de données
            Book book = bookRepository.findById(borrowRequest.getBookId())
                    .orElseThrow(() -> new IllegalArgumentException("Livre non trouvé"));

            // Vérification du statut du livre
            if (book.getBookStatus() == Book.BookStatus.EMPRUNTE) {
                logger.warn("Le livre avec l'ID {} est déjà emprunté.", borrowRequest.getBookId());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();  // Retourner 400 si le livre est déjà emprunté
            }

            // Enregistrement de l'emprunt
            Borrow borrow = new Borrow();
            borrow.setUser(user);
            borrow.setBook(book);
            borrow.setBorrowDate(LocalDate.now());
            borrow.setReturnDate(borrowRequest.getReturnDate());
            borrow.setReturned(false);
            borrow.setNotificationSent(false);
            borrowRepository.save(borrow);

            // Mise à jour du statut du livre
            book.setBookStatus(Book.BookStatus.EMPRUNTE);
            bookRepository.save(book);

            logger.info("Emprunt réussi pour l'utilisateur : {}", borrowRequest.getUserEmail());
            return ResponseEntity.status(HttpStatus.CREATED).build();  // Retourner 201 pour la création de l'emprunt
        } catch (Exception e) {
            logger.error("Erreur lors du traitement de la requête d'emprunt", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();  // Retourner 500 en cas d'erreur inattendue
        }
    }
    @GetMapping("/users-borrows")
    public ResponseEntity<List<Map<String, Object>>> getUsersWithBorrows() {
        try {
            List<Map<String, Object>> result = userRepository.findAll().stream().map(user -> {
                Map<String, Object> userMap = new HashMap<>();
                userMap.put("id", user.getEmail());
                userMap.put("username", user.getLastName());
                userMap.put("email", user.getEmail());

                List<Map<String, Object>> borrowedBooks = user.getBorrows().stream().map(borrow -> {
                    Map<String, Object> borrowMap = new HashMap<>();
                    borrowMap.put("bookTitle", borrow.getBook().getTitle());
                    borrowMap.put("returnDate", borrow.getReturnDate());
                    borrowMap.put("isReturned", borrow.isReturned());
                    return borrowMap;
                }).toList();

                userMap.put("borrowedBooks", borrowedBooks);
                return userMap;
            }).toList();

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



}