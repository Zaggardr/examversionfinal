import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BorrowPage = () => {
    const navigate = useNavigate();

    const [borrow, setBorrow] = useState({
        bookTitle: "",
        borrowerName: "",
        returnDate: "",
        bookId: null,  // L'ID du livre sera ajouté après la recherche par titre
    });

    const [bookFound, setBookFound] = useState(true); // Pour gérer l'état de recherche du livre

    // Gestion des changements dans le formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBorrow({ ...borrow, [name]: value });
    };

    // Fonction pour rechercher le livre par titre
    const handleSearchBook = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/books/search", {
                params: { title: borrow.bookTitle },
            });

            if (response.data && response.data.length > 0) {
                const foundBook = response.data[0];
                setBorrow({ ...borrow, bookId: foundBook.id });

                // Vérifier si le livre est déjà emprunté
                if (foundBook.isBorrowed) {
                    setBookFound(false);  // Le livre est déjà emprunté
                    alert("Ce livre est déjà emprunté.");
                } else {
                    setBookFound(true);
                }
            } else {
                setBookFound(false); // Aucun livre trouvé
            }
        } catch (error) {
            console.error("Erreur lors de la recherche du livre", error);
            setBookFound(false); // En cas d'erreur, traiter comme si aucun livre n'était trouvé
        }
    };


    // Fonction pour enregistrer l'emprunt
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!borrow.bookId) {
            alert("Veuillez d'abord rechercher un livre valide.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/borrows", {
                bookId: borrow.bookId,
                borrowerName: borrow.borrowerName,
                returnDate: borrow.returnDate,
            });

            console.log(response); // Affiche la réponse complète de l'API dans la console

            if (response.status === 400) {
                alert(response.data); // Affiche le message d'erreur "Le livre est déjà emprunté."
            } else {
                alert("Emprunt enregistré avec succès !");
                navigate("/"); // Retourner à la page d'accueil
            }
        } catch (error) {
            console.error("Erreur lors de l'enregistrement de l'emprunt", error);
            if (error.response) {
                // Afficher les détails de la réponse d'erreur
                console.error("Erreur de la réponse serveur:", error.response);
                alert(`Erreur serveur : ${error.response.data}`);
            } else {
                // Afficher une erreur générique si la réponse n'est pas disponible
                alert("Une erreur est survenue, veuillez réessayer.");
            }
        }
    };




    return (
        <div className="borrow-page">
            <h2>Enregistrer un emprunt</h2>
            <form onSubmit={handleSubmit}>
                {/* Recherche par titre de livre */}
                <div>
                    <label>Titre du Livre :</label>
                    <input
                        type="text"
                        name="bookTitle"
                        value={borrow.bookTitle}
                        onChange={handleChange}
                        placeholder="Entrez le titre du livre"
                        required
                    />
                    <button type="button" onClick={handleSearchBook}>Rechercher</button>
                </div>

                {/* Affichage de l'ID du livre si trouvé */}
                {!bookFound && borrow.bookTitle && (
                    <p>Aucun livre trouvé avec ce titre.</p>
                )}

                {bookFound && borrow.bookTitle && borrow.bookId && (
                    <p>Livre trouvé : {borrow.bookTitle}</p>
                )}

                {/* Nom de l'emprunteur */}
                <div>
                    <label>Nom de l'emprunteur :</label>
                    <input
                        type="text"
                        name="borrowerName"
                        value={borrow.borrowerName}
                        onChange={handleChange}
                        placeholder="Entrez le nom de l'emprunteur"
                        required
                    />
                </div>

                {/* Date de retour */}
                <div>
                    <label>Date de retour prévue :</label>
                    <input
                        type="date"
                        name="returnDate"
                        value={borrow.returnDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" disabled={!borrow.bookId}>Enregistrer</button>
            </form>
        </div>
    );
};

export default BorrowPage;
