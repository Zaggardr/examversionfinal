import React, { useState } from "react";
import axios from "axios";

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredBooks, setFilteredBooks] = useState([]);

    const handleSearchClick = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/books/search", {
                params: { query: searchQuery },
            });
            setFilteredBooks(response.data);
        } catch (error) {
            console.error("Erreur lors de la recherche", error);
        }
    };

    return (
        <div>
            <h2>Recherche de Livres</h2>
            <input
                type="text"
                placeholder="Rechercher"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearchClick}>Rechercher</button>
            <ul>
                {filteredBooks.map((book) => (
                    <li key={book.id}>{book.title} - {book.author}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchPage;
