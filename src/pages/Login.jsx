import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar, Footer } from "../components";
import { CheckCircle } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const loginUser = () => {
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!email || !password) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    axios
      .post("http://localhost/ShreeHari/UserPanelAPI/LoginAPi.php", formData)
      .then((res) => {
        if (res.data.status === "true") {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("user_id", res.data.user_id);
          const mailData = new FormData();
          mailData.append("email", email);
          mailData.append("type", "login");
          axios
            .post("http://localhost/ShreeHari/sendMail.php", mailData)
            .then(() => console.log("Welcome email sent"))
            .catch((err) => console.log("Mail error:", err));
          setShowSuccess(true);
          setTimeout(() => navigate("/"), 1500);
        } else {
          alert("Invalid email or password");
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
                <span>Login successful. Redirecting...</span>
              </div>
            )}

            <div
              className="card border-0 shadow-lg"
              style={{ borderRadius: "18px" }}
            >
              {/* top gradient header */}
              <div
                className="text-center text-white py-4"
                style={{
                  borderTopLeftRadius: "18px",
                  borderTopRightRadius: "18px",
                  background: "linear-gradient(135deg, #2e7d32, #66bb6a)",
                }}
              >
                <h3 className="mb-1">Welcome Back</h3>
                <small>Shree Hari Agritech</small>
              </div>

              <div className="card-body p-4 p-md-5">
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
                  <label className="form-label fw-semibold">Password</label>
                  <input
                    ref={passwordRef}
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  onClick={loginUser}
                  disabled={loading}
                  className="btn btn-success w-100 py-2 fw-semibold"
                  style={{ borderRadius: "10px" }}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>

                <div className="text-center mt-4">
                  <span className="text-muted">Don’t have an account?</span>{" "}
                  <Link
                    to="/register"
                    className="text-success fw-semibold text-decoration-none"
                  >
                    Create account
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

export default Login;
