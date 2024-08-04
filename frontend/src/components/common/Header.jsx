import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/js/dist/dropdown";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Link } from "react-router-dom";
import { logout } from "../../app/authSlice";
import "./navbar.css";

function Header() {
  const { isLogged, access } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  const handleNotificationClick = () => {
    setToggle(!toggle);
    setNotificationCount(0);
  };

  return (
    <React.Fragment>
      <nav className="container my-2 rounded shadow-sm fixed-top navbar navbar-expand-lg navbar-light bg-white">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar-collapse"
          aria-controls="navbar-collapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbar-collapse">
          <a className="navbar-brand mr-auto font-weight-bold">HMS</a>
          <ul className="navbar-nav mt-2 mt-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to={"/"}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Explore
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/login"}>
                List Your Property
              </Link>
            </li>
          </ul>
          <div className="ml-auto d-flex align-items-center">
            {isLogged && (
              <div className="mr-3 position-relative">
                <button
                  className="btn text-secondary"
                  onClick={handleNotificationClick}
                >
                  <i className="bi bi-bell"></i>
                  {notificationCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger text-white">
                      {notificationCount}
                    </span>
                  )}
                </button>
                {toggle && (
                  <div className="p-2 notification bg-white shadow rounded border">
                    <ul className="list-group list-group-flush">
                      {notifications && notifications.length > 0 ? (
                        notifications.map((notification, idx) => (
                          <>
                            <li
                              className="list-group-item px-3 py-1"
                              key={idx + 1}
                            >
                              {notification.message}
                            </li>
                          </>
                        ))
                      ) : (
                        <div className="alert alert-warning m-0">
                          {" "}
                          No notification
                        </div>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            )}
            {isLogged ? (
              <div className="dropdown open">
                <a
                  className="text-secondary text-decoration-none dropdown-toggle"
                  type="button"
                  id="triggerId"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-fill"></i>
                  <span className="ml-2">User Profile</span>
                </a>
                <div className="dropdown-menu" aria-labelledby="triggerId">
                  <Link className="dropdown-item" to={"/profile"}>
                    Profile
                  </Link>
                  <Link className="dropdown-item" to={"/profile#wishlist"}>
                    Wishlist
                  </Link>
                  <Link className="dropdown-item" to={"/selection"}>
                    Selection
                  </Link>
                  <button
                    className="btn dropdown-item"
                    onClick={() => dispatch(logout())}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to={"/login"}
                className="text-secondary text-decoration-none"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default Header;
