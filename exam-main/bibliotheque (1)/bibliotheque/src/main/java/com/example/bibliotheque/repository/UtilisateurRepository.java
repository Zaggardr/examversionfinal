package com.example.bibliotheque.repository;

import com.example.bibliotheque.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    Utilisateur findByUsername(String username);
    Utilisateur findByEmail(String email);
}
