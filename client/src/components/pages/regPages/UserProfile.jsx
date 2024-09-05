import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './userProfile.css';

const UserProfile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('http://13.53.147.216/api/me', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };
        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://13.53.147.216/api/logout');
            if (response.status === 200) {
                // Clear user data or perform any additional actions upon logout
                setUser(null);
                localStorage.removeItem('token');
                // Redirect or display message as needed
                console.log('Logged out successfully');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    if (!user) {
        return <p>Загрузка...</p>;
    }

    return (
        <div className="user-profile">
            <h2>Особистий кабінет</h2>
            <p>Ім'я користувача: {user.username}</p>
            <h3>Мої замовлення</h3>
            {user.orders.map((order, index) => (
                <div key={index} className="order">
                    <h4>Замовлення {index + 1}</h4>
                    <p>Загальна вартість: {order.totalCost} грн</p>
                    {order.items.map((item, idx) => (
                        <div key={idx} className="order-item">
                            <p>Товар: {item.name}</p>
                            <p>Кількість: {item.quantity}</p>
                            <p>Ціна: {item.cost} грн</p>
                        </div>
                    ))}
                </div>
            ))}
            <Link to={'/'}>
                <button className="btn-logout" onClick={handleLogout}>Вийти</button>
            </Link>
        </div>
    );
};

export default UserProfile;
