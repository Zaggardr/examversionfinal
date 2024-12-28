import React, { useEffect, useState } from 'react';
import './UserNotifications.css'; // Importer le fichier CSS

const UserNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail')); // Utilisation de l'email stocké dans le localStorage

    useEffect(() => {
        if (!userEmail) return;

        fetch(`http://localhost:8080/api/notifications/user?email=${userEmail}`)
            .then((response) => response.json())
            .then((data) => {
                setNotifications(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [userEmail]);

    return (
        <div className="notifications-container">
            <h1 className="notifications-title">Vos Notifications</h1>
            {loading ? (
                <p className="loading-text">Chargement...</p>
            ) : notifications.length > 0 ? (
                <ul className="notifications-list">
                    {notifications.map((notification) => (
                        <li key={notification.id} className="notification-item">
                            <span className="notification-message">{notification.message}</span> -{' '}
                            <span className="notification-date">
                                {new Date(notification.createdAt).toLocaleString()}
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-notifications">Aucune notification.</p>
            )}
        </div>
    );
};

export default UserNotifications;
