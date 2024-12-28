import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Assurez-vous que c'est l'URL correcte de votre backend

export const getAdminInfo = async (email) => {
    try {
        const response = await axios.get(`${API_URL}/api/admin/${email}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des informations administrateur:', error);
        throw error;
    }
};
