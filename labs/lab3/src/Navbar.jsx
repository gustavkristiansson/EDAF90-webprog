import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link className="nav-link" to="/compose-salad">
          Komponera en sallad
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/view-order">
          Se din varukorg
          </Link>
        </li>
      </ul>
    </nav>
  );
}
