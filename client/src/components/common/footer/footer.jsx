import LogoImg from "../../../resources/img/logo.png"
import "./footer.css"

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-cols">
                        <div className="footer-cols-header">
                            <img src={LogoImg} alt="" />
                        </div>
                        <div className="footer-cols-elements">

                            <div className="footer-cols-element flex">
                                <img src="" alt="" />
                                <span>098-254-31-26</span>
                            </div>
                            <div className="footer-cols-element flex">
                                <img src="" alt="" />
                                <span>097-652-33-78</span>
                            </div>
                            <div className="footer-cols-element flex">
                                <img src="" alt="" />
                                <span>info@mimi_shop.ua</span>
                            </div>
                        </div>
                    </div>
                    <div className="footer-cols">
                        <div className="footer-cols-header">
                            <h3>
                                ІНФОРМАЦІЯ
                            </h3>
                        </div>
                        <div className="footer-cols-elements">
                            <div className="footer-cols-element">
                                Поширенні запитання
                            </div>
                            <div className="footer-cols-element">
                                Відгуки про магазин
                            </div>
                        </div>
                    </div>
                    <div className="footer-cols">
                        <div className="footer-cols-header">
                            <h3>
                                СПІВПРАЦЯ
                            </h3>
                        </div>
                        <div className="footer-cols-elements">

                            <div className="footer-cols-element">
                                Запитання щодо співпраці
                            </div>
                            <div className="footer-cols-element">
                                Про нас
                            </div>

                        </div>
                    </div>
                    <div className="footer-cols">
                        <div className="footer-cols-header">
                            <h3>
                                ДОСТАВКА ТА ОПЛАТА
                            </h3>
                        </div>
                        <div className="footer-cols-elements">
                            <div className="footer-cols-element">
                                Публічна оферта
                            </div>
                            <div className="footer-cols-element">
                                Повернення товару
                            </div>
                            <div className="footer-cols-element">
                                Доставка та оплата
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;