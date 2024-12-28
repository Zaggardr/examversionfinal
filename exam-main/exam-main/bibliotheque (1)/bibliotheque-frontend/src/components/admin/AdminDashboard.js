import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css'; // Importation du fichier CSS

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalBorrowed: 0,
        mostBorrowedBooks: [],
        lateBorrows: 0,
    });
    const [loading, setLoading] = useState(true);

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/api/admin/statistics')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setStats({
                    totalBorrowed: data.totalBorrowed || 0,
                    mostBorrowedBooks: Array.isArray(data.mostBorrowedBooks) ? data.mostBorrowedBooks : [],
                    lateBorrows: data.lateBorrows || 0,
                });
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleSendNotification = async () => {
        try {
            const res = await fetch(`http://localhost:8080/api/notifications/send?email=${email}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(message),
            });

            if (res.ok) {
                setResponse('Notification envoyée avec succès !');
            } else {
                setResponse('Erreur lors de l\'envoi de la notification.');
            }
        } catch {
            setResponse('Erreur réseau.');
        }
    };

    return (
        <div className="admin-dashboard">
            <nav className="navbar">
                <ul className="navbar-list">
                    <li><Link to="/admin/manage-users">Gérer les utilisateurs</Link></li>
                </ul>
            </nav>

            <h1 className="dashboard-title">Tableau de bord Administrateur</h1>

            {loading ? (
                <p className="loading">Chargement des données...</p>
            ) : (
                <div className="stats-section">
                    <h2>Statistiques des Emprunts</h2>
                    <table className="stats-table">
                        <thead>
                        <tr>
                            <th>Statistique</th>
                            <th>Valeur</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Nombre total d'emprunts</td>
                            <td>{stats.totalBorrowed}</td>
                        </tr>
                        <tr>
                            <td>Livres les plus empruntés</td>
                            <td>
                                {stats.mostBorrowedBooks.length > 0
                                    ? stats.mostBorrowedBooks.join(', ')
                                    : 'Aucun livre emprunté.'}
                            </td>
                        </tr>
                        <tr>
                            <td>Emprunts en retard</td>
                            <td>{stats.lateBorrows}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )}

            <div className="notification-form">
                <h2>Envoyer une Notification</h2>
                <div className="form-group">
                    <label>Email de l'utilisateur :</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Entrez l'email"
                    />
                </div>
                <div className="form-group">
                    <label>Message :</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Entrez votre message"
                    />
                </div>
                <button onClick={handleSendNotification} className="send-btn">Envoyer</button>
                {response && <p className="response">{response}</p>}
            </div>
        </div>
    );
};

export default AdminDashboard;
