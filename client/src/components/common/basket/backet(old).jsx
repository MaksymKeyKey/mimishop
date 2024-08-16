import { useSelector, useDispatch } from "react-redux";
import { itemsFetched, removeItem } from "../../../actions";
import { useState } from "react";
import "./backet.css";
import CartLogo from "../../../resources/img/shopping-bag.svg";

const Backet = () => {
    const [isHovered, setIsHovered] = useState(false);

    const { items } = useSelector(state => state);
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
        const updatedCart = items.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        dispatch(itemsFetched(updatedCart)); // Отправляем новый массив после удаления
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
                return 'НЕИЗВЕСТНЫЙ ЦВЕТ';
        }
    };



    return (
        <div>
            <div>
                <img
                    src={CartLogo}
                    alt=""
                    onMouseEnter={handleMouseEnter}
                />
            </div>
            {isHovered && <div className="cart_content-block" onMouseLeave={handleMouseLeave}>
                <div className="cart-elements">
                   
                    {items.map((item, index) => (
                        <div className="cart-element" key={index}>
                            <div>{item.name}</div>
                            <div>{getColorName(item.color)}</div>
                            <div>{item.quantity}</div>
                            <div>{item.totalCost} грн</div>
                            <img className="small-img" src={item.img} alt={item.name} />
                            <button onClick={() => handleRemove(item.id)}>Видалити</button>
                        </div>
                    ))}
                    {items.length === 0 ? <div className="cart-null">Кошик порожній</div> : null}
                </div>
                <button className="clear-cart" onClick={clearBasket} >Очистити кошик</button>
            </div>}
        </div>
    );
};


