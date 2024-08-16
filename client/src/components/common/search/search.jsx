import React, { useEffect, useState } from "react";
import { useHttp, getData } from "../../../services/useHttp";
import { Link } from "react-router-dom";
import "./search.css"

const SearchProducts = () => {
  const { request } = useHttp();
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    getData()
      .then((data) => {
        console.log("Fetched products:", data);
        setProducts(data);
      })
      .catch((error) => {
        console.error("Не удалось получить данные", error);
      });
  }, [request]);

  function handleInputChange(event) {
    const input = event.target.value;
    setQuery(input);
    if (input.trim() === '') {
      setResults([]);
    } else {
      const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(input.toLowerCase())
      );
      setResults(filteredProducts);
    }
  };

  return (
    <div>
      <input
        className="search-input"
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={handleInputChange}
      />
      {
        results.length > 0 && <ul className="search_results-block">
          {results.map(product => (
            <li key={product.id}>
              <Link to={`/itemSearchPage/${product.id}`} state={{ product }}>
                <div className="search_results-element">
                  <img className="search_results-img" src={product.img} alt="" />
                  <div>{product.name}</div>
                </div>

              </Link>
            </li>

          ))}
        </ul>
      }
    </div>
  );
};

export default SearchProducts;
