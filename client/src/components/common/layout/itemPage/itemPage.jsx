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
border: 2px dashed #5cb85c;
background-color: #f0f8ff;
padding: 15px;
margin: 15px;
transition: background-color 0.3s ease, border-color 0.3s ease;
display: flex;
justify-content: space-between;
    margin-top: 100px;
    width: auto;


.costProduct{
  position: absolute;
  top: 40%;
}

.nameProduct {
  font-weight: bold;
  color: #5cb85c;
}

.costProduct {
  color: #444;
}
.colorSelect{
display: block;
position: absolute;
  top: 55%;
}

.leftSide{
width: 45%;
}
.rightSide{
position: relative;
    width: 45%;
}
.productPageContent{
 display: flex;
justify-content: space-between;

}

.productBtns{
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
  width: 100%;
}
  .productBtns input[type="number"] {
width: 60px;
padding: 5px;
margin-right: 10px;
display: block;
}

.totalCost {
margin-left: 10px;
font-size: 16px;
font-weight: bold;
color: #333;
display: block;
}
.colorSelect{
display: flex;
}
img {
  width: 350px;
  height: 450px;
  margin: 0 auto;
}

button {
  background-color: #F58DEF;
  color: white;
  border: none;
  padding: 12px;
  cursor: pointer;
  width: 300px;
}

.tabs-container {
    margin-top: 20px;
}

.tabs-header button {
    margin-right: 10px;
    padding: 10px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    cursor: pointer;
}

.tabs-header button.active {
    background-color: #d0e0d0;
    border-bottom: none;
}

.tabs-content {
    border: 1px solid #ccc;
    padding: 20px;
    background-color: #fff;
}

.reviews-tab {
    margin-top: 20px;
}


`;

    return (
        <div>
            <Header />
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
    border: 2px dashed #5cb85c;
    background-color: #f0f8ff;
    padding: 15px;
    margin: 15px;
    transition: background-color 0.3s ease, border-color 0.3s ease;
    display: flex;
    justify-content: space-between;
     

    .costProduct{
      position: absolute;
      top: 60%;
    }

    .nameProduct {
      font-weight: bold;
      color: #5cb85c;
    }

    .costProduct {
      color: #444;
    }
    .colorSelect{
    display: block;
    position: absolute;
      top: 70%;
  }

.leftSide{
    width: 45%;
  }
    .rightSide{
        width: 45%;
    }
    .productPageContent{
     display: flex;
    justify-content: space-between;

    }
    
    .productBtns{
        display: flex;
        justify-content: space-between;
        position: absolute;
        bottom: 0;
      width: 35%;
    }
      .productBtns input[type="number"] {
    width: 60px;
    padding: 5px;
    margin-right: 10px;
    display: block;
  }
  
  .totalCost {
    margin-left: 10px;
    font-size: 16px;
    font-weight: bold;
    color: #333;
    display: block;
  }
.colorSelect{
    display: flex;
  }
    img {
      width: 350px;
      height: 450px;
      margin: 0 auto;
    }

    button {
      background-color: #F58DEF;
      color: white;
      border: none;
      padding: 12px;
      cursor: pointer;
      width: 300px;
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