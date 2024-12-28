package com.example.bibliotheque.exeception;

// Exception personnalisée
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}

