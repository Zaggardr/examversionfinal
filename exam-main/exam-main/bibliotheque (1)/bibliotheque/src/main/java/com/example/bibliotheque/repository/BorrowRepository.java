package com.example.bibliotheque.repository;

import com.example.bibliotheque.model.Borrow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface BorrowRepository extends JpaRepository<Borrow, Long> {
    List<Borrow> findByUserEmail(String email);

    @Query("SELECT b FROM Borrow b WHERE b.book.id = :bookId AND b.user.email = :userEmail")
    Optional<Borrow> findByBookIdAndUserEmail(@Param("bookId") Long bookId, @Param("userEmail") String userEmail);

    // Statistiques : Livres les plus empruntés
    @Query("SELECT b.book.title, COUNT(b) AS borrowCount FROM Borrow b GROUP BY b.book.title ORDER BY borrowCount DESC")
    List<Object[]> findMostBorrowedBooks();

    // Statistiques : Catégories populaires
    @Query("SELECT b.book.category, COUNT(b) AS categoryCount FROM Borrow b GROUP BY b.book.category ORDER BY categoryCount DESC")
    List<Object[]> findPopularCategories();

    // Emprunts en retard
    @Query("SELECT b FROM Borrow b WHERE b.returnDate < :currentDate AND b.returned = false")
    List<Borrow> findOverdueBorrows(@Param("currentDate") LocalDate currentDate);

    @Query("SELECT b FROM Borrow b WHERE b.returnDate < :currentDate AND b.returned = false")
    List<Borrow> findByReturnDateBeforeAndReturnedFalse(@Param("currentDate") LocalDate currentDate);

}
