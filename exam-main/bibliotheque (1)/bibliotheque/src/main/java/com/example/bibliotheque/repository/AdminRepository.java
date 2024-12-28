package com.example.bibliotheque.repository;

import com.example.bibliotheque.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
    Optional<Admin> findByAdresseMail(String email); // Pour la connexion
}
