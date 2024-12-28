import React, { useState, useEffect } from "react";
import axios from "axios";

const BookListPage = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/books");
                setBooks(response.data); // Mettre à jour l'état avec les livres récupérés
            } catch (error) {
                console.error("Erreur lors de la récupération des livres", error);
            }
        };

        fetchBooks();
    }, []);

    const handleBorrow = async (bookId) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/books/${bookId}/borrow`, {
                borrowDate: "2024-12-17", // Exemple de date d'emprunt
                returnDate: "2025-01-17",  // Exemple de date de retour
            });

            if (response.status === 200) {
                alert("Emprunt enregistré avec succès !");
                // Mettre à jour l'état du livre dans la liste pour afficher "Emprunté"
                setBooks(books.map(book =>
                    book.id === bookId ? { ...book, borrowed: true, status: "Emprunté" } : book
                ));
            } else {
                alert("Erreur lors de l'emprunt du livre.");
            }
        } catch (error) {
            console.error("Erreur lors de l'emprunt du livre", error);
            alert("Une erreur est survenue, veuillez réessayer.");
        }
    };

    const handleReturn = async (bookId) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/books/${bookId}/return`);
            if (response.status === 200) {
                alert("Le livre a été retourné avec succès !");
                setBooks(books.map(book =>
                    book.id === bookId ? { ...book, borrowed: false, status: "Disponible" } : book
                ));
            } else {
                alert("Erreur lors du retour du livre.");
            }
        } catch (error) {
            console.error("Erreur lors du retour du livre", error);
            alert("Une erreur est survenue, veuillez réessayer.");
        }
    };

    return (
        <div className="book-list">
            <h2>Liste des livres</h2>
            <table>
                <thead>
                <tr>
                    <th>Titre</th>
                    <th>Auteur</th>
                    <th>Statut</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {books.map(book => (
                    <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.status}</td>
                        <td>
                            {!book.borrowed ? (
                                <button onClick={() => handleBorrow(book.id)}>Emprunter</button>
                            ) : (
                                <button onClick={() => handleReturn(book.id)}>Retourner</button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookListPage;
