import 'bootstrap/dist/css/bootstrap.css'
import inventory from './inventory.mjs';
import ComposeSalad from './ComposeSalad';
import ViewOrder from "./ViewOrder";
import { useState } from 'react';

function App() {
  const [shoppingCart, setShoppingCart] = useState([]);

  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Min egen salladsbar</span>
      </header>

      <ComposeSalad inventory={inventory} addSalad={salad => setShoppingCart(shoppingCart.concat([salad]))} />

      {console.log(shoppingCart)}
      
      <ViewOrder shoppingCart={shoppingCart} />

      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webprogrammering
      </footer>
    </div>
  );
}

export default App;