package com.example.bibliotheque.service;


import com.example.bibliotheque.repository.BorrowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrintStatisticsService {
    @Autowired
    private BorrowRepository borrowRepository;

    public void printStatistics() {
        List<Object[]> mostBorrowedBooks = borrowRepository.findMostBorrowedBooks();
        List<Object[]> popularCategories = borrowRepository.findPopularCategories();

        System.out.println("Livres les plus empruntés :");
        for (Object[] row : mostBorrowedBooks) {
            System.out.println("Livre : " + row[0] + ", Nombre d'emprunts : " + row[1]);
        }

        System.out.println("Catégories populaires :");
        for (Object[] row : popularCategories) {
            System.out.println("Catégorie : " + row[0] + ", Nombre d'emprunts : " + row[1]);
        }
    }


}
