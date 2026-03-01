import React, { useEffect, useState } from "react";
import { Navbar, Footer } from "../components";
import axios from "axios";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const formData = new FormData();
    formData.append("id", id);

    axios
      .post(
        "http://localhost/ShreeHari/UserPanelAPI/viewDetailsProducts.php",
        formData
      )
      .then((res) => {
        if (res.data.status === "true") {
          setProduct(res.data.data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <Navbar />

      <style>{`
        .details-wrapper {
          background: #f8fafc;
          padding: 40px 0;
        }

        .details-card {
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          padding: 30px;
        }

        .img-box {
          border-radius: 18px;
          overflow: hidden;
        }

        .detail-img {
          width: 100%;
          transition: transform 0.5s ease;
        }

        .detail-img:hover {
          transform: scale(1.05);
        }

        .price-tag {
          font-size: 1.6rem;
          font-weight: 700;
          color: #198754;
        }

        .badge-custom {
          background: #e6f4ea;
          color: #198754;
          padding: 6px 14px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.85rem;
        }

        .desc-box {
          background: #f1f5f9;
          padding: 15px;
          border-radius: 12px;
        }

        .cart-btn {
          background: linear-gradient(135deg, #198754, #22c55e);
          border: none;
          color: white;
          font-weight: 600;
          border-radius: 30px;
          padding: 10px 20px;
        }
        .img-box {
  border-radius: 18px;
  overflow: hidden;
  width: 400px;       
  height: 350px;      
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f0f0; 
}

.detail-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;  
  transition: transform 0.5s ease;
}

.detail-img:hover {
  transform: scale(1.05);
}

      `}</style>

      <div className="details-wrapper">
        <div className="container">
          {loading && <Skeleton height={400} borderRadius={20} />}

          {!loading &&
            product.map((p) => {
              let folder = "";

              if (p.category_name === "Herb") folder = "Herbs";
              if (p.category_name === "Dehydrated Fruit")
                folder = "DehydratedFruits";
              if (p.category_name === "Dehydrated vegetables ")
                folder = "DehydratedVegetables";

              return (
                <div className="details-card" key={p.id}>
                  <div className="row align-items-center">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <div className="img-box">
                        <img
                          src={`http://localhost/ShreeHari/uploads/${folder}/${p.image}`}
                          alt={p.name}
                          className="detail-img"
                          onError={(e) =>
                            (e.target.src =
                              "https://via.placeholder.com/400x350?text=No+Image")
                          }
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <h2 className="fw-bold">{p.name}</h2>

                      <div className="d-flex gap-3 align-items-center mb-3">
                        <span className="price-tag">₹ {p.price}</span>
                        <span className="badge-custom">{p.unit} gm</span>
                        <span className="badge-custom">{p.category_name}</span>
                      </div>

                      <h5 className="mt-3">Description</h5>
                      <div className="desc-box">
                        <p className="mb-0">{p.description}</p>
                      </div>

                      {/* <button className="cart-btn mt-4">Add to Cart</button> */}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;
