import ItemProduct from "../itemProduct/ItemProduct"
import { useLocation } from 'react-router-dom';
import Header from "../../header/header";
import Footer from "../../footer/footer";
import MainProduct from "../../../mainProduct/mainProduct";
import { useState, useEffect } from "react";
import './tabenu.css'

const ItemPage = () => {
    const location = useLocation();
    const id = location.state?.id;
    const img = location.state?.img;
    const cost = location.state?.cost;
    const name = location.state?.name;
    const width = location.state?.width;
    const height = location.state?.height;
    const countryOfManufacture = location.state?.countryOfManufacture;
    const materials = location.state?.materials;

    console.log(location.state)
    const [activeTab, setActiveTab] = useState('description');
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ username: '', rating: '', text: '' });

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`http://13.53.147.216/api/itemProducts/${id}/reviews`);
                if (response.ok) {
                    const data = await response.json();
                    setReviews(data);
                } else {
                    console.error('Failed to fetch reviews:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };
        window.scrollTo(0, 0);
        fetchReviews();
    }, [id]);
   
    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setNewReview({ ...newReview, [name]: value });
    };

    const addReview = async () => {
        if (newReview.username && newReview.rating && newReview.text) {
            const updatedReviews = [...reviews, newReview];
            setReviews(updatedReviews);
            setNewReview({ username: '', rating: '', text: '' });

            // Save the new review to the backend
            try {
                const response = await fetch(`http://13.53.147.216/api/itemProducts/${id}/reviews`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newReview)
                });

                if (!response.ok) {
                    console.error('Failed to save review:', response.statusText);
                }
            } catch (error) {
                console.error('Error saving review:', error);
            }
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'description':
                return (
                    <div>
                        <p>Ширина: <span className="detail">{width} см</span></p>
                        <p>Висота: <span className="detail">{height} см</span></p>
                        <p>Країна-виробник: <span className="detail">{countryOfManufacture}</span></p>
                        <p>Матеріали: <span className="detail">{materials}</span></p>
                    </div>
                );
            case 'delivery':
                return <p>Деталі про доставку та оплату уточнюйте у менеджера</p>;
            case 'reviews':
                return (
                    <div className="reviews-tab">
                        <h3>Відгуки про товар</h3>
                        {reviews.length > 0 ? (
                            <ul className="reviews-list">
                                {reviews.map((review, index) => (
                                    <li key={index} className="review-item">
                                        <strong>{review.username}</strong> ({review.rating}): {review.text}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Немає відгуків.</p>
                        )}
                        <h4>Написати відгук</h4>
                        <div className="review-form">
                            <input
                                type="text"
                                name="username"
                                value={newReview.username}
                                onChange={handleReviewChange}
                                placeholder="Ваше ім'я"
                            />
                            <input
                                type="number"
                                name="rating"
                                value={newReview.rating}
                                onChange={handleReviewChange}
                                placeholder="Рейтинг (1-5)"
                            />
                            <textarea
                                name="text"
                                value={newReview.text}
                                onChange={handleReviewChange}
                                placeholder="Ваш відгук"
                            ></textarea>
                            <button type="button" onClick={addReview}>Додати відгук</button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const customStyles = `
  border: 2px solid #e3e4e6;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-top: 30px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  max-width: 1100px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 0 auto;
  margin-top: 50px;


/* Основные стили для страницы */
body {
  font-family: 'Roboto', sans-serif;
  background-color: #f4f7fa;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

h3, .costProduct {
  margin-bottom: 20px;
}

.nameProduct {
  font-weight: bold;
  font-size: 1.5em;
  color: #2c3e50;
  margin-bottom: 10px;
}

.buy{
display:none;
}

.costProduct {
  color: #34495e;
  font-size: 1.3em;
  font-weight: bold;
}



.StyledItemProduct:hover {
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.2);
}

/* Левый блок с изображением */
.leftSide img {
  width: 400px;
  height: 432px;
  max-width: 400px;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.leftSide img:hover {
  transform: scale(1.05);
}

/* Правый блок с информацией о продукте */
.rightSide {
  width: 55%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Блок выбора цвета */
.colorSelect {
  display: flex;

}

.colorSelect div {
  width: 140px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.totalCost-block {
    display: flex;
    justify-content: space-between;
    width: 210px;
}

/* Кнопки и функционал покупки */
.productBtns {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}

.productBtns input[type="number"] {
  width: 60px;
  padding: 8px;
  font-size: 1em;
  border: 2px solid #bdc3c7;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

.productBtns input[type="number"]:focus {
  border-color: #5cb85c;
}

.productBtns button {
  background: linear-gradient(90deg, #FF82DA, #FF6BB7);
  color: white;
  border: none;
  padding: 12px 20px;
  cursor: pointer;
  font-size: 1em;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.productBtns button:hover {
  background-color: #f356c2;
  transform: scale(1.05);
}

/* Блок с общей ценой */
.totalCost {
  font-size: 1.2em;
  font-weight: bold;
  color: #27ae60;
}



@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes fadeOut {
  0% { opacity: 1; }
  100% { opacity: 0; }
}

/* Адаптивный дизайн */
@media (max-width: 768px) {
  .StyledItemProduct {
    flex-direction: column;
    align-items: center;
  }

  .leftSide, .rightSide {
    width: 100%;
  }

  .productBtns {
    flex-direction: column;
    width: 100%;
    gap: 10px;
  }

  button {
    width: 100%;
  }
}


`;

    return (
        <div>
            <div className='header-stiky'>
                <Header />
            </div>
            <div className="container">
                <ItemProduct id={id} img={img} cost={cost} name={name} customStyles={customStyles} />
            </div>
            <div>
                <div className="tabs-container">
                    <div className="tabs-header">
                        <button
                            className={activeTab === 'description' ? 'active' : ''}
                            onClick={() => setActiveTab('description')}
                        >
                            Опис
                        </button>
                        <button
                            className={activeTab === 'delivery' ? 'active' : ''}
                            onClick={() => setActiveTab('delivery')}
                        >
                            Доставка та оплата
                        </button>
                        <button
                            className={activeTab === 'reviews' ? 'active' : ''}
                            onClick={() => setActiveTab('reviews')}
                        >
                            Відгуки про товар
                        </button>
                    </div>
                    <div className="tabs-content">
                        {renderContent()}
                    </div>
                </div>
            </div>
            <div className="bests">
                <h1 style={{ textAlign: "center" }}>Рекомендуємо</h1>
                <MainProduct speciec="best" />
            </div>
            <Footer />
        </div>
    )
};

const SearchItemPage = () => {
    const location = useLocation();
    const id = location.state?.product.id;
    const img = location.state?.product.img;
    const cost = location.state?.product.cost;
    const name = location.state?.product.name;

    const customStyles = `
      border: 2px solid #e3e4e6;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-top: 30px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  max-width: 1100px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 0 auto;
  margin-top: 50px;


/* Основные стили для страницы */
body {
  font-family: 'Roboto', sans-serif;
  background-color: #f4f7fa;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

h3, .costProduct {
  margin-bottom: 20px;
}

.nameProduct {
  font-weight: bold;
  font-size: 1.5em;
  color: #2c3e50;
  margin-bottom: 10px;
}

.buy{
display:none;
}

.costProduct {
  color: #34495e;
  font-size: 1.3em;
  font-weight: bold;
}



.StyledItemProduct:hover {
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.2);
}

/* Левый блок с изображением */
.leftSide img {
  width: 100%;
  height: auto;
  max-width: 400px;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.leftSide img:hover {
  transform: scale(1.05);
}

/* Правый блок с информацией о продукте */
.rightSide {
  width: 55%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Блок выбора цвета */
.colorSelect {
  display: flex;

}

.colorSelect div {
  width: 140px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.totalCost-block {
    display: flex;
    justify-content: space-between;
    width: 210px;
}

/* Кнопки и функционал покупки */
.productBtns {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}

.productBtns input[type="number"] {
  width: 60px;
  padding: 8px;
  font-size: 1em;
  border: 2px solid #bdc3c7;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

.productBtns input[type="number"]:focus {
  border-color: #5cb85c;
}

.productBtns button {
  background: linear-gradient(90deg, #FF82DA, #FF6BB7);
  color: white;
  border: none;
  padding: 12px 20px;
  cursor: pointer;
  font-size: 1em;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.productBtns button:hover {
  background-color: #f356c2;
  transform: scale(1.05);
}

/* Блок с общей ценой */
.totalCost {
  font-size: 1.2em;
  font-weight: bold;
  color: #27ae60;
}



@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes fadeOut {
  0% { opacity: 1; }
  100% { opacity: 0; }
}

/* Адаптивный дизайн */
@media (max-width: 768px) {
  .StyledItemProduct {
    flex-direction: column;
    align-items: center;
  }

  .leftSide, .rightSide {
    width: 100%;
  }

  .productBtns {
    flex-direction: column;
    width: 100%;
    gap: 10px;
  }

  button {
    width: 100%;
  }
}
  `;


    return (
        <div>
            <Header />
            <div className="container">
                <ItemProduct id={id} img={img} cost={cost} name={name} customStyles={customStyles} />
            </div>
            <div className="bests">
                <h1 style={{ textAlign: "center" }}>Рекомендуємо</h1>
                <MainProduct speciec="best" />
            </div>
            <Footer />
        </div>
    )
}


export { ItemPage, SearchItemPage }