import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../app/authSlice";

function Navbar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <Link className="navbar-brand col-md-3 col-lg-2 mr-0 p-2" href="#">
        HMS
      </Link>
      <button
        className="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-toggle="collapse"
        data-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <input
        className="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          <button className="nav-link btn btn-outline-secondary p-1" onClick={handleLogout}>
            Sign out
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
