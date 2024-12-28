import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './ReturnPage.css'; // Importation du fichier CSS pour la page

const ReturnPage = () => {
    const [bookTitle, setBookTitle] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setBookTitle(e.target.value);
    };

    const handleReturnBook = async () => {
        try {
            // Recherche du livre par titre pour obtenir son ID
            const searchResponse = await axios.get(`http://localhost:8080/api/books/search?title=${bookTitle}`);

            if (searchResponse.data.length === 0) {
                alert("Livre introuvable !");
                return;
            }

            // Supposons que nous prenons le premier livre trouvé
            const bookId = searchResponse.data[0].id;

            // Envoi de la requête PUT pour retourner le livre
            const response = await axios.put(`http://localhost:8080/api/books/${bookId}/return`);

            if (response.status === 200) {
                alert("Le livre a été retourné avec succès !");
                setMessage("Le livre a été retourné.");
            } else {
                alert(`Erreur: ${response.data}`);
            }
        } catch (error) {
            console.error("Erreur lors du retour du livre", error);
            alert(`Une erreur est survenue: ${error.response ? error.response.data : error.message}`);
        }
    };

    return (
        <div className="return-page">
            <div className="content-container">
                <h2>Retourner un livre emprunté</h2>
                <div className="input-container">
                    <label>Titre du livre :</label>
                    <input
                        type="text"
                        value={bookTitle}
                        onChange={handleChange}
                        placeholder="Entrez le titre du livre"
                        required
                    />
                </div>
                <button onClick={handleReturnBook} className="return-btn">Retourner</button>

                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default ReturnPage;
