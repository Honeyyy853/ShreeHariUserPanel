import React, { useEffect, useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { IoCall } from "react-icons/io5";

const Footer = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <footer className={`shop-footer ${show ? "shop-footer-show" : ""}`}>
      <div className="container">
        <div className="row align-items-start justify-content-center gy-4">

          {/* Brand / short line */}
          <div className="col-lg-4 col-md-6 text-center text-md-start">
            <h5 className="fw-bold mb-2">Shree Hari Agritech</h5>
            <p className="text-muted small mb-3">
              Quality agriculture products and trusted services for farmers and
              businesses across India.
            </p>
          </div>

          {/* Contact info */}
          <div className="col-lg-4 col-md-6">
            <h6 className="fw-semibold mb-3 text-center text-md-start">
              Contact Us
            </h6>

            <ul className="list-unstyled shop-footer-list">
              <li>
                <IoCall className="me-2 text-success" />
                +91 8200050980, +91 9265669191
              </li>
              <li>
                <FaEnvelope className="me-2 text-success" />
                shreehariagri02@gmail.com
              </li>
              <li>
                <FaMapMarkerAlt className="me-2 text-success" />
                4022, Mota Faliya, Devsar, Bilimora Gandevi Road, Navsari,
                Gujarat, India 396380
              </li>
            </ul>
          </div>

        </div>

        <hr className="my-4" />

        <div className="text-center small text-muted">
          &copy; 2026 Shree Hari Agritech. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
