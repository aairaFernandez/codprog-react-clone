import React from "react";
import { Form, NavLink, Outlet, useRouteLoaderData } from "react-router-dom";

function RootLayout() {
  const parentRouteData = useRouteLoaderData("parentRoute");
  console.log("parentRouteData : ", parentRouteData);
  return (
    <main>
      <nav>
        <h2 className="logo">
          <NavLink to="/">Codprog</NavLink>
        </h2>
        <ul>
          {parentRouteData && (
            <li>
              <NavLink to="/Profile">Profile</NavLink>
            </li>
          )}
          {parentRouteData && (
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
          )}
          <li>
            <NavLink to="/About">About</NavLink>
          </li>
          {!parentRouteData && (
            <li>
              <NavLink to="/Signup">Signup</NavLink>
            </li>
          )}
          {!parentRouteData && (
            <li>
              <NavLink to="/Login">Login</NavLink>
            </li>
          )}
          {parentRouteData && (
            <li>
              <NavLink to="/MyCourses">MyCourses</NavLink>
            </li>
          )}
        </ul>
        {parentRouteData && (
          <Form action="/logout" method="POST">
            <button>Logout</button>
          </Form>
        )}
      </nav>
      <Outlet />
    </main>
  );
}

export default RootLayout;
