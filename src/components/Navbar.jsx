import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cartItems = useSelector((state) => state.handleCart);
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const checkLogin = () => {
      const authStatus = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(authStatus);
    };

    checkLogin();
    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

 
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("email");
    localStorage.removeItem("user_id");

    setIsLoggedIn(false);
    navigate("/login");
  };

  const menu = [
    { to: "/", label: "Home" },
    { to: "/product", label: "Products" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav
      key={location.pathname}
      className={`navbar navbar-expand-lg bg-white shadow-sm sticky-top nav-fade
      ${showNavbar ? "nav-show" : "nav-hide"}`}
    >
      <div className="container py-2">
        {/* Brand */}
        <NavLink className="navbar-brand fw-bold fs-4 text-dark" to="/">
          Shree Hari
        </NavLink>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Menu */}
          <ul className="navbar-nav mx-auto gap-lg-3 text-center fancy-nav">
            {menu.map((item) => (
              <li className="nav-item" key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `nav-link fancy-link fw-semibold px-2 ${
                      isActive ? "active-link" : ""
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="d-flex align-items-center gap-2 fancy-actions">
            {!isLoggedIn && (
              <>
                <NavLink
                  to="/login"
                  className="btn btn-sm btn-outline-dark rounded-pill px-3"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="btn btn-sm btn-dark rounded-pill px-3"
                >
                  Register
                </NavLink>
              </>
            )}

            {isLoggedIn && (
              <>
                <NavLink
                  to="/profile"
                  className="btn btn-sm btn-light border rounded-pill px-3 d-flex align-items-center gap-1"
                >
                  <i className="fa fa-user"></i>
                  Profile
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-outline-danger rounded-pill px-3"
                >
                  Logout
                </button>

                <NavLink
                  to="/cart"
                  className="btn btn-sm btn-outline-dark rounded-pill position-relative px-3"
                >
                  <i className="fa fa-cart-shopping"></i>
                  <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
                  
                  </span>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
