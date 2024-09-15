import { useState } from "react";
import Salad from './Salad';

function ComposeSalad(props) {
  const foundationList = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  const proteinList = Object.keys(props.inventory).filter(name => props.inventory[name].protein);
  const saladExtras = Object.keys(props.inventory).filter(name => props.inventory[name].extra);
  const dressingList = Object.keys(props.inventory).filter(name => props.inventory[name].dressing);

  const [foundation, setFoundation] = useState('Pasta');
  const [protein, setProtein] = useState('Kycklingfilé');
  const [extras, setExtra] = useState({ Bacon: true, Fetaost: true });
  const [dressing, setDressing] = useState('Ceasardressing')

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

    props.addSalad(new Salad({
      foundation: { name: foundation, ...props.inventory[foundation]},
      protein: { name: protein, ...props.inventory[protein]},
      dressing: { name: dressing, ...props.inventory[dressing]},
      ...Object
    }))

  }

  return (
    <div className="container col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>
        <form onSubmit={handleSubmit}>
          <fieldset className="col-md-12">
            <label htmlFor="foundation" className="form-label">Välj bas</label>
            <select onChange={handleFoundation} value={foundation} className="form-select mb-3" id="foundation">
              {foundationList.map(item => <option key={item} value={item}>{item}</option>)}
            </select>
            <label htmlFor="protein" className="form-label">Välj protein</label>
            <select onChange={handleProtein} value={protein} className="form-select mb-3" id="protein">
              {proteinList.map(item => <option key={item} value={item}>{item}</option>)}
            </select>
            <label htmlFor="extras" className="form-label">Välj tillbehör</label>
            <div className="row row-cols-4 mb-3" id="extras">
              {saladExtras.map(item =>
                <div key={item} className="form-check">
                  <input 
                    onChange={event => setExtra({ ...extras, [item]: event.target.checked})} 
                    className="form-check-input col" 
                    type="checkbox" 
                    id="flexCheckDefault" 
                    value={item} 
                    checked={extras[item] || false} 
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault">{item}</label>
                </div>
              )}
            </div>
            <label htmlFor="dressing" className="form-label">Välj dressing</label>
            <select onChange={handleDressing} value={dressing} className="form-select" id="dressing">
              {dressingList.map(item => <option key={item} value={item}>{item}</option>)}
            </select>

            <button type="submit" className="btn btn-primary mt-4">Beställ</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
export default ComposeSalad;
