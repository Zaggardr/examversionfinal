import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookGrid from "./BookGrid";
import "./HomePage.css";

const HomePage = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        navigate("/login");
    };

    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail");
        if (userEmail) {
            fetch(`http://localhost:8080/api/auth/users/${userEmail}`)
                .then((response) => response.json())
                .then((data) => setUser(data))
                .catch((error) => console.error("Erreur utilisateur :", error));
        }

        fetch("http://localhost:8080/api/books")
            .then((response) => response.json())
            .then((data) => {
                console.log("Livres récupérés :", data);
                setBooks(data);
                setFilteredBooks(data);
            })
            .catch((error) => console.error("Erreur lors du chargement des livres :", error));
    }, []);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredBooks(books);
        } else {
            const filtered = books.filter((book) => {
                const title = book.title ? book.title.toLowerCase() : "";
                const author = book.author ? book.author.toLowerCase() : "";
                const category = book.category ? book.category.toLowerCase() : "";

                return (
                    title.includes(searchTerm.toLowerCase()) ||
                    author.includes(searchTerm.toLowerCase()) ||
                    category.includes(searchTerm.toLowerCase())
                );
            });
            console.log("Livres filtrés :", filtered);
            setFilteredBooks(filtered);
        }
    }, [searchTerm, books]);

    return (
        <div className="home-page">
            <div className="hamburger-menu" onClick={toggleMenu}>
                &#8942;
            </div>
            <div className={`sidebar ${menuOpen ? "open" : ""}`}>
                <button onClick={() => navigate("/action")}>Action</button>
                <button onClick={() => navigate("/consult")}>Consulter</button>
                <button onClick={() => navigate("/notifications")}>Notifications</button>
                <button onClick={handleLogout}>Déconnexion</button>
            </div>
            <div className="content">
                <h2>
                    Bienvenue sur la page d'accueil,{" "}
                    {user ? `${user.firstName} ${user.lastName}` : "Chargement..."}
                </h2>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Rechercher un livre par titre, auteur ou catégorie"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <BookGrid books={filteredBooks} />
            </div>
        </div>
    );
};

export default HomePage;
