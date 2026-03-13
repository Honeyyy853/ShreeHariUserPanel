import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar, Footer } from "../components";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const userId = localStorage.getItem("user_id");

  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost/ShreeHari/get_user_orders.php?user_id=${userId}`)
      .then((res) => {
        if (res.data && res.data.data) {
          setOrders(res.data.data);
        } else {
          setOrders([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });
  }, [userId]);

  /* FILTER ONLY DELIVERED ITEMS */
  const deliveredOrders = orders
    .map((order) => ({
      ...order,
      items: order.items.filter((item) => item.item_status === "Delivered"),
    }))
    .filter((order) => order.items.length > 0);

  const handleCancelOrder = async (order_id, product_id) => {
    const formData = new FormData();
    formData.append("order_id", order_id);
    formData.append("product_id", product_id);

    try {
      const res = await axios.post(
        "http://localhost/ShreeHari/cancelOrderApi.php",
        formData
      );

      alert(res.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <h3 className="fw-bold mb-4">Order History</h3>

        {deliveredOrders.length === 0 && (
          <div className="card p-4 text-center shadow-sm">
            No delivered orders found
          </div>
        )}

        {deliveredOrders.map((order) => (
          <div key={order.order_id} className="card mb-4 shadow-sm">
            <div className="row g-0">
              {/* LEFT ORDER DETAILS */}

              <div className="col-md-4 border-end bg-light p-4">
                <div className="mb-3">
                  <small className="text-muted">Order ID</small>
                  <div className="fw-bold text-success">#{order.order_id}</div>
                </div>

                <div className="mb-3">
                  <small className="text-muted">Order Date</small>
                  <div>{order.order_date}</div>
                </div>

                <div className="mb-3">
                  <small className="text-muted">Total Amount</small>
                  <div className="fw-bold text-success">
                    ₹{order.total_amount}
                  </div>
                </div>
              </div>

              {/* RIGHT ITEMS */}

              <div className="col-md-8 p-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center border rounded p-2 mb-3"
                  >
                    {/* IMAGE */}

                    <img
                      src={`http://localhost/ShreeHari/uploads/${item.image}`}
                      alt={item.product_name}
                      style={{
                        width: 70,
                        height: 70,
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                      className="me-3"
                    />

                    {/* PRODUCT INFO */}

                    <div className="flex-grow-1">
                      <div className="fw-bold">{item.product_name}</div>

                      <span className="badge bg-success mt-1">Delivered</span>

                      <div className="text-muted small mt-1">
                        {item.description}
                      </div>

                      <div
                        className="text-success small mt-1"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          navigate(`/productDetails/${item.product_id}`)
                        }
                      >
                        View Product
                      </div>
                    </div>

                    {/* PRICE */}

                    <div className="text-end">
                      <div className="fw-bold">₹{item.price}</div>

                      <div className="small text-muted">
                        Qty: {item.quantity}
                      </div>
                      <button
                        onClick={() =>
                          handleCancelOrder(order.order_id, item.product_id)
                        }
                        className="btn btn-danger btn-sm"
                      >
                        Return Item
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default OrderHistory;
