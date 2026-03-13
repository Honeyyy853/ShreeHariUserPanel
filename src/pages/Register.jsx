import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircle } from "lucide-react";
import { Navbar, Footer } from "../components";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const addressRef = useRef();

  const registerUser = () => {
    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const phone = phoneRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const address = addressRef.current.value.trim();

    if (!name || !email || !phone || !password || !address) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", "user");
    formData.append("address", address);

    axios
      .post("http://localhost/ShreeHari/registerAPi.php", formData)
      .then((res) => {
        if (res.data.status === "true") {
          const mailData = new FormData();
          mailData.append("email", email);
          mailData.append("type", "register");

          axios
            .post("http://localhost/ShreeHari/sendMail.php", mailData)
            .then(() => console.log("Welcome email sent"))
            .catch((err) => console.log("Mail error:", err));

          setShowSuccess(true);
          setTimeout(() => navigate("/login"), 1500);
        } else {
          alert("Registration failed");
        }
      })
      .catch(() => alert("Server error"))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-5 col-md-7">
            {showSuccess && (
              <div className="alert alert-success d-flex align-items-center gap-2 mb-4">
                <CheckCircle size={18} />
                <span>Registration successful. Redirecting to login…</span>
              </div>
            )}

            <div
              className="card border-0 shadow-lg"
              style={{ borderRadius: "18px" }}
            >
              {/* Header */}
              <div
                className="text-center text-white py-4"
                style={{
                  borderTopLeftRadius: "18px",
                  borderTopRightRadius: "18px",
                  background: "linear-gradient(135deg, #2e7d32, #66bb6a)",
                }}
              >
                <h3 className="mb-1">Create Account</h3>
                <small>Join Shree Hari Agritech</small>
              </div>

              <div className="card-body p-4 p-md-5">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Full name</label>
                  <input
                    ref={nameRef}
                    className="form-control form-control-lg"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Email address
                  </label>
                  <input
                    ref={emailRef}
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Phone number</label>
                  <input
                    ref={phoneRef}
                    type="number"
                    className="form-control form-control-lg"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Password</label>
                  <input
                    ref={passwordRef}
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Create a password"
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold">Address</label>
                  <input
                    ref={addressRef}
                    className="form-control form-control-lg"
                    placeholder="Enter your address"
                  />
                </div>

                <button
                  onClick={registerUser}
                  disabled={loading}
                  className="btn btn-success w-100 py-2 fw-semibold"
                  style={{ borderRadius: "10px" }}
                >
                  {loading ? "Creating account..." : "Create Account"}
                </button>

                <div className="text-center mt-4">
                  <span className="text-muted">Already have an account?</span>{" "}
                  <Link
                    to="/login"
                    className="text-success fw-semibold text-decoration-none"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Register;
