import SearchProducts from "../search/search";
import Backet from "../basket/backet";
import Filters from "../..http://13.53.147.216/api/filtershttp://13.53.147.216/api/filters";
import LogoImg from "../../../resources/img/logo.png"
import PhoneImg from "../../../resources/img/phone-call.svg"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../modal/modal";
import Login from "../../pages/regPageshttp://13.53.147.216/api/login";
import Registration from "../../pages/regPages/Registration";
import CabinetImg from "../../../resources/img/cabinet.png"
import './header.css'


const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('login');
    const navigate = useNavigate();

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const handlePersonalCabinetClick = () => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/cabinet');
        } else {
            openModal();
        }
    }

    return (
        <div className="header-container">
            <div className="info-header">
                <div className="container">
                    <ul className="pagesList">
                        <li>Про нас</li>
                        <li>Доставка</li>
                        <li>Оплата</li>
                        <li>Повернення товару</li>
                        <li>Контакти</li>
                    </ul>
                </div>
            </div>
            <div className="main-header">
                <div className="container">
                    <div className="logo-block">
                        <Link to={'/'}>
                            <img className="logo-img" src={LogoImg} alt="" />
                        </Link>
                    </div>
                    <div className="search-block">
                        <SearchProducts />
                    </div>
                    <div className="tell_me-block">
                        <div className="tell_me">
                            <img className="tell_me-img" src={PhoneImg} alt="" />
                            <a href="tel:+380982543126" className="tell_me-txt">
                                <span>Зателефонуйте нам!</span>
                               
                            </a>
                        </div>
                    </div>
                    <div className="reg-btn-container">
                        <div className="reg-btn" onClick={openModal}>Вхід / Реєстрація</div>
                        <Modal isOpen={isModalOpen} onClose={closeModal}>
                            <div className="tabs">
                                <button
                                    className={activeTab === 'login' ? 'active' : ''}
                                    onClick={() => setActiveTab('login')}
                                >
                                    Login
                                </button>
                                <button
                                    className={activeTab === 'register' ? 'active' : ''}
                                    onClick={() => setActiveTab('register')}
                                >
                                    Register
                                </button>
                            </div>
                            {activeTab === 'login' ? <Login /> : <Registration />}
                        </Modal>
                    </div>
                    <div style={{ display:"flex", alignItems:"center" }}>
                        <div onClick={handlePersonalCabinetClick} style={{ cursor: 'pointer' }}><img className='cabinet-img' src={CabinetImg}/></div>
                    </div>
                    <div className="cart-block">
                        <Backet />
                    </div>
                </div>
            </div>
            <div className="menu-header">
                <Filters />
            </div>
        </div>
    )
}

export default Header;
