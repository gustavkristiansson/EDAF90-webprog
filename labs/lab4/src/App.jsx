import 'bootstrap/dist/css/bootstrap.css'
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { useEffect } from 'react';

async function inventoryLoader() {
  const inventory = { Sallad: { price: 10, foundation: true, vegan: true } };
  await new Promise(resolve => setTimeout(resolve, 500));
  return inventory;
}

async function safeFetchJson(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${url} returned status ${response.status}`);
      }
      return response.json();
    });
}

async function fetchFoundations() {
  return safeFetchJson('http://localhost:8080/foundations/');
}

function App() {
  const [shoppingCart, setShoppingCart] = useState([]);
  const addSalad = (salad) => setShoppingCart(shoppingCart.concat([salad]));
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    Promise.all(fetchFoundations()).then(response => setInventory[response]);
  }, [setInventory]);

  return (
    <div className="container py-4">
      <Header />
      <Navbar />
      <Outlet context={{ inventory, addSalad, shoppingCart }} />
      <Footer />
    </div>
  );
}

export default App;