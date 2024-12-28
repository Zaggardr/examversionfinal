import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ActionPage.css"; // Importation du fichier CSS

const ActionPage = () => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({ title: "", author: "", category: "", description: "", image: null });
    const [editBook, setEditBook] = useState(null);

    // Charger les livres
    const fetchBooks = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/books");
            setBooks(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des livres", error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    // Ajouter un livre
    const handleAddBook = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", newBook.title);
        formData.append("author", newBook.author);
        formData.append("category", newBook.category);
        formData.append("description", newBook.description);
        if (newBook.image) formData.append("image", newBook.image);

        try {
            await axios.post("http://localhost:8080/api/books", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setNewBook({ title: "", author: "", category: "", description: "", image: null });
            fetchBooks();
        } catch (error) {
            console.error("Erreur lors de l'ajout du livre", error);
        }
    };

    // Modifier un livre
    const handleEditBook = async (e) => {
        e.preventDefault();

        const updatedBook = {
            title: editBook.title,
            author: editBook.author,
            category: editBook.category,
            description: editBook.description,
            imageUrl: editBook.image ? await uploadImage(editBook.image) : null,  // Optionnel : upload image et inclure l'URL
        };

        try {
            await axios.put(`http://localhost:8080/api/books/${editBook.id}`, updatedBook, {
                headers: {
                    "Content-Type": "application/json",  // Définir le type de contenu comme JSON
                },
            });
            setEditBook(null);
            fetchBooks();
        } catch (error) {
            console.error("Erreur lors de la modification du livre", error);
        }
    };

    // Fonction d'upload d'image (si vous avez besoin de gérer les fichiers séparément)
    const uploadImage = async (imageFile) => {
        const formData = new FormData();
        formData.append("image", imageFile);

        const response = await axios.post("http://localhost:8080/api/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data.imageUrl;  // Retourner l'URL de l'image sauvegardée
    };

    // Supprimer un livre
    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/books/${id}`);
            fetchBooks();
        } catch (error) {
            console.error("Erreur lors de la suppression du livre", error);
        }
    };

    return (
        <div className="action-page-container">
            <h2>Gestion des Livres</h2>

            {/* Tableau des livres */}
            <table className="book-table">
                <thead>
                <tr>
                    <th>Titre</th>
                    <th>Auteur</th>
                    <th>Catégorie</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {books.map((book) => (
                    <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.category}</td>
                        <td>{book.imageUrl && <img src={`http://localhost:8080${book.imageUrl}`} alt={book.title} style={{ width: '50px', height: '70px' }} />}</td>
                        <td>
                            <button onClick={() => setEditBook(book)} className="edit-btn">Modifier</button>
                            <button onClick={() => handleDeleteClick(book.id)} className="delete-btn">Supprimer</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Formulaire Ajouter un livre */}
            <div className="add-book-form">
                <h3>Ajouter un livre</h3>
                <form onSubmit={handleAddBook}>
                    <input
                        type="text"
                        placeholder="Titre"
                        value={newBook.title}
                        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Auteur"
                        value={newBook.author}
                        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Catégorie"
                        value={newBook.category}
                        onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={newBook.description}
                        onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                    />
                    <input
                        type="file"
                        onChange={(e) => setNewBook({ ...newBook, image: e.target.files[0] })}
                    />
                    <button type="submit" className="submit-btn">Ajouter</button>
                </form>
            </div>

            {/* Formulaire Modifier un livre */}
            {editBook && (
                <div className="edit-book-form">
                    <h3>Modifier un livre</h3>
                    <form onSubmit={handleEditBook}>
                        <input
                            type="text"
                            placeholder="Titre"
                            value={editBook.title}
                            onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Auteur"
                            value={editBook.author}
                            onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Catégorie"
                            value={editBook.category}
                            onChange={(e) => setEditBook({ ...editBook, category: e.target.value })}
                            required
                        />
                        <textarea
                            placeholder="Description"
                            value={editBook.description}
                            onChange={(e) => setEditBook({ ...editBook, description: e.target.value })}
                        />
                        <input
                            type="file"
                            onChange={(e) => setEditBook({ ...editBook, image: e.target.files[0] })}
                        />
                        <button type="submit" className="submit-btn">Modifier</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ActionPage;
