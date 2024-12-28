import React, { useState, useEffect } from 'react';

const NotificationDashboard = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Appel API pour récupérer les notifications en retard
        fetch('/api/notifications')
            .then(response => response.json())
            .then(data => setNotifications(data));
    }, []);

    return (
        <div>
            <h1>Tableau de bord des notifications</h1>
            <ul>
                {notifications.map(notification => (
                    <li key={notification.id}>
                        <p>{notification.message}</p>
                        <p>Status: {notification.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationDashboard;
