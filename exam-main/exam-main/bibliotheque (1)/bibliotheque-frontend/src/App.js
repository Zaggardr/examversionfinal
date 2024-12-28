import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';  // Assurez-vous que le chemin est correct

import HomePage from "./components/HomePage";
import SearchPage from "./components/SearchPage";
import ConsultPage from "./components/ConsultPage";
import ReturnPage from "./components/ReturnPage";
import BorrowPage from "./components/BorrowPage";
import ActionPage from "./components/ActionPage";
import BooksListPage from "./components/BooksListPage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import AuthPage from "./components/AuthPage";
import UserBorrowPage from "./components/UserBorrowPage";
import UserNotifications from "./components/UserNotifications";

// Importation des composants pour l'admin
import AdminLogin from "./components/admin/AdminLogin"; // Page de login pour l'admin
import AdminDashboard from "./components/admin/AdminDashboard"; // Tableau de bord pour l'admin
import ManageBooks from './components/admin/ManageBooks';
import ManageUsers from './components/admin/ManageUsers';
import Notifications from './components/admin/Notifications';

function App() {
    return (
        <Router>
            {/* Routes pour les utilisateurs */}
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<AuthPage />} /> {/* Page d'accueil initiale */}
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/action" element={<ActionPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/consult" element={<BooksListPage />} />
                    <Route path="/return" element={<ReturnPage />} />
                    <Route path="/emprunte" element={<BorrowPage />} />
                    <Route path="/books" element={<BooksListPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/my-borrows" element={<UserBorrowPage />} />
                    <Route path="/notifications" element={<UserNotifications />} /> {/* Ajout de la route des notifications */}
                </Routes>
            </AuthProvider>

            {/* Routes pour l'admin */}
            <Routes>
                <Route path="/admin-login" element={<AdminLogin />} /> {/* Page de login admin */}
                <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Tableau de bord admin */}
                <Route path="/admin/manage-books" element={<ManageBooks />} />
                <Route path="/admin/manage-users" element={<ManageUsers />} />
                <Route path="/admin/notifications" element={<Notifications />} />
            </Routes>
        </Router>
    );
}

export default App;
