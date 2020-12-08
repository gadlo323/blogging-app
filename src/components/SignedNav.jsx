import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useAuth } from "../conteaxts/AutoConeaxt";
const Signednav = () => {
  const [error, setError] = useState("");
  const { handleLogout } = useAuth();
  const history = useHistory();

  const logOut = async () => {
    try {
      setError("");
      await handleLogout();
      history.push("/signin");
    } catch {
      setError("Faild to Logout...");
    }
  };
  return (
    <header className="header">
      <nav className="nav-bar">
        <ul className="all-pages">
          <li>
            <NavLink exact to="/" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/profile" activeClassName="active">
              Profile
            </NavLink>
          </li>
        </ul>
        <div>
          <button className="logo-out" onClick={logOut} type="button">
            <i className="fa fa-user"> Logout</i>
          </button>
          <span>{error}</span>
        </div>
      </nav>
    </header>
  );
};

export default Signednav;
