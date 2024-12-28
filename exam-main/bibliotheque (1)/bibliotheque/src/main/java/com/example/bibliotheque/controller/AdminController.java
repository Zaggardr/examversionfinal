package com.example.bibliotheque.controller;


import com.example.bibliotheque.model.Admin;
import com.example.bibliotheque.model.Book;
import com.example.bibliotheque.repository.BookRepository;
import com.example.bibliotheque.repository.BorrowRepository;
import com.example.bibliotheque.repository.UserRepository;
import com.example.bibliotheque.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;
    @Autowired
    private BorrowRepository borrowRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;


    @PostMapping("/register")
    public Admin register(@RequestBody Admin admin) {
        return adminService.registerAdmin(admin);
    }

    @PostMapping("/login")
    public Admin login(@RequestParam String email, @RequestParam String password) {
        return adminService.loginAdmin(email, password);
    }

    @PutMapping("/{id}")
    public Admin updateAdmin(@PathVariable int id, @RequestBody Admin updatedAdmin) {
        return adminService.updateAdminInfo(id, updatedAdmin);
    }
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getStatistics() {
        Map<String, Object> stats = new HashMap<>();

        // Nombre total d'emprunts
        long totalBorrowed = borrowRepository.count();

        // Livres les plus empruntés
        List<Object[]> mostBorrowedBooksRaw = borrowRepository.findMostBorrowedBooks();
        List<String> mostBorrowedBooks = new ArrayList<>();
        for (Object[] row : mostBorrowedBooksRaw) {
            String title = (String) row[0];
            Long borrowCount = (Long) row[1];
            mostBorrowedBooks.add(title + " (" + borrowCount + " emprunts)");
        }

        // Emprunts en retard
        long lateBorrows = borrowRepository.findByReturnDateBeforeAndReturnedFalse(LocalDate.now()).size();

        stats.put("totalBorrowed", totalBorrowed);
        stats.put("mostBorrowedBooks", mostBorrowedBooks);
        stats.put("lateBorrows", lateBorrows);

        return ResponseEntity.ok(stats);
    }
}

