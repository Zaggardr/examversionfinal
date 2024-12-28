package com.example.bibliotheque.repository;

import com.example.bibliotheque.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    // Méthode pour vérifier si un utilisateur existe par email
    boolean existsByEmail(String email);

    // Méthode pour récupérer un utilisateur par email
    Optional<User> findByEmail(String email);  // Utilisation de Optional ici
}
