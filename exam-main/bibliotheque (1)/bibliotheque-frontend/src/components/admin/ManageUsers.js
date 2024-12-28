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
        container: {
            padding: '20px',
            fontFamily: "'Roboto', sans-serif",
            backgroundColor: '#f8f9fa', // Arrière-plan clair
            minHeight: '100vh',
        },
        title: {
            textAlign: 'center',
            fontSize: '24px',
            marginBottom: '20px',
            color: '#003366', // Bleu marine
            textTransform: 'uppercase',
        },
        tableContainer: {
            width: '100%',
            overflowX: 'auto', // Scroll horizontal pour petits écrans
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
            padding: '10px',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
        },
        th: {
            backgroundColor: '#003366',
            color: '#f5f5dc',
            padding: '12px',
            border: '1px solid #ddd',
            textAlign: 'left',
            fontWeight: 'bold',
            textTransform: 'uppercase',
        },
        td: {
            padding: '12px',
            border: '1px solid #ddd',
            textAlign: 'left',
            fontSize: '14px',
            color: '#333',
        },
        trEven: {
            backgroundColor: '#f4f4f4',
        },
        trHover: {
            backgroundColor: '#d0e1ff',
        },
        loading: {
            textAlign: 'center',
            fontSize: '18px',
            color: '#003366',
        },
        error: {
            color: 'red',
            textAlign: 'center',
            fontSize: '18px',
        },
        list: {
            listStyle: 'none',
            padding: 0,
            margin: 0,
        },
        listItem: {
            marginBottom: '5px',
            fontSize: '14px',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Gestion des Utilisateurs</h1>
            {loading ? (
                <p style={styles.loading}>Chargement des données...</p>
            ) : error ? (
                <p style={styles.error}>{error}</p>
            ) : (
                <div style={styles.tableContainer}>
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
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.trHover.backgroundColor)}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? styles.trEven.backgroundColor : '')}
                                >
                                    <td style={styles.td}>{user.username}</td>
                                    <td style={styles.td}>{user.email}</td>
                                    <td style={styles.td}>
                                        {user.borrowedBooks.length > 0 ? (
                                            <ul style={styles.list}>
                                                {user.borrowedBooks.map((borrow, index) => (
                                                    <li key={index} style={styles.listItem}>
                                                        <strong>{borrow.bookTitle}</strong> - Retour : {borrow.returnDate}
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
                </div>
            )}
        </div>
    );
};

export default ManageUsers;
