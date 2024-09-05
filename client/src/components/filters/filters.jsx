import { useHttp } from "../../services/useHttp";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./filters.css"

const Filters = () => {
  const { request } = useHttp();
  const [filters, setFilters] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    request("http://localhost:5000/filters")
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
     
        <ul className="filters-list">
          {filters.map((filter, index) => (
            <Link className="filter-name" to={`/itemCategoryPage/${filter.category}`} state={{ filter }}>
              <li
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <div style={{width:"auto"}}>{filter.name}</div>

              </li>
            </Link>
          ))}
        </ul>
      
    </div>
  );
};


export default Filters;
