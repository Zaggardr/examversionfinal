import React, { useState } from 'react';

function Inscription() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation des champs
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/utilisateurs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Inscription réussie!');
                window.location.href = '/connexion'; // Redirection vers la page de connexion
            } else {
                setErrorMessage('Erreur lors de l\'inscription.');
            }
        } catch (error) {
            console.error('Erreur:', error);
            setErrorMessage('Erreur de communication avec le serveur.');
        }
    };

    return (
        <div>
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom d'utilisateur</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Mot de passe</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Confirmer le mot de passe</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                {errorMessage && <p>{errorMessage}</p>}
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
}

export default Inscription;
