import React, { useState } from 'react';
import MainProduct from "../../mainProduct/mainProduct";
import Footer from "../../common/footer/footer";
import Header from "../../common/header/header";
import Slide from "../../../resources/img/slide.svg";
import WalletImg from "../../../resources/img/wallet.svg";
import CardImg from "../../../resources/img/card.svg";
import CarImg from "../../../resources/img/car.svg";
import HeartImg from "../../../resources/img/heart.svg";
import './mainPage.css';

const MainPage = () => {

  return (
    <div className="App">
      
      <Header />
      <div className="slider">
        <img src={Slide} alt="" />
      </div>
      <div className="info_img-block">
        <div className="container">
          <div className="info_img-element">
            <img src={WalletImg} alt="" />
            <div className="info_img_element-txt">
              Оплата при отриманні
            </div>
          </div>
          <div className="info_img-element">
            <img src={CardImg} alt="" />
            <div className="info_img_element-txt">
              Оплата карткою онлайн
            </div>
          </div>
          <div className="info_img-element">
            <img src={CarImg} alt="" />
            <div className="info_img_element-txt">
              Швидка доставка
            </div>
          </div>
          <div className="info_img-element">
            <img src={HeartImg} alt="" />
            <div className="info_img_element-txt">
              Велика повага та любов до клієнтів!
            </div>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "#F8F5FF" }}>
        <div className="news">
          <h1>Нові товари</h1>
          <MainProduct speciec="novetly" />
        </div>
        <div className="bests">
          <h1 style={{ textAlign: "center" }}>Найкраще</h1>
          <MainProduct speciec="best" />
        </div>
      </div>
      <div style={{ backgroundColor: "#F4F4F4" }}>
        <Footer />
      </div>
    </div>
  );
}

export default MainPage;
