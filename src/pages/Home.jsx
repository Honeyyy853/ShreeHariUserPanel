import { Navbar, Main, Footer } from "../components";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [herbs, setHerbs] = useState([]);
  const [fruits, setFruits] = useState([]);
  const [vegetables, setVegetables] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/ShreeHari/UserPanelAPI/allProductAPI.php")
      .then((res) => {
        if (res.data.status) {
          setHerbs(res.data.herb || []);
          setFruits(res.data.df || []);
          setVegetables(res.data.dv || []);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const renderProducts = (items, category) => (
    <div className="container py-5">
      <h2 className="text-center display-4 fw-bold mb-5">{category}</h2>
      <div className="row g-4">
        {items.map((item) => (
          <div key={item.id} className="col-lg-3 col-md-4 col-sm-6">
            <div
              className="card h-100 border-0 shadow-lg position-relative overflow-hidden"
              style={{ cursor: "pointer", transition: "transform 0.3s" }}
            >
              <img
                src={`http://localhost/ShreeHari/uploads/${category.replace(
                  /\s/g,
                  ""
                )}/${item.image}`}
                alt={item.name}
                className="card-img-top"
                style={{
                  height: "250px",
                  objectFit: "cover",
                  transition: "transform 0.5s",
                }}
              />
              <div
                className="card-body text-center p-3 position-absolute bottom-0 start-0 w-100 text-white"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                  opacity: 0,
                  transition: "opacity 0.3s",
                }}
              >
                <h5 className="card-title">{item.name}</h5>
                {/* <p className="card-text">₹{item.price}</p>
                <button className="btn btn-success btn-sm">View Product</button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Add hover effect via JS
  useEffect(() => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "scale(1.05)";
        card.querySelector(".card-body").style.opacity = 1;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "scale(1)";
        card.querySelector(".card-body").style.opacity = 0;
      });
    });
  }, [herbs, fruits, vegetables]);

  return (
    <>
      <Navbar />
      <Main />

      {/* Herbs Section */}
      <section style={{ background: "#f0f8ff" }}>
        {renderProducts(herbs, "Herbs")}
      </section>

      {/* Dehydrated Fruits Section */}
      <section style={{ background: "#fffbe6" }}>
        {renderProducts(fruits, "Dehydrated Fruits")}
      </section>

      {/* Dehydrated Vegetables Section */}
      <section style={{ background: "#e6fff0" }}>
        {renderProducts(vegetables, "Dehydrated Vegetables")}
      </section>

      <Footer />
    </>
  );
}

export default Home;
