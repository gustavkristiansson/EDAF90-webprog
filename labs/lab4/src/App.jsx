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
    const prevCart = localStorage.getItem("shoppingCart");

    if (prevCart !== null) {
      return JSON.parse(prevCart)
    } else {
      return []
    }
  });

  // useEffect(() => {
  //   if (!didInit) {
  //     didInit = true;
  //     const cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  //     setShoppingCart(cart);
  //   }
  // }, [])

  // useEffect(() => {
  //   localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
  // }, [shoppingCart])

  const addSalad = (salad) => {
    setShoppingCart(shoppingCart.concat([salad]));
    console.log(shoppingCart);
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

    console.log(localStorage.getItem("shoppingCart"))
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