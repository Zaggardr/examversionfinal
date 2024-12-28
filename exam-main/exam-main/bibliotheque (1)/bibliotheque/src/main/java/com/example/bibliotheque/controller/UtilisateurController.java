package com.example.bibliotheque.controller;

import com.example.bibliotheque.model.Utilisateur;
import com.example.bibliotheque.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    // Inscription
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Utilisateur utilisateur) {
        try {
            utilisateurService.registerUser(utilisateur);
            return ResponseEntity.ok("Utilisateur inscrit avec succès.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Connexion
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Utilisateur utilisateur) {
        Utilisateur authenticatedUser = utilisateurService.authenticateUser(utilisateur.getUsername(), utilisateur.getPassword());
        if (authenticatedUser != null) {
            return ResponseEntity.ok("Connexion réussie.");
        }
        return ResponseEntity.status(401).body("Identifiants incorrects.");
    }
}
