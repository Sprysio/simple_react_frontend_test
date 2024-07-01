import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8888/api/message')
      .then(response => response.text())
      .then(data => setMessage(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{message}</h1>
        <p>Learn React</p>
        <p>docker compose up -d --build --pull always</p>
        <p>test 5 feature branch final?</p>
      </header>
    </div>
  );
}

export default App;
