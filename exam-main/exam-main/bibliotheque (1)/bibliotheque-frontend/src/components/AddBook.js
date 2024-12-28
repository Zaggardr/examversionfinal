import React, { useState } from 'react';

function AddBook() {
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        category: '',
        description: '',
        image: null,
    });

    const handleChange = (e) => {
        setBookData({ ...bookData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setBookData({ ...bookData, image: e.target.files[0] });
    };

    const [books, setBooks] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', bookData.title);
        formData.append('author', bookData.author);
        formData.append('category', bookData.category);
        formData.append('description', bookData.description);
        if (bookData.image) {
            formData.append('image', bookData.image);
        }

        try {
            const response = await fetch('http://localhost:8080/api/books', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Livre ajouté avec succès');
                // Récupérer les livres après ajout
                const responseBooks = await fetch('http://localhost:8080/api/books');
                const booksData = await responseBooks.json();
                setBooks(booksData);
            } else {
                const errorData = await response.json();
                console.error('Erreur:', errorData);
                alert(`Erreur : ${errorData.message || "Erreur inconnue"}`);
            }
        } catch (error) {
            console.error('Erreur réseau:', error);
            alert('Erreur réseau lors de l\'ajout du livre');
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={bookData.title}
                    onChange={handleChange}
                    placeholder="Titre"
                    required
                />
                <input
                    type="text"
                    name="author"
                    value={bookData.author}
                    onChange={handleChange}
                    placeholder="Auteur"
                    required
                />
                <input
                    type="text"
                    name="category"
                    value={bookData.category}
                    onChange={handleChange}
                    placeholder="Catégorie"
                    required
                />
                <textarea
                    name="description"
                    value={bookData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                />
                <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                />
                <button type="submit">Ajouter</button>
            </form>

            <h2>Liste des livres</h2>
            {books.map((book, index) => (
                <div key={index}>
                    <h3>{book.title}</h3>
                    <p>Auteur: {book.author}</p>
                    <p>Catégorie: {book.category}</p>
                    <p>Description: {book.description}</p>
                    {book.imageUrl && <img src={book.imageUrl} alt={book.title} style={{ width: '100px' }} />}
                </div>
            ))}
        </div>
    );

}

export default AddBook;
