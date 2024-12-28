import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <ul>
                <li><Link to="/admin/dashboard">Tableau de Bord</Link></li>
                <li><Link to="/admin/overdue">Emprunts en Retard</Link></li>
                <li><Link to="/admin/users">Liste des Utilisateurs</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;
