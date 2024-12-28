package com.example.bibliotheque.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class User {

    @Id
    private String email;  // Email comme clé primaire
    private String firstName;
    private String lastName;
    private String password;
    @OneToMany(mappedBy = "user")
    private List<Notification> notifications; // Nouvelle relation pour les notifications

    public List<Notification> getNotifications() {
        return notifications;
    }

    public void setNotifications(List<Notification> notifications) {
        this.notifications = notifications;
    }

    // Relation OneToMany avec Borrow pour récupérer tous les emprunts d'un utilisateur
    @OneToMany(mappedBy = "user")  // mappedBy signifie que la relation est définie dans la classe Borrow avec l'attribut user
    private List<Borrow> borrows;

    // Getters et setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // Nouvelle méthode getName() pour obtenir le nom complet de l'utilisateur
    public String getName() {
        return this.firstName + " " + this.lastName;
    }

    // Getter pour les emprunts
    public List<Borrow> getBorrows() {
        return borrows;
    }

    public void setBorrows(List<Borrow> borrows) {
        this.borrows = borrows;
    }
}
