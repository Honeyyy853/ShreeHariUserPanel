import React, { useEffect, useState } from "react";
import { Navbar, Footer } from "../components";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const user_id = localStorage.getItem("user_id");
  const [item1, setItem1] = useState([]);
  const [item2, setItem2] = useState([]);
  const [item3, setItem3] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // if (!user_id) {
    //   setLoading(false);
    //   return;
    // }

    const formData = new FormData();
    formData.append("user_id", user_id);

    axios
      .post(
        "http://localhost/ShreeHari/UserPanelAPI/allProductAPI.php",
        formData
      )
      .then((response) => {
        if (response.data.status === true) {
          setItem1(response.data.herb || []);
          setItem2(response.data.df || []);
          setItem3(response.data.dv || []);
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user_id]);

  const addToCart = (prod) => {
    if (!user_id) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("productID", prod.id);
    formData.append("userId", user_id);

    axios
      .post("http://localhost/ShreeHari/addCartApi.php", formData)
      .then((res) => {
        if (res.data.status === "true") {
      
          setItem1((prev) =>
            prev.map((p) => (p.id === prod.id ? { ...p, cartStatus: 1 } : p))
          );

          setItem2((prev) =>
            prev.map((p) => (p.id === prod.id ? { ...p, cartStatus: 1 } : p))
          );

          setItem3((prev) =>
            prev.map((p) => (p.id === prod.id ? { ...p, cartStatus: 1 } : p))
          );
        } else {
          alert(res.data.message || "Failed");
        }
      })
      .catch(() => {
        alert("Server error");
      });
  };

  const allProducts = [
    ...item1.map((p) => ({ ...p, type: "herb" })),
    ...item2.map((p) => ({ ...p, type: "df" })),
    ...item3.map((p) => ({ ...p, type: "dv" })),
  ];

  return (
    <>
      <Navbar />

      <style>{`
        :root {
          --primary: #198754;
          --dark: #0f172a;
        }

        .products-section {
          background: linear-gradient(180deg, #f8fafc, #ffffff);
        }

        .section-title {
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--dark);
          position: relative;
        }

        .section-title::after {
          content: "";
          width: 90px;
          height: 4px;
          background: linear-gradient(90deg, var(--primary), #4ade80);
          display: block;
          margin: 12px auto 0;
          border-radius: 20px;
        }

        .product-card {
          border-radius: 18px;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.05);
          transition: all 0.4s ease;
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 18px 35px rgba(0, 0, 0, 0.12);
        }

        .img-wrapper {
          height: 230px;
          overflow: hidden;
          background:#f1f5f9;
        }

        .product-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .product-card:hover .product-img {
          transform: scale(1.1);
        }

        .line-clamp {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .price {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--primary);
        }

        .unit-badge {
          background: #e6f4ea;
          color: var(--primary);
          font-size: 0.75rem;
          padding: 4px 12px;
          border-radius: 20px;
          font-weight: 600;
        }

        .cart-btn {
          background: linear-gradient(135deg, #198754, #22c55e);
          border: none;
          color: #fff;
          font-weight: 600;
          border-radius: 14px;
          padding: 10px 12px;
          transition: all 0.3s ease;
        }

        .cart-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 22px rgba(25, 135, 84, 0.4);
        }

        .view-btn{
          background:#f0fdf4;
          border:1.5px dashed #198754;
          color:#166534;
          font-weight:600;
          border-radius:14px;
          padding:10px 12px;
          transition:.25s;
        }

        .view-btn:hover{
          background:#dcfce7;
          transform:translateY(-2px);
        }

        .action-row{
          display:flex;
          gap:12px;
          margin-top:16px;
        }
      `}</style>

      <div className="container my-5 products-section">
        <h2 className="text-center mb-5 section-title">Our Products</h2>

        {loading && (
          <div className="row g-4">
            {[...Array(6)].map((_, i) => (
              <div className="col-lg-4 col-md-6" key={i}>
                <Skeleton height={230} borderRadius={18} />
                <Skeleton count={3} className="mt-2" />
              </div>
            ))}
          </div>
        )}

        {!loading && allProducts.length === 0 && (
          <p className="text-center text-muted mt-5">No products found.</p>
        )}

        {!loading && (
          <div className="row g-4">
            {allProducts.map((prod) => {
              let folder = "";
              if (prod.type === "herb") folder = "Herbs";
              if (prod.type === "df") folder = "DehydratedFruits";
              if (prod.type === "dv") folder = "DehydratedVegetables";

              return (
                <div
                  className="col-lg-4 col-md-6"
                  key={`${prod.type}-${prod.id}`}
                >
                  <div className="card product-card h-100">
                    <div className="img-wrapper">
                      <img
                        src={`http://localhost/ShreeHari/uploads/${folder}/${prod.image}`}
                        alt={prod.name}
                        className="product-img"
                        onError={(e) =>
                          (e.target.src =
                            "https://via.placeholder.com/300x220?text=No+Image")
                        }
                      />
                    </div>

                    <div className="card-body d-flex flex-column p-4">
                      <h5 className="fw-semibold mb-2">{prod.name}</h5>

                      <p className="text-muted small line-clamp mb-3">
                        {prod.description}
                      </p>

                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <span className="price">₹ {prod.price}</span>
                        <span className="unit-badge">{prod.unit} gm</span>
                      </div>

                      <div className="action-row">
                        {/* <button
                          className="cart-btn flex-fill"
                          onClick={() => addToCart(prod)}
                        >
                          {prod.cartStatus === 1 ? "Go to Cart" : "Add to Cart"}
                        </button> */}
                        <button
                          className="cart-btn flex-fill"
                          onClick={() => {
                            if (prod.cartStatus === 1) {
                              navigate("/cart");
                            } else {
                              addToCart(prod);
                            }
                          }}
                        >
                          {prod.cartStatus === 1 ? "Go to Cart" : "Add to Cart"}
                        </button>

                        <button
                          className="view-btn flex-fill"
                          onClick={() => navigate(`/productDetails/${prod.id}`)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Products;
