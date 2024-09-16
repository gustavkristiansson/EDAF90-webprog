import Salad from './Salad';

function ViewOrder(props) {
  const shoppingCart = props.shoppingCart;

  if (shoppingCart !== undefined) {
    return (
      <div className="container col-12">
        <div className="row h-200 p-5 bg-light border rounded-3">
          <h2>Varukorgen</h2>
          {shoppingCart.map(
            cartItem => 
              <div key={cartItem.uuid}>
                {(Object.keys(cartItem).map(ingredient =>
                  <span key={ingredient}>{`${ingredient} `}</span>))
                }
                <span>{`pris: ${cartItem.getPrice()}kr`}</span>
              </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="container col-12">
        <div className="row h-200 p-5 bg-light border rounded-3">
          <h2>Varukorgen</h2>
          
        </div>
      </div>
    );
  } 
}

export default ViewOrder;