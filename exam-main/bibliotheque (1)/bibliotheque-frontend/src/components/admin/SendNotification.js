import React, { useState } from 'react';

const SendNotification = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

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
        } catch (err) {
            setResponse('Erreur réseau.');
        }
    };

    return (
        <div>
            <h1>Envoyer une Notification</h1>
            <div>
                <label>Email de l'utilisateur :</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Message :</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>
            <button onClick={handleSendNotification}>Envoyer</button>
            {response && <p>{response}</p>}
        </div>
    );
};

export default SendNotification;
