import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import { Link } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    const formData = new FormData();
    formData.append("user_id", userId);

    axios
      .post(
        "http://localhost/ShreeHari/UserPanelAPI/viewCartUser.php",
        formData
      )
      .then((res) => {
        if (res.data.status === "true") {
          const data = (res.data.data || []).map((i) => ({
            ...i,
            qty: Number(i.quantity || 0),
          }));

          setCartItems(data);
        } else {
          setCartItems([]);
        }
      })
      .catch((err) => console.error("Cart API Error", err));
  }, []);

  // only local UI change
  const changeLocalQty = (productId, diff) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product_id === productId
          ? {
              ...item,
              qty: Math.max(0, Number(item.qty || 0) + diff),
            }
          : item
      )
    );
  };

  // update quantity on server
  const updateQuantity = (productId, newQty) => {
    if (newQty < 0) return;

    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    const formData = new FormData();
    formData.append("productID", productId);
    formData.append("userId", userId);
    formData.append("qty", newQty);

    axios
      .post("http://localhost/ShreeHari/updateCart.php", formData)
      .then((res) => {
        if (res.data.status === "true") {
          setCartItems((prev) =>
            prev.map((item) =>
              item.product_id === productId ? { ...item, qty: newQty } : item
            )
          );
        } else {
          alert(res.data.message || "Update failed");
        }
      })
      .catch((err) => console.error(err));
  };

  const removeFromCart = (productId) => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("product_id", productId);

    axios
      .post("http://localhost/ShreeHari/UserPanelAPI/removeCart.php", formData)
      .then((res) => {
        if (res.data.status === "true") {
          setCartItems((prev) =>
            prev.filter((item) => item.product_id !== productId)
          );
        } else {
          alert("Failed to remove item from cart");
        }
      })
      .catch((err) => console.error("Remove from Cart API Error", err));
  };

  const EmptyCart = () => (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 py-5 text-center">
          <h3 className="fw-bold mb-3">Your Cart is Empty</h3>
          <p className="text-muted">
            Looks like you haven’t added anything yet.
          </p>
          <Link
            to="/"
            className="btn btn-outline-success px-4 py-2 rounded-pill"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );

  const ShowCart = () => {
    const getFolder = (cat_id) => {
      if (cat_id === "1") return "Herbs";
      if (cat_id === "2") return "DehydratedFruits";
      if (cat_id === "3") return "DehydratedVegetables";
      return "Other";
    };

    const subtotal = cartItems.reduce(
      (sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0),
      0
    );

    const total = subtotal;

    return (
      <>
        <style>{`
.cart-item-card{
  border-radius:18px;
  border:1px solid #e5e7eb;
  background:#fff;
  transition:.25s ease;
}
.cart-item-card:hover{
  box-shadow:0 12px 28px rgba(0,0,0,.08);
  transform:translateY(-2px);
}
.product-img{
  max-height:90px;
  object-fit:contain;
}
.product-title{
  font-size:15px;
  font-weight:600;
}
.product-desc{
  font-size:13px;
  color:#6b7280;
}
.qty-box{
  display:inline-flex;
  align-items:center;
  border:1px solid #e5e7eb;
  border-radius:999px;
  overflow:hidden;
  background:#f9fafb;
}
.qty-btn{
  border:none;
  background:transparent;
  padding:6px 12px;
  font-size:16px;
  font-weight:600;
  cursor:pointer;
  color:#374151;
}
.qty-btn:hover{
  background:#e5e7eb;
}
.qty-value{
  min-width:28px;
  text-align:center;
  font-weight:600;
  font-size:14px;
  color:#111827;
}
.item-total{
  font-size:13px;
  font-weight:600;
  margin-top:4px;
  color:#059669;
}
.remove-btn{
  background:#fff1f2;
  color:#e11d48;
  border:none;
  padding:6px 14px;
  border-radius:999px;
  font-size:12px;
  font-weight:600;
}
.remove-btn:hover{
  background:#ffe4e6;
}
.summary-card{
  border-radius:20px;
  border:1px solid #e5e7eb;
  background:#ffffff;
  position:sticky;
  top:90px;
}
.summary-row{
  font-size:14px;
  color:#374151;
}
.summary-total{
  font-size:16px;
  font-weight:700;
}
        `}</style>

        <div className="row g-4">
          <div className="col-lg-8">
            {cartItems.map((item) => (
              <div
                className="card cart-item-card mb-3 p-3"
                key={item.product_id}
              >
                <div className="row align-items-center g-3">
                  <div className="col-md-3 text-center">
                    <img
                      src={`http://localhost/ShreeHari/uploads/${getFolder(
                        item.cat_id
                      )}/${item.image}`}
                      alt={item.name}
                      className="img-fluid rounded product-img"
                    />
                  </div>

                  <div className="col-md-5">
                    <h6 className="product-title mb-1">{item.name}</h6>
                    <p className="product-desc mb-0">{item.description}</p>
                  </div>

                  <div className="col-md-2 text-center">
                    <div className="qty-box mx-auto mb-2">
                      <button
                        className="qty-btn"
                        onClick={() => changeLocalQty(item.product_id, -1)}
                      >
                        −
                      </button>

                      <div className="qty-value">{item.qty}</div>

                      <button
                        className="qty-btn"
                        onClick={() => changeLocalQty(item.product_id, 1)}
                      >
                        +
                      </button>
                    </div>

                    <div className="item-total">
                      ₹{Number(item.price) * Number(item.qty)}
                    </div>
                  </div>

                  <div className="col-md-2 text-center">
                    <button
                      className="remove-btn mb-1"
                      onClick={() => updateQuantity(item.product_id, item.qty)}
                    >
                      Update
                    </button>

                    {/* <button
                      className="remove-btn"
                      onClick={() =>
                        removeFromCart(item.product_id)
                      }
                    >
                      Remove
                    </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-lg-4">
            <div className="card summary-card p-4">
              <h5 className="fw-bold mb-3">Order Summary</h5>

              {/* Products with quantity */}
              <div className="mb-3">
                {cartItems.map((item) => (
                  <div
                    key={item.product_id}
                    className="d-flex justify-content-between summary-row"
                    style={{ marginBottom: "6px" }}
                  >
                    <span>
                      {item.name} × {item.qty}
                    </span>

                    <span>₹{Number(item.price) * Number(item.qty)}</span>
                  </div>
                ))}
              </div>

              {/* <div className="d-flex justify-content-between mb-2 summary-row">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div> */}

              <hr />

              <div className="d-flex justify-content-between mb-3 summary-total">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <Link
                to="/checkout"
                className="btn btn-success w-100 py-2 rounded-pill"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar />

      <div className="container my-4">
        <h2 className="text-center fw-bold mb-4">My Cart</h2>
        {cartItems.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>

      <Footer />
    </>
  );
};

export default Cart;
