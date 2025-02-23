import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

function Main() {
  useEffect(() => {
    const container = document.querySelector('.binary-rain-container');
    const columns = 50;

    for (let i = 0; i < columns; i++) {
      const column = document.createElement('div');
      column.className = 'binary-column';
      column.style.left = `${(100 / columns) * i}%`;
      column.style.animationDuration = `${Math.random() * 2 + 2}s`;
      column.textContent = '01'.repeat(30);
      container.appendChild(column);
    }
  }, []);

  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
