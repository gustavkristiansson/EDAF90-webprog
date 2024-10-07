import 'bootstrap/dist/css/bootstrap.css'
import { Outlet } from 'react-router-dom';
import inventory from './inventory.mjs';
import { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Navbar } from './Navbar';


function App() {
  const [shoppingCart, setShoppingCart] = useState([]);
  const addSalad = (salad) => setShoppingCart(shoppingCart.concat([salad])); 

  return (
    <div className="container py-4">
      <Header />
      <Navbar />
      <Outlet context={{ addSalad, shoppingCart }} />
      <Footer />
    </div>
  );
}

export default App;