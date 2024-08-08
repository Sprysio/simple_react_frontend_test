import React, { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  //const server_host = import.meta.env.VITE_SERVER_HOST;
  //const api_key = import.meta.env.VITE_API_KEY;
  const server_host = "#VITE_SERVER_HOST#";
  const api_key = "#VITE_API_KEY#";
  console.log(api_key)
  console.log(server_host)
  useEffect(() => {
    fetch(`api/products`)
      .then(response => response.json())
      .then(data => setProducts(data));

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, price: parseFloat(price) }),
    })
    .then(response => response.json())
    .then(data => setProducts([...products, data]));
  };

  return (
    <div>
      <h1>Product App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Add Product</button>
      </form>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} - ${product.price.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
