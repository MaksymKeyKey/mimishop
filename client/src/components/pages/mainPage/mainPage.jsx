import React, { useState } from 'react';
import { useEffect } from 'react';
import MainProduct from "../../mainProduct/mainProduct";
import Footer from "../../common/footer/footer";
import Header from "../../common/header/header";
import Slide from "../../../resources/img/sale-banner.png";
import WalletImg from "../../../resources/img/wallet.svg";
import CardImg from "../../../resources/img/card.svg";
import CarImg from "../../../resources/img/car.svg";
import HeartImg from "../../../resources/img/heart.svg";
import Filters from '../../filters/filters';
import './mainPage.css';

const MainPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="App">
      <div className="info-header">
        <div className="container">
          Get 10% off your first order with code ECOFASHION10
        </div>
      </div>
      <div className='header-stiky'>
        <Header />
      </div>

      <div className="slider">
        <img src={Slide} alt="" />
      </div>
      <div className="menu-header">
        <Filters />
      </div>
      <div >
        <div className="news">
          <h1>Нові товари</h1>
          <MainProduct speciec="novetly" />
        </div>
        <div className="bests">
          <h1 style={{ textAlign: "center" }}>Найкраще</h1>
          <MainProduct speciec="best" />
        </div>
      </div>
      <div style={{ backgroundColor: "#F8F8FF" }} className="info_img-block">
        <div className="container">
          <div className="info_img-element">
            <img src={WalletImg} alt="" />
            <div className="info_img_element-txt">
              <p className='info_img_element-txt-head'>Широкий ассортимент</p>
              <p className='info_img_element-txt-content'>У нашому каталозі понад 1000  дитячих іграшок у різних категоріях.</p>
            </div>
          </div>
          <div className="info_img-element">
            <img src={CardImg} alt="" />
            <div className="info_img_element-txt">
              <p className='info_img_element-txt-head'>Легкість вибору</p>
              <p className='info_img_element-txt-content'>Швидке оформлення замовлення, безкоштовна консультація менеджера</p>
            </div>
          </div>
          <div className="info_img-element">
            <img src={CarImg} alt="" />
            <div className="info_img_element-txt">
              <p className='info_img_element-txt-head'>Ексклюзивні товари</p>
              <p className='info_img_element-txt-content'>Пропонуємо великий вибір ексклюзивних товарів за доступними цінами</p>

            </div>
          </div>
          <div className="info_img-element">
            <img src={HeartImg} alt="" />
            <div className="info_img_element-txt">
              <p className='info_img_element-txt-head'>Доступні ціни</p>
              <p className='info_img_element-txt-content'>Доступні ціни на всі позиції, найкраща ціна на ринку України</p>
            </div>
          </div>
        </div>
      </div>
      <div className='aboutUs'>
        <div className='container'>
          <h1 className='aboutUs-header'>Інтернет-магазин іграшок для дітей за дуже вигідною ціною!</h1>
          <div className='aboutUs-content'>
            <p>Шукаєте, де можна купити всі необхідні товари та іграшки для малюка? Вважаєте за краще довіряти відомим брендам з перевіреною якістю товару? Вам хочеться знайти портал із привабливими цінами на дитячі товари та іграшки?</p>

            <p>Який малюк не дивиться широко розкритими захопленими очима на пишноту іграшок у величезному супермаркеті? Яка мама не ловила свого малюка, що мчить між рядами дитячих товарів із чудовими ошатними ляльками та конструкторами? Які батьки не мріяли про найсучасніші та якісніші іграшки для своєї дитини?</p>

            <p>Як було б чудово, знайти чарівну країну чудес, де справджуються і потаємні мрії дитини, і заповітні бажання дбайливих мам і тат, де можна вибрати різні іграшки для дитини в Дніпрі та в Україні.</p>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "#F4F4F4" }}>
        <Footer />
      </div>

    </div>
  );
}

export default MainPage;
