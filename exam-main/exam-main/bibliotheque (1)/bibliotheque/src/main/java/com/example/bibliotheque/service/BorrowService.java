package com.example.bibliotheque.service;

import com.example.bibliotheque.model.Book;
import com.example.bibliotheque.model.Borrow;
import com.example.bibliotheque.repository.BookRepository;
import com.example.bibliotheque.repository.BorrowRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BorrowService {

    private static final Logger logger = LoggerFactory.getLogger(BorrowService.class);  // Utilisation du logger SLF4J
    private final BorrowRepository borrowRepository;
    private final BookRepository bookRepository;

    @Autowired
    public BorrowService(BorrowRepository borrowRepository, BookRepository bookRepository) {
        this.borrowRepository = borrowRepository;
        this.bookRepository = bookRepository;
    }

    public String saveBorrow(Borrow borrow) {
        if (borrow.getBook() == null || borrow.getBook().getId() == null) {
            return "Le livre est requis pour l'emprunt.";
        }

        // Récupérer le livre par son ID
        Book book = bookRepository.findById(borrow.getBook().getId())
                .orElseThrow(() -> new RuntimeException("Livre introuvable avec ID : " + borrow.getBook().getId()));

        // Vérifier si le livre est déjà emprunté
        if (Book.BookStatus.EMPRUNTE.equals(book.getBookStatus())) {
            return "Le livre est déjà emprunté.";
        }

        // Mise à jour des informations d'emprunt
        borrow.setBorrowDate(LocalDate.now());
        borrow.setReturnDate(LocalDate.now().plusDays(7)); // Date de retour par défaut après 7 jours
        borrow.setReturned(false);

        // Sauvegarder l'emprunt
        borrowRepository.save(borrow);

        // Mettre à jour le statut du livre
        book.setBookStatus(Book.BookStatus.EMPRUNTE);
        bookRepository.save(book);

        logger.info("Emprunt enregistré avec succès pour le livre : {}", borrow.getBook().getTitle()); // Utilisation du logger SLF4J

        return "Emprunt enregistré avec succès. Date de retour : " + borrow.getReturnDate();
    }

    // Retourner un livre
    public String returnBook(Long borrowId) {
        Borrow borrow = borrowRepository.findById(borrowId)
                .orElseThrow(() -> new RuntimeException("Emprunt introuvable avec ID : " + borrowId));

        Book book = borrow.getBook();

        // Vérifier si le livre est déjà retourné
        if (!Book.BookStatus.EMPRUNTE.equals(book.getBookStatus())) {
            return "Le livre n'est pas emprunté ou a déjà été retourné.";
        }

        // Met à jour les états de l'emprunt et du livre
        book.setBookStatus(Book.BookStatus.DISPONIBLE);
        bookRepository.save(book);

        borrow.setReturned(true);
        borrowRepository.save(borrow);

        return "Livre retourné avec succès.";
    }

    // Obtenir tous les emprunts
    public List<Borrow> getAllBorrows() {
        return borrowRepository.findAll();
    }

    // Obtenir un emprunt par ID
    public Borrow getBorrowById(Long id) {
        return borrowRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Emprunt introuvable avec ID : " + id));
    }

    // Supprimer un emprunt par ID
    public boolean deleteBorrow(Long id) {
        if (!borrowRepository.existsById(id)) {
            throw new RuntimeException("Emprunt introuvable avec ID : " + id);
        }
        borrowRepository.deleteById(id);
        return true;
    }

    // Obtenir tous les livres avec mise à jour dynamique du statut
    public List<Book> getAllBooks() {
        List<Book> books = bookRepository.findAll();
        books.forEach(book -> {
            if (Book.BookStatus.EMPRUNTE.equals(book.getBookStatus())) {
                book.setBookStatus(Book.BookStatus.EMPRUNTE);
            } else {
                book.setBookStatus(Book.BookStatus.DISPONIBLE);
            }
        });
        return books;
    }
    public List<Borrow> getBorrowsByUser(String email) {
        return borrowRepository.findByUserEmail(email);
    }

}
