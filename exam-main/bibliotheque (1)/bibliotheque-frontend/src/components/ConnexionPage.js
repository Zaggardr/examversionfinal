import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ConnexionPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Pour rediriger après une connexion réussie

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Effectuer la requête pour vérifier les identifiants
            const response = await axios.post("http://localhost:8080/api/utilisateurs/login", formData);
            if (response.status === 200) {
                // Connexion réussie, rediriger vers la page d'accueil
                navigate("/home"); // Modifier selon votre route d'accueil
            }
        } catch (err) {
            // Afficher l'erreur si la connexion échoue
            setError("Nom d'utilisateur ou mot de passe incorrect");
        }
    };

    return (
        <div className="connexion-page">
            <h2>Se connecter</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom d'utilisateur :</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Mot de passe :</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default ConnexionPage;
