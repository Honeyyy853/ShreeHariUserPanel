import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./index.css";

const Home = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <section className={`shop-hero ${show ? "shop-hero-show" : ""}`}>
        <div className="container">
          <div className="row align-items-center min-vh-75">

            {/* LEFT CONTENT */}
            <div className="col-lg-6 text-center text-lg-start shop-hero-left">
              <span className="badge bg-dark mb-3 px-3 py-2 shop-badge">
                New Collection 2026
              </span>

              <h1 className="display-5 fw-bold mb-3 shop-title">
                Discover products that make your life better
              </h1>

              <p className="lead text-muted mb-4 shop-subtitle">
                Premium quality items, fast delivery and easy returns.
                Choose from hundreds of products curated just for you.
              </p>

              <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
                <NavLink to="/product" className="btn btn-dark px-4 py-2 rounded-pill">
                  Shop Now
                </NavLink>

                <NavLink
                  to="/about"
                  className="btn btn-outline-dark px-4 py-2 rounded-pill"
                >
                  Learn More
                </NavLink>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="col-lg-6 text-center shop-hero-right">
              <div className="shop-image-wrap">
                <img
                  src="./assets/home.jpg"
                  alt="Shop hero"
                  className="img-fluid shop-hero-img"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
