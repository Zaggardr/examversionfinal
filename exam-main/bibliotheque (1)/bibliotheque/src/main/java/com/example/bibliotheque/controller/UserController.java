package com.example.bibliotheque.controller;

import com.example.bibliotheque.model.LoginRequest;
import com.example.bibliotheque.model.User;
import com.example.bibliotheque.model.UserDTO;
import com.example.bibliotheque.repository.UserRepository;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Inscription
    @PostMapping("/register")
    public String register(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return "L'email est déjà utilisé!";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword())); // Encoder le mot de passe
        userRepository.save(user);
        return "Utilisateur enregistré avec succès!";
    }

    // Connexion
    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {
        // Trouver l'utilisateur par email et récupérer l'Optional
        Optional<User> optionalUser = userRepository.findByEmail(loginRequest.getEmail());

        // Vérifier si l'utilisateur existe et si les mots de passe correspondent
        if (optionalUser.isEmpty() || !passwordEncoder.matches(loginRequest.getPassword(), optionalUser.get().getPassword())) {
            return "Email ou mot de passe incorrect";
        }

        return "Connexion réussie";
    }
    @GetMapping("/users/{email}")
    public ResponseEntity<UserDTO> getUserByEmail(@PathVariable String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Convertir l'utilisateur en DTO
            UserDTO userDTO = new UserDTO(user.getEmail(), user.getFirstName(), user.getLastName());
            return ResponseEntity.ok(userDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


}




