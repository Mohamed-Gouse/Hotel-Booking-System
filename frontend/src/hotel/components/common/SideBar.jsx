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
            <Link className="nav-link" to={"/admin/dashboard"}>
              <i className="bi bi-house mr-3"></i>
              Dashboard <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/admin/hotels"}>
              <i className="bi bi-buildings mr-3"></i>
              Hotels
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/admin/bookings"}>
              <i className="bi bi-cart mr-3"></i>
              Bookings
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/admin/messages"}>
              <i className="bi bi-envelope mr-3"></i>
              Messages
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link className="nav-link" to={"/admin/coupons"}>
              <i className="bi bi-tag mr-3"></i>
              Coupons
            </Link>
          </li> */}
          <li className="nav-item">
            <Link className="nav-link" to={"/admin/reviews"}>
              <i className="bi bi-star mr-3"></i>
              Reviews/Ratings
            </Link>
          </li>
          
        </ul>
      </div>
    </nav>
  );
}

export default SideBar;
