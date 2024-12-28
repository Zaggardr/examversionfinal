package com.example.bibliotheque.service;

import com.example.bibliotheque.model.Utilisateur;
import com.example.bibliotheque.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Inscription
    public Utilisateur registerUser(Utilisateur utilisateur) {
        if (!utilisateur.getPassword().equals(utilisateur.getConfirmPassword())) {
            throw new IllegalArgumentException("Le mot de passe et la confirmation ne correspondent pas.");
        }

        // Encode le mot de passe
        utilisateur.setPassword(passwordEncoder.encode(utilisateur.getPassword()));
        utilisateur.setConfirmPassword(""); // Ne sauvegarde pas la confirmation du mot de passe
        return utilisateurRepository.save(utilisateur);
    }

    // Connexion (Vérification des identifiants)
    public Utilisateur authenticateUser(String username, String password) {
        Utilisateur utilisateur = utilisateurRepository.findByUsername(username);
        if (utilisateur != null && passwordEncoder.matches(password, utilisateur.getPassword())) {
            return utilisateur; // Connexion réussie
        }
        return null; // Connexion échouée
    }
}
