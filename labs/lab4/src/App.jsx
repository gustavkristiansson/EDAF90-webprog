import 'bootstrap/dist/css/bootstrap.css'
import { Outlet, useNavigation } from 'react-router-dom';
import { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { Spinner } from './Spinner';

function App() {
  const [shoppingCart, setShoppingCart] = useState([]);
  const addSalad = (salad) => setShoppingCart(shoppingCart.concat([salad]));
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