import { Link } from 'react-router-dom';
import "./subfilters.css";

const Subfilters = ({ selectedFilter }) => {
  if (!selectedFilter) {
    return <p>Выберите фильтр, чтобы увидеть субфильтры</p>;
  }

  return (
    <div className="subfilters">
      <div className="container">
        <ul className="subfilters-list">
          {selectedFilter.subfilters.map((subfilter, index) => (
            <li key={index}>
              <Link to={`/itemFilterPage/${subfilter.name}`} state={{ subfilter }}>
                <div className="subfilter-name">{subfilter.filterName}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Subfilters;
