import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import './sidebar.css'

function SideBar() {
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-dark min-vh-100 sidebar position-fixed collapse"
    >
      <div className="sidebar-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link" to={"/super/dashboard"}>
              <i className="bi bi-house mr-3"></i>
              Dashboard <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/super/hotels"}>
              <i className="bi bi-buildings mr-3"></i>
              Hotels
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/super/users"}>
              <i className="bi bi-people mr-3"></i>
              Users
            </Link>
          </li>
          
        </ul>
      </div>
    </nav>
  );
}

export default SideBar;
