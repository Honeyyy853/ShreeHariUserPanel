import React from "react";
import { Footer, Navbar } from "../components";
import { FaSeedling, FaTractor, FaLeaf, FaBoxOpen } from "react-icons/fa";
import { motion } from "framer-motion";

/* ===== THEME (based on your palette) =====
   https://colorhunt.co/palette/556b2f8fa31ec6d870eff5d2
*/
const theme = {
  bg: "#EFF5D2",        // 60%  background
  primary: "#556B2F",   // 30%  headings / structure
  secondary: "#8FA31E", // 30%  highlights
  accent: "#C6D870",    // 10%  attention / decoration

  textDark: "#2F3A1F",  // softer than pure black
  cardBg: "#F5F9E4"     // softer than pure white
};

const AboutPage = () => {

  const productData = [
    {
      icon: <FaSeedling size={34} />,
      title: "Seeds & Saplings",
      desc: "Premium seeds and saplings for high yield and healthy crops."
    },
    {
      icon: <FaTractor size={34} />,
      title: "Farming Tools",
      desc: "Modern tools and equipment to make farming efficient."
    },
    {
      icon: <FaLeaf size={34} />,
      title: "Crop Care",
      desc: "Organic fertilizers, pesticides and nutrients for crops."
    },
    {
      icon: <FaBoxOpen size={34} />,
      title: "Farm Supplies",
      desc: "Essential supplies and accessories for daily farming needs."
    }
  ];

  return (
    <>
      <Navbar />

      {/* ================= HERO ================= */}
      <section
        className="d-flex align-items-center justify-content-center text-center"
        style={{
          minHeight: "55vh",
          background: `linear-gradient(140deg, ${theme.primary}, ${theme.secondary})`,
          color: theme.cardBg
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="fw-bold display-5">
            About Shree Hari Agritech
          </h1>

          <p
            className="mt-3 mx-auto"
            style={{
              maxWidth: 720,
              color: "#E9F2D6",
              fontSize: "1.05rem"
            }}
          >
            Empowering farmers with sustainable and high-quality agricultural
            solutions for a better and smarter future.
          </p>
        </motion.div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="py-5" style={{ background: theme.bg }}>
        <div className="container">

          <h2
            className="text-center fw-bold mb-5"
            style={{ color: theme.primary }}
          >
            Our Products
          </h2>

          <div className="row g-4">

            {productData.map((item, index) => (
              <motion.div
                key={index}
                className="col-md-3 col-sm-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <div
                  className="h-100"
                  style={{
                    background: theme.cardBg,
                    borderRadius: 16,
                    padding: 22,
                    border: `1px solid ${theme.accent}`,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
                  }}
                >
                  <div className="text-center">

                    <div
                      className="d-inline-flex align-items-center justify-content-center mb-3"
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: "50%",
                        background: theme.accent
                      }}
                    >
                      {React.cloneElement(item.icon, {
                        color: theme.primary
                      })}
                    </div>

                    <h5
                      className="fw-bold"
                      style={{ color: theme.primary }}
                    >
                      {item.title}
                    </h5>

                    <p
                      style={{
                        color: theme.textDark,
                        fontSize: 14
                      }}
                    >
                      {item.desc}
                    </p>

                    {/* <button
                      className="btn btn-sm mt-2"
                      style={{
                        background: theme.secondary,
                        color: theme.cardBg,
                        borderRadius: 20,
                        padding: "6px 18px",
                        fontWeight: 600
                      }}
                    >
                      Shop Now
                    </button> */}

                  </div>
                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= STORY ================= */}
      <section
        className="container my-5 py-5"
        style={{ color: theme.textDark }}
      >
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2
            className="text-center fw-bold mb-4"
            style={{ color: theme.primary }}
          >
            Our Story
          </h2>

          <p
            className="text-center mx-auto"
            style={{
              maxWidth: 820,
              fontSize: "1.05rem"
            }}
          >
            At{" "}
            <span style={{ color: theme.secondary, fontWeight: 700 }}>
              Shree Hari Agritech
            </span>
            , we believe modern farming should be simple, affordable and
            sustainable. Our platform connects farmers directly with trusted
            seeds, tools and crop-care products to increase productivity while
            protecting nature.
          </p>
        </motion.div>

        {/* ================= MISSION & VISION ================= */}
        <div className="row text-center mt-5 g-4">

          <motion.div
            className="col-md-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="h-100 p-4"
              style={{
                background: theme.cardBg,
                borderRadius: 16,
                border: `1px solid ${theme.accent}`,
                boxShadow: "0 6px 18px rgba(0,0,0,0.06)"
              }}
            >
              <h4
                className="mb-3 fw-bold"
                style={{ color: theme.primary }}
              >
                Our Mission
              </h4>

              <p style={{ color: theme.textDark }}>
                To provide farmers of all scales with high-quality agricultural
                products, smooth digital shopping experience and expert
                guidance to support sustainable and profitable farming.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="col-md-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div
              className="h-100 p-4"
              style={{
                background: theme.cardBg,
                borderRadius: 16,
                border: `1px solid ${theme.accent}`,
                boxShadow: "0 6px 18px rgba(0,0,0,0.06)"
              }}
            >
              <h4
                className="mb-3 fw-bold"
                style={{ color: theme.primary }}
              >
                Our Vision
              </h4>

              <p style={{ color: theme.textDark }}>
                To strengthen India’s farming community by making smart
                agricultural solutions and quality products accessible to
                every farmer.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutPage;
