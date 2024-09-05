import React, { useState } from 'react';

const products = [
  { id: 1, name: 'RRФутболка' },
  { id: 2, name: 'rДжинсы' },
  { id: 3, name: 'RRRRКроссовки' },
  // Здесь продолжайте список продуктов
];

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const input = e.target.value;
    setQuery(input);

    if (input.trim() === '') {
      setResults([]); // Если ввод пустой, очищаем результаты
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
        type="text"
        placeholder="Поиск товаров..."
        value={query}
        onChange={handleSearch}
      />
      <ul>
        {results.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
