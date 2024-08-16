import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { itemsFetched, removeItem } from '../../../actions';
import OrderModal from './OrderModal';
import "./backet.css";

import CartLogo from '../../../resources/img/shopping-bag.svg';

const Backet = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { items } = useSelector((state) => state);
    const dispatch = useDispatch();

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const clearBasket = () => {
        dispatch(itemsFetched([]));
        localStorage.clear();
    };

    const handleRemove = (id) => {
        const updatedCart = items.filter((item) => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        dispatch(itemsFetched(updatedCart));
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const getColorName = (color) => {
        switch (color) {
            case '#FF5733':
                return 'ЧЕРВОНИЙ';
            case '#33FF57':
                return 'ЗЕЛЕНИЙ';
            case '#3357FF':
                return 'СИНИЙ';
            default:
                return 'НЕВІДОМИЙ КОЛІР';
        }
    };

    return (
        <div>
            <div>
                <img src={CartLogo} alt="" onMouseEnter={handleMouseEnter} />
            </div>
            {isHovered && (
                <div className="cart_content-block" onMouseLeave={handleMouseLeave}>
                    <div className="cart-elements">
                        {items.map((item, index) => (
                            <div className="cart-element" key={index}>
                                <div>{item.name}</div>
                                <div>{getColorName(item.color)}</div>
                                <div>{item.quantity}</div>
                                <div>{item.totalCost} грн</div>
                                <img className="small-img" src={item.img} alt={item.name} />
                                <div onClick={() => handleRemove(item.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                        {items.length === 0 ? <div className="cart-null">Кошик порожній</div> : null}
                    </div>
                    <button className="clear-cart" onClick={clearBasket}>
                        Очистити кошик
                    </button>
                    <button className="checkout-button" onClick={openModal}>
                        Оформити замовлення
                    </button>
                </div>
            )}
            {isModalOpen && <OrderModal isOpen={isModalOpen} onClose={closeModal} items={items} />}
        </div>
    );
};

export default Backet;
