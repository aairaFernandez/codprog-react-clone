import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <main>
      <nav>
        <h2 className="logo">
          <NavLink to="/">Codprog</NavLink>
        </h2>
        <ul>
          <li>
            <NavLink to="/Home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/About">About</NavLink>
          </li>
          <li>
            <NavLink to="/Signup">Signup</NavLink>
          </li>
          <li>
            <NavLink to="/Login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/MyCourses">MyCourses</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </main>
  );
}

export default RootLayout;
