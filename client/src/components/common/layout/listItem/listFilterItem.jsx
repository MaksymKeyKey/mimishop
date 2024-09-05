import { useHttp, getData } from "../../../../services/useHttp";
import { useEffect, useState } from "react";
import ItemProduct from "../itemProduct/ItemProduct";
import "./listFilterItem.css"
const ListFilterItem = ({ filterName, species, categoryName }) => {
  const { request } = useHttp();
  const [listItem, setListItem] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await getData();
        if (items) {
          setListItem(settingData(items));
          console.log(items)
        }
      } catch (error) {
        console.error("Не удалось получить данные", error);
      }
    };

    fetchData();
  }, [request, filterName, species, categoryName]);

  function settingData(arr) {
    const items = arr
      .filter((item) =>
        (filterName && item.subcategory === filterName) ||
        (species && item.species === species) ||
        (categoryName && item.category === categoryName)
      )
      .map((item) => (
        <li key={item._id}>
          <ItemProduct _id={item._id} id={item._id} name={item.name} img={item.img} cost={item.cost} width={item.width} height={item.height} materials={item.materials} countryOfManufacture={item.countryOfManufacture}/>
        </li>
      ));
    return <ul className="catalog_list-blok">{items}</ul>;
  }

  return (
    <div className="container-catalog">
      {listItem}
    </div>
  );
};

export default ListFilterItem;
