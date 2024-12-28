package com.example.bibliotheque.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le titre est obligatoire")
    private String title;

    @NotBlank(message = "L'auteur est obligatoire")
    private String author;

    @NotBlank(message = "La catégorie est obligatoire")
    private String category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false) // Le statut ne doit jamais être null
    private BookStatus bookStatus = BookStatus.DISPONIBLE;

    @Column(name = "borrow_date")
    private LocalDate borrowDate;

    @Column(name = "return_date")
    private LocalDate returnDate;

    private String description;

    private String imageUrl;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    private List<Borrow> borrows;  // Liste des emprunts associés au livre

    public enum BookStatus {
        DISPONIBLE,
        EMPRUNTE
    }

    // Méthode pour emprunter un livre
    public void borrow() {
        if (this.bookStatus == BookStatus.EMPRUNTE) {
            throw new IllegalStateException("Le livre est déjà emprunté");
        }
        this.bookStatus = BookStatus.EMPRUNTE;
        this.borrowDate = LocalDate.now();
        this.returnDate = LocalDate.now().plusDays(7);
    }

    // Méthode pour retourner un livre
    public void returnBook() {
        if (this.bookStatus == BookStatus.DISPONIBLE) {
            throw new IllegalStateException("Le livre est déjà disponible");
        }
        this.bookStatus = BookStatus.DISPONIBLE;
        this.borrowDate = null;
        this.returnDate = null;
    }

    // Getters et setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public BookStatus getBookStatus() {
        return bookStatus;
    }

    public void setBookStatus(BookStatus bookStatus) {
        this.bookStatus = bookStatus;
    }

    public LocalDate getBorrowDate() {
        return borrowDate;
    }

    public void setBorrowDate(LocalDate borrowDate) {
        this.borrowDate = borrowDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
