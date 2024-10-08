import { Outlet, useOutletContext } from "react-router-dom";
// import { Toaster } from "./Toaster";
// import "bootstrap/dist/css/bootstrap.css";

const { Toast } = bootstrap

function Toaster() {
  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div
        id="toast"
        className="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <img src="..." className="rounded me-2" alt="..." />
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">Hello, world! This is a toast message.</div>
      </div>
    </div>
  );
}

function ViewOrder() {
  const { shoppingCart } = useOutletContext();

  async function handleClick(e) {
    e.preventDefault()

    const toastTrigger = document.getElementById("toastBtn");
    const toastLiveExample = document.getElementById("toast");

    if (toastTrigger) {
      const toastBootstrap =
        bootstrap.Toast.getOrCreateInstance(toastLiveExample);
      toastTrigger.addEventListener("click", () => {
        toastBootstrap.show();
      });
    }

    try {
      const promise = await fetch("http://localhost:8080/orders/", {
        method: "POST",
        body: JSON.stringify(shoppingCart.map((cartItem => Object.keys(cartItem)))),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => {
        if(!response.ok) {
          throw new Error(`${url} returned status ${response.status}`);
        } else {
          return response.json();
        }
      });

      const data = Promise.all(promise)

      console.log(data);
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
        </div>
        <button type="submit" className="btn btn-primary mt-4" onClick={handleClick} id="toastBtn">
          Beställ
        </button>
        <Toaster />
      </div>
    </>
  );
}

export default ViewOrder;