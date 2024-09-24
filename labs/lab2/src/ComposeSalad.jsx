import { useState } from "react";
import Salad from "./Salad";

function SaladSelect({ value, onChange, options }) {
  return (
    <select value={value} onChange={event => onChange(event.target.value)} className="form-select">
      {options.map(name => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  )
}

function ComposeSalad(props) {
  const inventory = props.inventory;
  const foundationList = Object.keys(inventory).filter((name) => inventory[name].foundation);
  const proteinList = Object.keys(inventory).filter((name) => inventory[name].protein);
  const saladExtras = Object.keys(inventory).filter((name) => inventory[name].extra);
  const dressingList = Object.keys(inventory).filter((name) => inventory[name].dressing);

  const [foundation, setFoundation] = useState("Pasta");
  const [protein, setProtein] = useState("Kycklingfilé");
  const [extras, setExtra] = useState({});
  const [dressing, setDressing] = useState("Ceasardressing");

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

    let salad = new Salad();
    salad
      .add(foundation, props.inventory[foundation])
      .add(protein, props.inventory[protein])
      .add(dressing, props.inventory[dressing]);
    Object.keys(extras).map((extra) =>
      salad.add(extra, props.inventory[extra])
    );

    props.addSalad(salad);

    setFoundation("Pasta");
    setProtein("Kycklingfilé");
    setDressing("Ceasardressing");
    setExtra({});
  }

  function composeCaesar() {
    setFoundation("Sallad");
    setProtein("Kycklingfilé");
    setDressing("Ceasardressing");
    setExtra({ Bacon: true, Krutonger: true, Parmesan: true });
  }

  return (
    <div className="container col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>
        <form onSubmit={handleSubmit}>
          <button
            type="button"
            onChange={composeCaesar}
            className="btn btn-secondary mt-2"
          >
            Caesarsallad
          </button>

          <fieldset className="col-md-12">
            <label htmlFor="foundation" className="form-label mt-4">
              Välj bas
            </label>
            <SaladSelect value={foundation} onChange={setFoundation} options={foundationList} />
            <label htmlFor="protein" className="form-label mt-4">
              Välj protein
            </label>
            <SaladSelect value={protein} onChange={setProtein} options={proteinList} />
            <label htmlFor="extras" className="form-label mt-4">
              Välj tillbehör
            </label>
            <div className="row row-cols-4 mx-auto" id="extras">
              {saladExtras.map((item) => (
                <div key={item} className="form-check">
                  <input
                    onChange={(event) =>
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
            <label htmlFor="dressing" className="form-label mt-4">
              Välj dressing
            </label>
            <SaladSelect value={dressing} onChange={setDressing} options={dressingList} />

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
