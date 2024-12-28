package com.example.bibliotheque.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String index() {
        return "index"; // Correspond à index.html
    }

    @GetMapping("/home/login") // Modification ici pour éviter le conflit
    public String login() {
        return "login"; // Correspond à login.html
    }
}
