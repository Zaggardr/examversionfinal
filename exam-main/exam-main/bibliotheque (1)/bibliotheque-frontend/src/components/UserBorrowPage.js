import React, { useState, useEffect } from "react";
import axios from "axios";

const UserBorrowPage = () => {
    const [borrows, setBorrows] = useState([]);

    useEffect(() => {
        const fetchUserBorrows = async () => {
            try {
                const userId = localStorage.getItem("userId"); // Exemple : récupérer l'ID utilisateur stocké
                const response = await axios.get(`http://localhost:8080/api/borrows/user/${userId}`);
                setBorrows(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des emprunts de l'utilisateur", error);
            }
        };

        fetchUserBorrows();
    }, []);

    return (
        <div>
            <h2>Mes emprunts</h2>
            {borrows.length > 0 ? (
                <ul>
                    {borrows.map((borrow) => (
                        <li key={borrow.id}>
                            <p><strong>Titre:</strong> {borrow.book.title}</p>
                            <p><strong>Date d'emprunt:</strong> {borrow.borrowDate}</p>
                            <p><strong>Date de retour:</strong> {borrow.returnDate}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Vous n'avez aucun emprunt en cours.</p>
            )}
        </div>
    );
};

export default UserBorrowPage;
