import SearchProducts from "../search/search";
import Backet from "../basket/backet";
import Filters from "../../filters/filters";
import LogoImg from "../../../resources/img/logo.png"
import PhoneImg from "../../../resources/img/phone-call.svg"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../modal/modal";
import Login from "../../pages/regPages/Login";
import Registration from "../../pages/regPages/Registration";
import CabinetImg from "../../../resources/img/cabinet.png"
import Slide from "../../../resources/img/slide.svg";
import './header.css'


const Header = () => {
    const styles = {
        Icon: {
            color: '#d431c0',
            fill: '#d431c0',
            fontSize: '26px',
            top: '31px',
            left: '25px',
            width: '35px',
            height: '35px',
        },
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('login');
    const navigate = useNavigate();

    const toggleModal = (open = !isModalOpen) => {
        setIsModalOpen(open);
    };

    const handlePersonalCabinetClick = () => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/cabinet');
        } else {
            toggleModal(true);
        }
    }

    return (
        <div className="header-container">
            
            <div className="main-header">
                <div className="container">
                    <div className="logo-block">
                        <Link style={{textDecoration:"none"}} to={'/'}>
                            <div className="logotype">
                                <svg className="logo-img" style={styles.Icon} viewBox="0 0 448 512">
                                    <path d="M112 112C112 50.14 162.1 0 224 0C285.9 0 336 50.14 336 112V160H400C426.5 160 448 181.5 448 208V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V208C0 181.5 21.49 160 48 160H112V112zM160 160H288V112C288 76.65 259.3 48 224 48C188.7 48 160 76.65 160 112V160zM136 256C149.3 256 160 245.3 160 232C160 218.7 149.3 208 136 208C122.7 208 112 218.7 112 232C112 245.3 122.7 256 136 256zM312 208C298.7 208 288 218.7 288 232C288 245.3 298.7 256 312 256C325.3 256 336 245.3 336 232C336 218.7 325.3 208 312 208z">
                                    </path>
                                </svg>
                                <div className="logo-text">MimiShop</div>
                            </div>
                        </Link>
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
                        
                        <Modal isOpen={isModalOpen} onClose={() => toggleModal(false)}>
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
                    
                    <div className="search-block">
                        <SearchProducts />
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div onClick={handlePersonalCabinetClick} style={{ cursor: 'pointer' }}><img className='cabinet-img' src={CabinetImg} /></div>
                    </div>
                    <div className="cart-block">
                        <Backet />
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}
export default Header