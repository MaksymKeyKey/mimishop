import { useHttp } from "../../services/useHttp";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import ".http://13.53.147.216/api/filters.css"

const Filters = () => {
  const { request } = useHttp();
  const [filters, setFilters] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    request("http://localhost:5000http://13.53.147.216/api/filters")
      .then((data) => {
        setFilters(data);
        console.log(data[0].name);
      })
      .catch((error) => {
        console.error("Не удалось получить данные", error);
      });
  }, []);

  const handleMouseEnter = (index) => {
    setIsHovered(true);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoveredIndex(null);
  };

  return (
    <div className="filters">
      <div className="container">
        <ul className="filters-list">
          {filters.map((filter, index) => (

            <li
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <Link style={{textDecoration:"none", color:"black"}} to={`/itemCategoryPage/${filter.category}`} state={{ filter }}>{filter.name}</Link>
              <div className="filters_elements-block">
                {isHovered && hoveredIndex === index
                  ? filter.subfilters.map((item) => <Link to={`/itemFilterPage/${item.name}`} state={{ item }}><div className="filters_element">{item.filterName}</div></Link>)
                  : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default Filters;
