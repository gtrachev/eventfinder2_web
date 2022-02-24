import React from "react";
import { NavLink } from "react-router-dom";

const DesktopMenu: React.FC = () => {
  return (
    <div className="d-flex hide-mobile">
      <NavLink
        to={`/`}
        className={({ isActive }) =>
          "nav-link mr-2 d-block" + (isActive ? "secondary-text" : "")
        }
      >
        <span className="top-link">Home</span>
        <span className="bottom-link">Home</span>
      </NavLink>
      <NavLink
        to={`/`}
        className={({ isActive }) =>
          "nav-link mr-2 d-block" + (isActive ? "secondary-text" : "")
        }
      >
        <span className="top-link">Discover</span>
        <span className="bottom-link">Discover</span>
      </NavLink>
    </div>
  );
};

export default DesktopMenu;
