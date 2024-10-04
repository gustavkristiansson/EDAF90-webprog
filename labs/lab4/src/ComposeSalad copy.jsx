import { useState } from "react";
import Salad from "./Salad";
import { useNavigate, useOutletContext } from "react-router-dom";

function SaladSelect({ value, onChange, options, id }) {
  return (
    <select value={value} onChange={event => onChange(event.target.value)} className="form-select" required id={id}>
      <option value="">Gör ditt val</option>
      {options.map(name => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  )
}

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

  function handleSubmit(event) {
    event.preventDefault();

    setTouched(true);
    if (!event.target.checkValidity()) {
      return;
    }

    const salad = new Salad();
    salad
      .add(foundation, inventory[foundation])
      .add(protein, inventory[protein])
      .add(dressing, inventory[dressing]);
    Object.keys(extras).filter(extra => extras[extra]).map((extra) =>
      salad.add(extra, inventory[extra])
    );

    if (salad.count('extra') > 9 || salad.count('extra') < 3) {
      setExtrasError(true);
      return;
    };

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
            <SaladSelect value={foundation} onChange={setFoundation} options={foundationList} id="foundation" />
            <label htmlFor="protein" className="form-label mt-4">
              Välj protein
            </label>
            <SaladSelect value={protein} onChange={setProtein} options={proteinList} id="protein" />
            <label htmlFor="extras" className="form-label mt-4">
              Välj tillbehör
            </label>
            <div className="row row-cols-4 mx-auto" id="extras">
              {saladExtras.map((item) => (
                <div key={item} className="form-check">
                  <input
                    onChange={(event) => {
                      setExtra({ ...extras, [item]: event.target.checked });
                      if (Object.keys(extras).length > 2 && Object.keys(extras).length < 10) {
                        setExtrasError(false);
                      }
                    }}
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
            {showExtrasError &&
              (<div className="mt-3 alert alert-danger alert-dismissible fade show" role="alert">
                <p>Du måste välja minst 3 och max 9 tillbehör.</p>
              </div>)}
            <label htmlFor="dressing" className="form-label mt-4">
              Välj dressing
            </label>
            <SaladSelect value={dressing} onChange={setDressing} options={dressingList} id="dressing" />

            <button type="submit" className="btn btn-primary mt-4">
              Beställ
            </button>

            <button
              type="reset"
              onClick={() => {
                setFoundation("");
                setProtein("");
                setDressing("");
                setExtra({});
              }}
              className="btn btn-secondary mt-4 ml-3"
            >
              Börja om
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
export default ComposeSalad;
