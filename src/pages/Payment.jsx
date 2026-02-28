import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar, Footer } from "../components";
import axios from "axios";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [method, setMethod] = useState("cod");

  const clearCart = () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.toLowerCase().includes("cart")) {
        localStorage.removeItem(key);
      }
    });

    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (!state) {
    return <div className="container py-5">No order data found</div>;
  }

  const { items, address, subtotal, shipping, total, shippingAddressFinal } =
    state;

  const handlePaymentCheck = async () => {
    try {
      const res = await axios.get(
        "http://localhost/ShreeHari/payment/createorder.php?amount=" + total
      );

      const data = res.data;

      const options = {
        key: "rzp_test_SHvbTnyYE85HSK",
        amount: data.amount,
        currency: "INR",
        order_id: data.id,

        name: "Demo Company",
        description: "Payment of ₹" + total,

        handler: function (response) {
          const formdata = new FormData();
          formdata.append("user_id", localStorage.getItem("user_id"));
          formdata.append("items", JSON.stringify(items));
          formdata.append("payment_id", response.razorpay_payment_id);
          formdata.append("payment_method", "online");
          formdata.append("shipping_address", shippingAddressFinal);

          axios
            .post("http://localhost/ShreeHari/orders.php", formdata)
            .then(async () => {
              const formdata2 = new FormData();
              formdata2.append("user_id", localStorage.getItem("user_id"));

              await axios.post(
                "http://localhost/ShreeHari/clearCart.php",
                formdata2
              );

              clearCart();

              alert(
                "Payment successful\nPayment ID : " +
                  response.razorpay_payment_id
              );

              navigate("/");
            });
        },

        prefill: {
          name: address?.name || "",
          contact: address?.phone || "",
        },

        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed");
    }
  };

  const handlePayment = () => {
    if (method === "cod") {
      const formdata = new FormData();
      formdata.append("user_id", localStorage.getItem("user_id"));
      formdata.append("items", JSON.stringify(items));
      formdata.append("payment_method", "cod");
      formdata.append("shipping_address", shippingAddressFinal);

      axios
        .post("http://localhost/ShreeHari/orders.php", formdata)
        .then(async () => {
          const fd2 = new FormData();
          fd2.append("user_id", localStorage.getItem("user_id"));

          await axios.post("http://localhost/ShreeHari/clearCart.php", fd2);

          clearCart();

          alert("Order placed successfully (Cash on Delivery)");
          navigate("/");
        });

      return;
    }

    handlePaymentCheck();
  };

  return (
    <>
      <Navbar />

      <div className="container py-4">
        <h3 className="mb-4">Payment</h3>

        <div className="row">
          {/* LEFT */}
          <div className="col-md-7 mb-3">
            <div className="card p-3 mb-3">
              <h5>Delivery Address</h5>

              <p className="mb-1">
                <b>Name:</b> {address.name}
              </p>

              <p className="mb-1">
                <b>Phone:</b> {address.phone}
              </p>

              <p className="mb-1">
                <b>Address:</b> {shippingAddressFinal}
              </p>
            </div>

            <div className="card p-3">
              <h5 className="mb-3">Select Payment Method</h5>

              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  checked={method === "cod"}
                  onChange={() => setMethod("cod")}
                />
                <label className="form-check-label">
                  Cash on Delivery
                </label>
              </div>

              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  checked={method === "upi"}
                  onChange={() => setMethod("upi")}
                />
                <label className="form-check-label">UPI</label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  checked={method === "card"}
                  onChange={() => setMethod("card")}
                />
                <label className="form-check-label">
                  Debit / Credit Card
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-md-5">
            <div className="card p-3">
              <h5 className="mb-3">Order Summary</h5>

              {items.map((item, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between mb-2"
                >
                  <span>
                    {item.name} × {item.qty}
                  </span>
                  <span>₹{item.price * item.qty}</span>
                </div>
              ))}

              <hr />

              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="d-flex justify-content-between">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <button
                onClick={handlePayment}
                className="btn btn-success w-100 mt-3"
              >
                Pay & Place Order
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Payment;