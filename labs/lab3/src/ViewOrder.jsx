import { Outlet, useOutletContext } from "react-router-dom";

function ViewOrder() {
  const { shoppingCart } = useOutletContext();

  return (
    <>
      <Outlet context={{ shoppingCart }} />
      <div className="container bg-light col-12">
        <div className="row h-200 p-5 border rounded-3">
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
    </>
  );
}

export default ViewOrder;