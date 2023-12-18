import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import AddInterface from "./../components/AddInterface";
import Interface from "./../components/Interface";
import InterfacesList from "./../components/InterfacesList";

function InterfacePage() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/interfaces" className="navbar-brand">
          bezKoder
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/interfaces"} className="nav-link">
              Interfaces
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route exact path={["/", "/interfaces"]} element={InterfacesList} />
          <Route exact path="/add" element={AddInterface} />
          <Route path="/interfaces/:id" element={Interface} />
        </Routes>
      </div>
    </div>
  );
}

export default InterfacePage;