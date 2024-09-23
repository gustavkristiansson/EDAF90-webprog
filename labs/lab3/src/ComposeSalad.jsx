import { useState } from "react";
import Salad from "./Salad";
import { useNavigate, useOutletContext } from "react-router-dom";

function ComposeSalad() {
  const { inventory, addSalad } = useOutletContext();

  const foundationList = Object.keys(inventory).filter(
    (name) => inventory[name].foundation
  );
  const proteinList = Object.keys(inventory).filter(
    (name) => inventory[name].protein
  );
  const saladExtras = Object.keys(inventory).filter(
    (name) => inventory[name].extra
  );
  const dressingList = Object.keys(inventory).filter(
    (name) => inventory[name].dressing
  );

  const navigate = useNavigate();
  const [foundation, setFoundation] = useState("");
  const [protein, setProtein] = useState("");
  const [extras, setExtra] = useState({});
  const [dressing, setDressing] = useState("");
  const [touched, setTouched] = useState(false);
  const [showExtrasError, setExtrasError] = useState(false);

  function handleFoundation(event) {
    setFoundation(event.target.value);
  }

  function handleProtein(event) {
    setProtein(event.target.value);
  }

  function handleDressing(event) {
    setDressing(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    setTouched(true);
    if (!event.target.checkValidity()) {
      return;
    }

    // if (Object.keys(extras).length < 3 || Object.keys(extras).length > 9) {
    //   return;
    // }

    let salad = new Salad();
    salad
      .add(foundation, inventory[foundation])
      .add(protein, inventory[protein])
      .add(dressing, inventory[dressing]);
    Object.keys(extras).map((extra) =>
      salad.add(extra, inventory[extra])
    );

    addSalad(salad);
    navigate(`/view-order/confirm/${salad.uuid}`);

    setFoundation("");
    setProtein("");
    setDressing("");
    setExtra({});
    setTouched(false);
  }

  return (
    <div className="container col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>
        <form
          className={touched ? "was-validated" : ""}
          noValidate
          onSubmit={handleSubmit}>
          <fieldset className="col-md-12">
            <label htmlFor="foundation" className="form-label mt-4">
              Välj bas
            </label>
            <select
              required
              onChange={handleFoundation}
              value={foundation}
              className="form-select mb-3"
              id="foundation"
            >
              <option value="">Gör ditt val</option>
              {foundationList.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {/* <div className="invalid-feedback">Du måste fylla i</div> */}
            <label htmlFor="protein" className="form-label">
              Välj protein
            </label>
            <select
              required
              onChange={handleProtein}
              value={protein}
              className="form-select mb-3"
              id="protein"
            >
              <option value="">Gör ditt val</option>
              {proteinList.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <label htmlFor="extras" className="form-label">
              Välj tillbehör
            </label>
            <div className="row row-cols-4 mb-3" id="extras">
              {saladExtras.map((item) => (
                <div key={item} className="form-check">
                  <input
                    onChange={(event) =>
                      // Object.keys(extras).length < 3 && Object.keys(extras).length > 9 ? 
                      // setExtrasError(true) :  
                      setExtra({ ...extras, [item]: event.target.checked })
                    }
                    className="form-check-input col"
                    type="checkbox"
                    id="flexCheckDefault"
                    value={item}
                    checked={extras[item] || false}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    {item}
                  </label>
                </div>
              ))}
            </div>
            <label htmlFor="dressing" className="form-label">
              Välj dressing
            </label>
            <select
              required
              onChange={handleDressing}
              value={dressing}
              className="form-select"
              id="dressing"
            >
              <option value="">Gör ditt val</option>
              {dressingList.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <button type="submit" className="btn btn-primary mt-4">
              Beställ
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
export default ComposeSalad;
