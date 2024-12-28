package com.example.bibliotheque.service;

import com.example.bibliotheque.model.Notification;
import com.example.bibliotheque.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public void sendNotification(String email, String message) {
        // Implémentation pour l'envoi d'email
        System.out.println("Notification envoyée à : " + email + " - " + message);
    }

    // Méthode pour récupérer les notifications pour un utilisateur par son email
    public List<Notification> getNotificationsForUser(String email) {
        // Utilisation du repository pour récupérer les notifications associées à l'email
        return notificationRepository.findByUser_Email(email);
    }
}
