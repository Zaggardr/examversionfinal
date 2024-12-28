package com.example.bibliotheque.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileService {

    // Répertoire relatif pour stocker les fichiers dans static/images
    private static final String UPLOAD_DIR = "src/main/resources/static/images"; // Répertoire d'images

    public String saveFile(MultipartFile file) throws IOException {
        // Créer le répertoire s'il n'existe pas
        File uploadDirFile = new File(UPLOAD_DIR);
        if (!uploadDirFile.exists()) {
            uploadDirFile.mkdirs();
        }

        // Générer un chemin d'accès pour le fichier
        String fileName = file.getOriginalFilename();
        String filePath = UPLOAD_DIR + "/" + fileName;

        // Sauvegarder le fichier sur le serveur
        Path path = Paths.get(filePath);
        Files.write(path, file.getBytes());

        // Retourner l'URL relative pour accéder à l'image
        return "/images/" + fileName;  // URL accessible dans le frontend
    }
}
