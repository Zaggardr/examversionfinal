import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookGrid from "./BookGrid";
import "./HomePage.css";

const HomePage = () => {
    const [menuOpen, setMenuOpen] = useState(false); // État pour le menu hamburger
    const [user, setUser] = useState(null); // Utilisateur connecté
    const [books, setBooks] = useState([]); // Liste complète des livres
    const [filteredBooks, setFilteredBooks] = useState([]); // Liste filtrée des livres
    const [searchTerm, setSearchTerm] = useState(""); // Terme de recherche
    const navigate = useNavigate();

    // Toggle pour le menu hamburger
    const toggleMenu = () => setMenuOpen(!menuOpen);

    // Gestion de la déconnexion
    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        navigate("/login");
    };

    // Chargement des données utilisateur et des livres
    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail");
        if (userEmail) {
            fetch(`http://localhost:8080/api/auth/users/${userEmail}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log("Utilisateur récupéré :", data);
                    setUser(data);
                })
                .catch((error) => console.error("Erreur utilisateur :", error));
        }

        fetch("http://localhost:8080/api/books")
            .then((response) => response.json())
            .then((data) => {
                console.log("Livres récupérés :", data);
                setBooks(data);
                setFilteredBooks(data); // Initialiser la liste filtrée avec tous les livres
            })
            .catch((error) => console.error("Erreur lors du chargement des livres :", error));
    }, []);

    // Mise à jour de la liste filtrée des livres en fonction du terme de recherche
    useEffect(() => {
        if (!searchTerm) {
            console.log("Aucun terme de recherche : affichage de tous les livres.");
            setFilteredBooks(books);
        } else {
            const filtered = books.filter((book) => {
                const title = book.title ? book.title.toLowerCase() : "";
                const author = book.author ? book.author.toLowerCase() : "";
                const categories = book.category
                    ? book.category.toLowerCase().split(",").map((cat) => cat.trim())
                    : [];

                return (
                    title.includes(searchTerm.toLowerCase()) ||
                    author.includes(searchTerm.toLowerCase()) ||
                    categories.some((cat) => cat.includes(searchTerm.toLowerCase()))
                );
            });

            console.log(`Terme de recherche : ${searchTerm}`);
            console.log("Résultats filtrés :", filtered);

            setFilteredBooks(filtered);
        }
    }, [searchTerm, books]);



    return (
        <div className="home-page">
            {/* Menu hamburger */}
            <div className="hamburger-menu" onClick={toggleMenu}>
                &#8942;
            </div>
            <div className={`sidebar ${menuOpen ? "open" : ""}`}>
                <button onClick={() => navigate("/action")}>Action</button>
                <button onClick={() => navigate("/consult")}>Consulter</button>
                <button onClick={() => navigate("/notifications")}>Notifications</button>
                <button onClick={handleLogout}>Déconnexion</button>
            </div>

            {/* Contenu principal */}
            <div className="content">
                <h2>
                    Bienvenue sur la page d'accueil, {" "}
                    {user ? `${user.firstName} ${user.lastName}` : "Chargement..."}
                </h2>

                {/* Barre de recherche */}
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Rechercher un livre par titre, auteur ou catégorie"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Grille des livres */}
                <BookGrid books={filteredBooks} />
            </div>
        </div>
    );
};

export default HomePage;
