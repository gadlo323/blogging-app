import React from "react";
import { NavLink } from "react-router-dom";
const Nav = () => {
  return (
    <nav className="nav-bar">
      <ul className="all-pages">
        <li>
          <NavLink exact to="/signin" activeClassName="active">
            signIn
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
