import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookGrid.css';
import { useAuth } from '../context/AuthContext'; // Assurez-vous que le chemin est correct
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookGrid = () => {
    const { userEmail } = useAuth(); // Utiliser le hook pour obtenir l'email de l'utilisateur
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [returnDate, setReturnDate] = useState(new Date()); // Date de retour par défaut

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/books');
            setBooks(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des livres', error);
        }
    };

    const borrowBook = async (bookId) => {
        if (!userEmail) {
            alert("Vous devez être connecté pour emprunter un livre.");
            return;
        }

        console.log("Email utilisé pour l'emprunt :", userEmail);

        try {
            const response = await axios.post('http://localhost:8080/api/borrows', {
                bookId: bookId,
                borrowDate: new Date().toISOString().split('T')[0],
                returnDate: returnDate.toISOString(),
                userEmail: userEmail,
            });

            if (response.status === 201) {
                alert("Emprunt enregistré avec succès !");
                setBooks(prevBooks =>
                    prevBooks.map(book =>
                        book.id === bookId ? { ...book, bookStatus: "EMPRUNTE" } : book
                    )
                );
            } else {
                alert("Erreur lors de l'emprunt du livre.");
            }
        } catch (error) {
            console.error("Erreur lors de l'emprunt du livre : ", error.response || error);
            alert(`Une erreur est survenue : ${error.message}`);
        }
    };




    const returnBook = async (bookId) => {
        if (!userEmail) {
            alert("Vous devez être connecté pour retourner un livre.");
            return;
        }

        if (books.find(book => book.id === bookId && book.bookStatus === "DISPONIBLE")) {
            alert("Ce livre est déjà disponible.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/returns', {
                bookId: bookId,
                userEmail: userEmail, // Utilisation de l'email dynamique
            });

            if (response.status === 200) {
                alert("Retour du livre effectué avec succès !");
                setBooks(prevBooks =>
                    prevBooks.map(book =>
                        book.id === bookId ? { ...book, bookStatus: "DISPONIBLE" } : book
                    )
                );
            } else {
                console.error('Erreur de réponse:', response);
            }
        } catch (error) {
            console.error("Erreur lors du retour du livre", error);
            alert("Une erreur est survenue, veuillez réessayer.");
        }
    };

    return (
        <div className="book-grid">
            {books.map((book) => (
                <div key={book.id} className="book-card" onClick={() => setSelectedBook(book)}>
                    {book.imageUrl && (
                        <img
                            src={`http://localhost:8080${book.imageUrl}`}
                            alt={book.title}
                            className="book-image"
                        />
                    )}
                    <div className="book-info">
                        <h3 className="book-title">{book.title}</h3>
                        <p className="book-author">Auteur: {book.author}</p>
                    </div>

                    {selectedBook && selectedBook.id === book.id && (
                        <div className="book-details">
                            <h2>{book.title}</h2>
                            <p><strong>Auteur:</strong> {book.author}</p>
                            <p><strong>Catégorie:</strong> {book.category}</p>
                            <p><strong>Description:</strong> {book.description}</p>
                            <p><strong>Status:</strong> {book.bookStatus}</p>

                            {book.bookStatus === 'DISPONIBLE' && (
                                <>
                                    <DatePicker
                                        selected={returnDate}
                                        onChange={(date) => setReturnDate(date)}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="yyyy-MM-dd HH:mm"
                                        minDate={new Date()}
                                        placeholderText="Choisissez une date de retour"
                                    />
                                    <button onClick={() => borrowBook(book.id)}>Emprunter</button>
                                </>
                            )}
                            {book.bookStatus === 'EMPRUNTE' && (
                                <button onClick={() => returnBook(book.id)}>Retourner</button>
                            )}
                            <button onClick={() => setSelectedBook(null)}>Fermer</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default BookGrid;
