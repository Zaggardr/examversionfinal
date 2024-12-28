import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/admin/users-with-borrows');
            setUsers(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs", error);
        }
    };

    return (
        <div className="user-list">
            <h1>Liste des utilisateurs</h1>
            <table>
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Emprunts</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.firstName} {user.lastName}</td>
                        <td>{user.email}</td>
                        <td>
                            {user.borrows.map(borrow => (
                                <div key={borrow.id}>
                                    Livre: {borrow.book.title} | Date retour: {borrow.returnDate}
                                </div>
                            ))}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
