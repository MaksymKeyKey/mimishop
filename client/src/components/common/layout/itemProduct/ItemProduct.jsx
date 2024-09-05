import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { itemsFetched } from '../../../../actions';
import { Link } from 'react-router-dom';
import "./itemProduct.css"
import styled, { css } from 'styled-components';
import ColorSelector from './colorSelector';

const StyledItemProduct = styled.div`
  border: 2px solid #F58DEF;
  background-color: #F8F5FF;
  padding: 10px;
  margin: 10px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  display: block;
  width: 230px;
  border-radius: 8px;

  .nameProduct {
    font-weight: bold;
  }

  .costProduct {
    color: #777;
  }

  .leftSide{
  display: flex;
    justify-content: center;}

  .colorSelect {
    display: none;
  }

  .productBtns{
    display: none;
  }

  img {
    width: 200px;
    height: 200px;
    margin: 0 auto;
  }

  .buy {
  font-family: "Comic Neue", cursive;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100%;
  height: 37px;
  padding: 0px 8px;
  border: 0;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: #fbc0c8;
  color: #000000;
  font-size: 20px;

  line-height: 26px;
  outline: none;
  
}

  button {
    background-color: #5cb85c;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  /* Применение дополнительных стилей через пропсы */
  ${({ customStyles }) => customStyles && css`
    /* Дополнительные стили, переданные через пропсы */
    ${customStyles}
  `}
`;

const ItemProduct = ({ id, img, cost, name, width, height, countryOfManufacture, materials, customStyles }) => {
  const items = useSelector(state => state.items);
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');


  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      dispatch(itemsFetched(JSON.parse(savedCart)));
    }
  }, [dispatch]);

  const addToBasket = () => {
    const totalCost = cost * quantity;
    const newItem = { id, name, img, cost, color: selectedColor, quantity, totalCost };
    const itemExists = items.some(item => item.id === id && item.color === selectedColor);
  
    let updatedItems;
    if (itemExists) {
      updatedItems = items.map(item => {
        if (item.id === id && item.color === selectedColor) {
          return { ...item, quantity: item.quantity + quantity, totalCost: item.totalCost + totalCost };
        }
        return item;
      });
    } else {
      updatedItems = [...items, newItem];
    }
  
    dispatch(itemsFetched(updatedItems));
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  
    // Показ уведомления
    setNotificationMessage(`Товар "${name}" додано до кошика!`);
    setShowNotification(true);
  
    // Скрытие уведомления через 3 секунды
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  
    console.log(selectedColor, quantity, totalCost);
  };
  

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setQuantity(value);
    }
  };

  return (
    <StyledItemProduct customStyles={customStyles}>
      {showNotification && (
        <div className="notification">
          {notificationMessage}
        </div>
      )}
      <div className='leftSide'>
        <Link to={`/itemPage/${id}`} state={{ id, img, cost, name, width, height, countryOfManufacture, materials }}>
          <img className='card-img' src={img} alt={name} />
        </Link>
      </div>
      <div className='rightSide'>
        <h3 className="nameProduct">{name}</h3>
        <h3 className="costProduct">Ціна: {cost} грн</h3>
        <Link to={`/itemPage/${id}`} style={{ textDecoration: "none" }} state={{ id, img, cost, name, width, height, countryOfManufacture, materials }}>
          <div className='buy'>Придбати</div>
        </Link>
        <div className='colorSelect'>
          <ColorSelector
            colors={['#FF5733', '#33FF57', '#3357FF']}
            onSelect={setSelectedColor}
            selectedColor={selectedColor}
          />
        </div>
        <div className='productBtns'>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
          />
          <div className='totalCost-block'>Загальна ціна: <span className="totalCost">{cost * quantity} грн</span></div>
          <button onClick={addToBasket}>Додати до кошика</button>
        </div>
      </div>
    </StyledItemProduct>
  );
  
};

export default ItemProduct;
