package com.example.bibliotheque.service;

import com.example.bibliotheque.model.Borrow;
import com.example.bibliotheque.repository.BorrowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
@Service
public class handleOverdueBorrowsService {


    @Autowired
    private BorrowRepository borrowRepository;

    public void handleOverdueBorrows() {
        LocalDate today = LocalDate.now();
        List<Borrow> overdueBorrows = borrowRepository.findOverdueBorrows(today);

        for (Borrow borrow : overdueBorrows) {
            System.out.println("Utilisateur : " + borrow.getUser().getEmail() +
                    ", Livre : " + borrow.getBook().getTitle() +
                    ", Date de retour prévue : " + borrow.getReturnDate());
            // Envoyer une notification ou prendre une autre action
        }
    }

}
