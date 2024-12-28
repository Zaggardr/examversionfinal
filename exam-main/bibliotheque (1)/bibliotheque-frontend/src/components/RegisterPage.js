import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', {
                firstName,
                lastName,
                email,
                password
            });

            alert(response.data);
            navigate('/login'); // Rediriger vers la page de connexion après l'enregistrement
        } catch (error) {
            console.error("Erreur d'enregistrement", error);
            alert("Erreur lors de l'enregistrement, veuillez réessayer.");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.title}>Inscription</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nom</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div>
                        <label>Prénom</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div>
                        <label>Mot de passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div>
                        <label>Confirmer le mot de passe</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.button}>S'inscrire</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: 'url(http://localhost:8080/images/background.jpg)',  // Votre image de fond
        backgroundSize: 'cover',  // L'image couvre toute la zone de fond
        backgroundPosition: 'center',  // Centrer l'image
        backgroundAttachment: 'fixed',  // Garder l'image fixe lors du défilement
    },
    formContainer: {
        backgroundColor: 'rgba(0, 51, 102, 0.5)',  // Bleu marine semi-transparent
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        width: '100%',
        maxWidth: '400px',
        backdropFilter: 'blur(10px)',  // Applique un flou léger sur le fond
    },
    title: {
        color: '#f5f5dc',  // Beige
        fontSize: '32px',
        marginBottom: '10px',
    },
    input: {
        width: '100%',
        padding: '12px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '16px',
    },
    button: {
        width: '100%',
        padding: '12px',
        background: 'rgba(255, 255, 255, 0.2)',  // Fond transparent avec opacité
        color: '#f5f5dc',  // Beige
        border: 'none',
        fontSize: '16px',
        borderRadius: '4px',
        cursor: 'pointer',
        backdropFilter: 'blur(10px)',  // Applique un flou sur le fond
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',  // Ombre légère pour le contraste
    }
};

export default RegisterPage;
