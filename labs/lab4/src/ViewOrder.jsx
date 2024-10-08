import { Outlet, useOutletContext, useNavigate } from "react-router-dom";
import * as bootstrap from "bootstrap"
import { useState } from "react";
import Salad from "./Salad";

function ViewOrder() {
  const { shoppingCart, setShoppingCart } = useOutletContext();
  const [orderConfirmed, setOrderConfirmed] = useState()
  const navigate = useNavigate();


  console.log(shoppingCart.map((cartItem) => Object.keys(cartItem)));

  async function handleClick(e) {
    e.preventDefault()

    try {
      const data = await fetch("http://localhost:8080/orders/", {
        method: "POST",
        body: JSON.stringify(shoppingCart.map((cartItem => Object.keys(cartItem)))),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => {
        if (!response.ok) {
          throw new Error(`${url} returned status ${response.status}`);
        } else {
          return response.json();
        }
      });

      console.log(data);

      setOrderConfirmed(data)

      var toastElem = document.querySelector(".toast");
      var toast = new bootstrap.Toast(toastElem);
      toast.show();

      setShoppingCart([])
      window.localStorage.setItem("shoppingCart", [])
      navigate("/view-order")
    } catch(error) {
      console.log("Woops something went wrong", error);
    }
  }

  return (
    <>
      <Outlet context={{ shoppingCart }} />
      <div className="container bg-light col-12">
        <div className="row h-200 p-5 border rounded-3">
          <h2>Varukorgen</h2>
          {shoppingCart.map((cartItem) => (
            <div key={cartItem.uuid}>
              {Object.keys(cartItem).map((ingredient) => (
                <span key={ingredient}>{`${ingredient} `}</span>
              ))}
              <span>{`pris: ${cartItem.getPrice()}kr`}</span>
            </div>
          ))}
          <button
            type="submit"
            className="btn btn-primary mt-4 w-25 mx-auto"
            onClick={handleClick}
            id="toastBtn"
          >
            Beställ
          </button>
        </div>
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          <div
            id="toast"
            className="toast"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header">
              <strong className="me-auto">Beställningsbekräftelse</strong>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></button>
            </div>
            <div className="toast-body">
              {orderConfirmed
                ? `Tack för din beställning! Ditt ordernummer är ${orderConfirmed.uuid}`
                : "Beställningen misslyckades, var vänlig försök igen."}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewOrder;