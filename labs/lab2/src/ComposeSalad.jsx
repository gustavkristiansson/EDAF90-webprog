import { useState } from "react";

function ComposeSalad(props) {
  const foundationList = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  const proteinList = Object.keys(props.inventory).filter(name => props.inventory[name].protein);
  const saladExtras = Object.keys(props.inventory).filter(name => props.inventory[name].extra);
  const dressingList = Object.keys(props.inventory).filter(name => props.inventory[name].dressing);
  const [foundation, setFoundation] = useState("Pasta");
  const [protein, setProtein] = useState("Kycklingfilé");
  // const [extras, setExtra] = useState({ Bacon: true, Fetaost: true });
  const [extras, setExtra] = useState(saladExtras);
  const [dressing, setDressing] = useState(dressingList)

  function handleFoundation(event) {
    setFoundation(event.target.value);
  }

  function handleProtein(event) {
    setProtein(event.target.value);
  }

  function handleExtras(event) {
    setExtra(event.target.value);
  }

  function handleDressing(event) {
    setDressing(event.target.value);
  }

  return (
    <div className="container col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>
        <fieldset className="col-md-12">
          <label htmlFor="foundation" className="form-label">Välj bas</label>
          <select onChange={handleFoundation} value={foundation} className="form-select" id="foundation">
            {foundationList.map(item => <option key={item} value={item}>{item}</option>)}
          </select>
          <label htmlFor="protein" className="form-label">Välj protein</label>
          <select onChange={handleProtein} value={protein} className="form-select" id="protein">
            {proteinList.map(item => <option key={item} value={item}>{item}</option>)}
          </select>
          <label htmlFor="extras" className="form-label">Välj tillbehör</label>
          <div onChange={handleExtras} checked={extras} className="form-check" id="extras">
            {saladExtras.map(item =>
              <div key={item}>
                <input className="form-check-input" type="checkbox" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">{item}</label>
              </div>
            )}
          </div>
          <label htmlFor="dressing" className="form-label">Välj dressing</label>
          <select onChange={handleDressing} value={dressing} className="form-select" id="dressing">
            {dressingList.map(item => <option key={item} value={item}>{item}</option>)}
          </select>
        </fieldset>
      </div>
    </div>
  );
}
export default ComposeSalad;
