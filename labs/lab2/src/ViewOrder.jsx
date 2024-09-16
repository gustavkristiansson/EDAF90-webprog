function ViewOrder(props) {
  return (
    <div className="container bg-light col-12">
      <div className="row h-200 p-5 border rounded-3">
        <h2>Varukorgen</h2>
        {props.shoppingCart.map(
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
}

export default ViewOrder;