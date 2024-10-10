import 'bootstrap/dist/css/bootstrap.css'
import { Outlet, useNavigation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { Spinner } from './Spinner';
import Salad from './Salad';

let didInit = false;

function App() {
  const [shoppingCart, setShoppingCart] = useState(() => {
    let currentCart;

    try {
      currentCart = Salad.parse(localStorage.getItem("shoppingCart") || String([]))
    } catch (error) {
      currentCart = []
    }

    return currentCart;
  });

  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
  }, [shoppingCart])

  const addSalad = (salad) => {
    setShoppingCart(shoppingCart.concat([salad]));
  };
  const nav = useNavigation()

  return (
    <div className="container py-4">
      <Header />
      <Navbar />
      {nav.state === "loading" && <Spinner />}
      <Outlet context={{ addSalad, shoppingCart, setShoppingCart }}/>
      <Footer />
    </div>
  );
}

export default App;