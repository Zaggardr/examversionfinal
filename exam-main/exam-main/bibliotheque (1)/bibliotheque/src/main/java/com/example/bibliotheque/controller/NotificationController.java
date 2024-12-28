package com.example.bibliotheque.controller;

import com.example.bibliotheque.model.Notification;
import com.example.bibliotheque.model.NotificationDTO;
import com.example.bibliotheque.model.User;
import com.example.bibliotheque.repository.NotificationRepository;
import com.example.bibliotheque.repository.UserRepository;
import com.example.bibliotheque.service.NotificationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private static final Logger logger = LoggerFactory.getLogger(NotificationController.class);

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationService notificationService;

    // Envoyer une notification
    @PostMapping("/send")
    public ResponseEntity<String> sendNotification(@RequestParam String email, @RequestBody String message) {
        logger.info("Requête reçue pour envoyer une notification à l'utilisateur avec l'email: {}", email);

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            logger.warn("Utilisateur avec l'email {} non trouvé", email);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilisateur avec cet email non trouvé");
        }

        User user = userOptional.get();

        Notification notification = new Notification();
        notification.setUser(user);
        notification.setMessage(message);
        notification.setCreatedAt(LocalDateTime.now());

        notificationRepository.save(notification);

        logger.info("Notification envoyée avec succès à l'utilisateur avec l'email: {}", email);
        return ResponseEntity.ok("Notification envoyée avec succès");
    }

    // Récupérer les notifications d'un utilisateur par email
    @GetMapping("/user")
    public ResponseEntity<List<NotificationDTO>> getNotifications(@RequestParam String email) {
        List<Notification> notifications = notificationService.getNotificationsForUser(email);

        if (notifications == null || notifications.isEmpty()) {
            return ResponseEntity.ok(List.of()); // Retourne une liste vide si aucune notification
        }

        // Convertir les notifications en DTO et les retourner
        List<NotificationDTO> notificationDTOs = notifications.stream()
                .map(notification -> new NotificationDTO(
                        notification.getId(),
                        notification.getMessage(),
                        notification.getCreatedAt()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(notificationDTOs);
}
}
