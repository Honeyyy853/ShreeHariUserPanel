import React, { useEffect } from "react";
import { Navbar, Footer } from "../components";
import { useNavigate } from "react-router-dom";
import { Mail, User } from "lucide-react";

function Profile() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const handleSendMail = () => {
    alert("Email sent");
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7">

            <div
              className="card border-0 shadow-lg"
              style={{ borderRadius: "18px" }}
            >
              {/* Header */}
              <div
                className="text-white text-center py-4"
                style={{
                  borderTopLeftRadius: "18px",
                  borderTopRightRadius: "18px",
                  background:
                    "linear-gradient(135deg, #2e7d32, #66bb6a)",
                }}
              >
                <User size={38} className="mb-2" />
                <h4 className="mb-0">My Profile</h4>
                <small>Shree Hari Agritech Account</small>
              </div>

              <div className="card-body p-4 p-md-5 text-center">

                <div
                  className="mx-auto mb-4 d-flex align-items-center justify-content-center"
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    background: "#e8f5e9",
                  }}
                >
                  <User size={40} className="text-success" />
                </div>

                <h6 className="text-muted mb-1">Registered Email</h6>
                <p className="fw-semibold fs-5 mb-4">
                  {userEmail ? userEmail : "Not Available"}
                </p>

                <button
                  className="btn btn-success w-100 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
                  style={{ borderRadius: "10px" }}
                  onClick={handleSendMail}
                >
                  <Mail size={18} />
                  Send Mail
                </button>

              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;
