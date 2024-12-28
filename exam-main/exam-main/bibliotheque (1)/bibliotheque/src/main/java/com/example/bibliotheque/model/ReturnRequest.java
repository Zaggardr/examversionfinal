package com.example.bibliotheque.model;

public class ReturnRequest {
    private Long bookId;
    private String userEmail;

    // Getters et setters

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}
