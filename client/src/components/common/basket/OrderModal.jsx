import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./backet.css";

const OrderModal = ({ isOpen, onClose, items }) => {
    const [user, setUser] = useState(null);
    const [totalCost, setTotalCost] = useState(0);

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

        const calculateTotalCost = () => {
            const cost = items.reduce((acc, item) => acc + item.quantity * item.cost, 0);
            setTotalCost(cost);
        };
        console.log(items)
        fetchUserData();
        calculateTotalCost();
    }, [items]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (token) {
            try {
                await axios.post('http://13.53.147.216/api/orders', 
                    
                    { items, totalCost },
                    { headers: { 'Authorization': `Bearer ${token}` } }
                );
                onClose();
            } catch (error) {
                console.error('Error creating order:', error);
            }
        } else {
            alert('Пожалуйста, войдите в систему для оформления заказа');
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Оформлення замовлення</h2>
                <form onSubmit={handleSubmit}>
                    {user && (
                        <>
                            <p>Имя пользователя: {user.username}</p>
                        </>
                    )}
                    <h3>Товари</h3>
                    {items.map((item, index) => (
                        <div key={index}>
                            <p>{item.name} x {item.quantity} - {item.cost} грн</p>
                        </div>
                    ))}
                    <p>Загальна вартість: {totalCost} грн</p>
                    <button className='order-btn' type="submit">Оформити замовлення</button>
                </form>
            </div>
        </div>
    );
};

export default OrderModal;
