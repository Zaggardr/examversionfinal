package com.example.bibliotheque.service;

import com.example.bibliotheque.model.Admin;
import com.example.bibliotheque.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Admin registerAdmin(Admin admin) {
        Optional<Admin> existingAdmin = adminRepository.findByAdresseMail(admin.getAdresseMail());
        if (existingAdmin.isPresent()) {
            throw new IllegalArgumentException("Un administrateur avec cet email existe déjà.");
        }
        return adminRepository.save(admin);
    }

    public Admin loginAdmin(String email, String password) {
        Admin admin = adminRepository.findByAdresseMail(email)
                .orElseThrow(() -> new IllegalArgumentException("Email ou mot de passe incorrect."));
        if (!admin.getMotDePasse().equals(password)) {
            throw new IllegalArgumentException("Email ou mot de passe incorrect.");
        }
        return admin;
    }

    public Admin updateAdminInfo(int id, Admin updatedAdmin) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Administrateur introuvable."));
        admin.setNom(updatedAdmin.getNom());
        admin.setPrenom(updatedAdmin.getPrenom());
        admin.setAdresse(updatedAdmin.getAdresse());
        admin.setNumero(updatedAdmin.getNumero());
        return adminRepository.save(admin);
    }
}
