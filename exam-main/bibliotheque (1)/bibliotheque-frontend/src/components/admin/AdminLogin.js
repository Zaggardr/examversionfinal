import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Validation simple pour l'admin
        if (email === 'samira123@gmail.com' && password === 'samira123') {
            // Redirection vers le tableau de bord de l'admin
            navigate('/admin-dashboard');
        } else {
            alert('Identifiants incorrects');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.title}>Login Admin</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.button}>Login</button>
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

export default AdminLogin;
