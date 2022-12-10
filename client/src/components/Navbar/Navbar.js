import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="/dogs" activeClassName="selected">
              Principal
            </NavLink>
          </li>
          <li>
            <NavLink to="/create">Formulario</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
