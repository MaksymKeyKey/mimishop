import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getData } from "../../services/useHttp";
import ItemProduct from "../common/layout/itemProduct/ItemProduct";
import { useEffect, useState } from "react";

const MainProduct = ({speciec}) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getData("/itemProduct")
      .then((items) => {
        if (Array.isArray(items)) {
          setItems(settingData(items));
        } else {
          console.error("Отримані дані не є масивом:", items);
        }
      })
      .catch((error) => {
        console.error("Не вдалося отримати дані", error);
      });
  }, []);

  function settingData(arr) {
    return arr.filter((item) => item.species === speciec);
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="container">
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.id}>
            <ItemProduct id={item._id} name={item.name} img={item.img} cost={item.cost} width={item.width} height={item.height} materials={item.materials} countryOfManufacture={item.countryOfManufacture}/>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MainProduct;
