import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar, Footer } from "../components";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const userId = localStorage.getItem("user_id");
  const [orders, setOrders] = useState([]);

  const [showTrack, setShowTrack] = useState(false);

  const [trackItem, setTrackItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    axios
      .get("http://localhost/ShreeHari/get_user_active_orders.php?user_id=" + userId)
      .then((res) => {
        setOrders(res.data.data || []);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  return (
    <>
      <Navbar />

      <style>{`
        :root{
          --primary:#198754;
          --soft:#f0fdf4;
          --dark:#0f172a;
        }

        .orders-section{
          background:linear-gradient(180deg,#f8fafc,#ffffff);
        }

        .order-card{
          border-radius:18px;
          border:1px solid rgba(0,0,0,.05);
          overflow:hidden;
          transition:.3s;
        }

        .order-card:hover{
          box-shadow:0 18px 35px rgba(0,0,0,.08);
        }

        .order-left{
          background:linear-gradient(180deg,#f0fdf4,#ffffff);
        }

        .order-title{
          font-weight:800;
          color:var(--dark);
        }

        .order-title::after{
          content:"";
          width:80px;
          height:4px;
          background:linear-gradient(90deg,#198754,#4ade80);
          display:block;
          margin-top:8px;
          border-radius:20px;
        }

        .item-row{
          background:#f8fafc;
          border-radius:12px;
          padding:10px;
        }

        .price-green{
          color:var(--primary);
          font-weight:700;
        }

        .view-link{
          color:#198754;
          font-weight:600;
          cursor:pointer;
        }

        .track-btn{
          background:#f0fdf4;
          border:1.5px dashed #198754;
          color:#166534;
          font-weight:600;
          border-radius:14px;
        }

        .invoice-btn{
          background:linear-gradient(135deg,#198754,#22c55e);
          border:none;
          color:#fff;
          font-weight:600;
          border-radius:14px;
        }

        .invoice-btn:hover{
          box-shadow:0 10px 22px rgba(25,135,84,.35);
          transform:translateY(-2px);
        }

        /* ---------- Track modal css ---------- */

        .track-backdrop{
          position:fixed;
          inset:0;
          background:rgba(0,0,0,.45);
          display:flex;
          align-items:center;
          justify-content:center;
          z-index:9999;
        }

        .track-modal{
          background:#f8fafc;
          width:750px;
          max-width:95%;
          padding:28px;
          border-radius:20px;
        }

        .track-wrapper{
          padding-top:30px;
        }

        .track-line{
          display:flex;
          align-items:center;
          justify-content:space-between;
        }

        .track-step{
          display:flex;
          align-items:center;
          flex:1;
        }

        .track-circle{
          width:38px;
          height:38px;
          border-radius:50%;
          border:3px solid #c7d2fe;
          display:flex;
          align-items:center;
          justify-content:center;
          font-weight:700;
          color:white;
          background:#c7d2fe;
          transition:.4s;
        }

        .track-circle.active{
          background:#5b3df5;
          border-color:#5b3df5;
        }

        .track-bar{
          flex:1;
          height:6px;
          background:#e5e7eb;
          margin:0 8px;
          border-radius:20px;
          overflow:hidden;
        }

        .track-bar.filled{
          background:#5b3df5;
          transition:all .6s ease;
        }

        .track-labels{
          display:grid;
          grid-template-columns:repeat(4,1fr);
          text-align:center;
          font-weight:600;
          margin-top:25px;
        }
      `}</style>

      <div className="container py-4 orders-section">
        <h4 className="mb-4 order-title">My Orders</h4>

        {orders.length === 0 && (
          <div className="card p-4 text-center border-0 shadow-sm">
            No orders found
          </div>
        )}

        {orders.map((o) => (
          <div key={o.order_id} className="card mb-4 order-card">
            <div className="row g-0">
              {/* LEFT */}
              <div className="col-md-4 p-4 order-left border-end">
                <div className="mb-3">
                  <small className="text-muted">Order ID</small>
                  <div className="fw-bold text-success">#{o.order_id}</div>
                </div>

                <div className="mb-3">
                  <small className="text-muted">Date</small>
                  <div className="fw-semibold">{o.order_date}</div>
                </div>

                <div className="mb-3">
                  <small className="text-muted">Total Amount</small>
                  <div className="price-green">₹{o.total_amount}</div>
                </div>

                <div className="mb-3">
                  <small className="text-muted">Order Status</small>
                  <div>
                    <span
                      className={`badge rounded-pill px-3 ${
                        o.order_status === "completed"
                          ? "bg-success"
                          : o.order_status === "cancelled"
                          ? "bg-danger"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {o.order_status}
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="col-md-8 p-4 bg-white">
                {(o.items || []).map((item, i) => (
                  <div
                    key={i}
                    className="d-flex mb-3 align-items-center item-row"
                  >
                    <div
                      className="me-3"
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 10,
                        overflow: "hidden",
                        background: "#e5f5ec",
                      }}
                    >
                      <img
                        src={`http://localhost/ShreeHari/uploads/${item.image}`}
                        alt={item.product_name}
                        className="img-fluid"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    <div className="flex-grow-1">
                      {/* ✅ PRODUCT NAME */}
                      <div className="fw-bold">{item.product_name}</div>

                      {/* ✅ STATUS */}
                      <div className="mt-1">
                        <span
                          className={`badge ${
                            item.item_status === "Delivered"
                              ? "bg-success"
                              : item.item_status === "Shipped"
                              ? "bg-primary"
                              : item.item_status === "Processing"
                              ? "bg-warning text-dark"
                              : item.item_status === "Cancelled"
                              ? "bg-danger"
                              : "bg-secondary"
                          }`}
                        >
                          {item.item_status}
                        </span>
                      </div>

                      {/* ✅ DESCRIPTION */}
                      <div className="text-muted small mt-1">
                        {item.description}
                      </div>

                      {/* ✅ VIEW PRODUCT */}
                      <div className="mt-1">
                        <span
                          className="small view-link"
                          onClick={() =>
                            navigate(`/productDetails/${item.product_id}`)
                          }
                        >
                          View Product
                        </span>
                      </div>
                    </div>
                    <div className="d-flex gap-3 justify-content-end">
                      <button
                        className="btn btn-sm track-btn px-3"
                        onClick={() => {
                          setTrackItem(item);
                          setShowTrack(true);
                        }}
                      >
                        Track Order
                      </button>
                    </div>
                    <div className="text-end ms-3">
                      <div className="fw-bold text-dark">₹{item.price}</div>

                      <div className="text-muted small">
                        Qty: {item.quantity}
                      </div>
                    </div>
                  </div>
                ))}

                <hr />
                <button className="btn btn-sm invoice-btn px-3">
                  View Invoice
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* -------- TRACK MODAL -------- */}

      {showTrack && trackItem && (
        <div className="track-backdrop">
          <div className="track-modal">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0 fw-bold">Order #{trackItem.order_id}</h5>

              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setShowTrack(false)}
              >
                ✕
              </button>
            </div>

            <TrackProgress status={trackItem.item_status} />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

/* ---------------- TRACK PROGRESS COMPONENT ---------------- */

const TrackProgress = ({ status }) => {
  const steps = ["pending", "processing", "shipped", "delivered"];

  const finalStatus = (status || "").toLowerCase();

  // If order is cancelled
  if (finalStatus === "canceled" || finalStatus === "cancelled") {
    return (
      <div className="track-wrapper text-center">
        {/* <div style={{ fontSize: "48px" }}>❌</div> */}

        <h5 className="fw-bold text-danger mt-2">Order Cancelled</h5>

        <p className="text-muted mb-4">
          Your order has been cancelled and will not be processed further.
        </p>

        <div
          style={{
            background: "#fff1f2",
            border: "1px solid #fecaca",
            borderRadius: "12px",
            padding: "14px",
            color: "#991b1b",
            fontWeight: 600,
          }}
        >
          If your payment was already completed, the refund will be initiated
          shortly.
        </div>
      </div>
    );
  }

  const currentStep = steps.indexOf(finalStatus);

  return (
    <div className="track-wrapper">
      <div className="track-line">
        {steps.map((s, i) => (
          <div key={i} className="track-step">
            <div className={`track-circle ${i <= currentStep ? "active" : ""}`}>
              {i <= currentStep ? "✓" : ""}
            </div>

            {i !== steps.length - 1 && (
              <div
                className={`track-bar ${i < currentStep ? "filled" : ""}`}
              ></div>
            )}
          </div>
        ))}
      </div>

      <div className="track-labels">
        <div>Pending</div>
        <div>Processing</div>
        <div>Shipped</div>
        <div>Delivered</div>
      </div>
    </div>
  );
};

export default Orders;
