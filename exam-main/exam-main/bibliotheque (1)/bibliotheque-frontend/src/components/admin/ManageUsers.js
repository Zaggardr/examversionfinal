import React, { useEffect, useState } from 'react';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/borrows/users-borrows')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((err) => {
                setError('Impossible de récupérer les données.');
                setLoading(false);
            });
    }, []);

    const styles = {
        tableContainer: {
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
        },
        th: {
            backgroundColor: '#003366',  // Bleu marine
            color: '#f5f5dc',  // Beige
            padding: '12px',
            border: '1px solid #ddd',
            textAlign: 'left',
        },
        td: {
            backgroundColor: '#f5f5dc',  // Beige
            padding: '12px',
            border: '1px solid #ddd',
            textAlign: 'left',
        },
        trEven: {
            backgroundColor: '#f4f4f4',  // Gris clair pour les lignes paires
        },
        trHover: {
            backgroundColor: '#dcdcdc',  // Gris clair lors du survol
        },
        loading: {
            textAlign: 'center',
            padding: '20px',
        },
        error: {
            color: 'red',
            textAlign: 'center',
        },
    };

    return (
        <div style={styles.tableContainer}>
            <h1>Gestion des Utilisateurs</h1>
            {loading ? (
                <p style={styles.loading}>Chargement des données...</p>
            ) : error ? (
                <p style={styles.error}>{error}</p>
            ) : (
                <table style={styles.table}>
                    <thead>
                    <tr>
                        <th style={styles.th}>Nom d'utilisateur</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Emprunts</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <tr
                                key={user.id}
                                style={index % 2 === 0 ? styles.trEven : null}
                                onMouseEnter={(e) => (e.target.style.backgroundColor = styles.trHover.backgroundColor)}
                                onMouseLeave={(e) => (e.target.style.backgroundColor = index % 2 === 0 ? styles.trEven.backgroundColor : '')}
                            >
                                <td style={styles.td}>{user.username}</td>
                                <td style={styles.td}>{user.email}</td>
                                <td style={styles.td}>
                                    {user.borrowedBooks.length > 0 ? (
                                        <ul>
                                            {user.borrowedBooks.map((borrow, index) => (
                                                <li key={index}>
                                                    <strong>{borrow.bookTitle}</strong>
                                                    {` - Retour : ${borrow.returnDate}`}
                                                    {borrow.isReturned && ' (Rendu)'}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        'Aucun emprunt'
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" style={styles.td}>
                                Aucun utilisateur trouvé.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ManageUsers;
