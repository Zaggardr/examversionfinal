import React, { useEffect, useState } from 'react';

const UserNotifications = ({ email }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:8080/api/notifications/user?email=${email}`)
            .then((response) => response.json())
            .then((data) => {
                setNotifications(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [email]);

    return (
        <div>
            <h1>Vos Notifications</h1>
            {loading ? (
                <p>Chargement...</p>
            ) : notifications.length > 0 ? (
                <ul>
                    {notifications.map((notification) => (
                        <li key={notification.id}>
                            {notification.message} - {new Date(notification.createdAt).toLocaleString()}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucune notification.</p>
            )}
        </div>
    );
};

export default UserNotifications;
