import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (email && password) {
            login(email);
            navigate('/home');
        } else {
            alert('Veuillez entrer vos informations');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h1 style={styles.title}>Bienvenue</h1>
                <p style={styles.subtitle}>Veuillez vous connecter :</p>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                    />
                    <button
                        style={styles.button}
                        onClick={handleLogin}
                    >
                        Se connecter
                    </button>
                    <button
                        style={styles.buttonSecondary}
                        onClick={() => navigate('/register')}
                    >
                        S'inscrire
                    </button>
                </div>
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
        backgroundImage: 'url(http://localhost:8080/images/background.jpg)',  // Utilisez l'URL de l'image servie par Spring Boot
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
    },
    formContainer: {
        backgroundColor: '#003366',  // Bleu marine
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        width: '100%',
        maxWidth: '400px',
    },
    title: {
        color: '#f5f5dc',  // Beige
        fontSize: '32px',
        marginBottom: '10px',
    },
    subtitle: {
        color: '#f5f5dc',  // Beige
        fontSize: '16px',
        marginBottom: '20px',
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
        marginBottom: '10px',
        background: 'rgba(255, 255, 255, 0.2)',  // Fond transparent avec opacité
        color: '#f5f5dc',  // Beige
        border: 'none',
        fontSize: '16px',
        borderRadius: '4px',
        cursor: 'pointer',
        backdropFilter: 'blur(10px)',  // Application du flou sur le fond
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',  // Ombre légère pour le contraste
    },
    buttonSecondary: {
        width: '100%',
        padding: '12px',
        background: 'rgba(255, 255, 255, 0.2)',  // Fond transparent avec opacité
        color: '#003366',  // Bleu marine
        border: 'none',
        fontSize: '16px',
        borderRadius: '4px',
        cursor: 'pointer',
        backdropFilter: 'blur(10px)',  // Application du flou sur le fond
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',  // Ombre légère pour le contraste
    }
};

export default AuthPage;
