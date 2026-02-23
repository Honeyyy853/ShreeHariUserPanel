import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar, Footer } from "../components";
import axios from "axios";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [method, setMethod] = useState("cod");

  if (!state) {
    return <div className="container py-5">No order data found</div>;
  }

  const { items, address, subtotal, shipping, total } = state;

  // SAME AS PaymentCheck
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
        description: "Payment of ₹1000",

        handler: function (response) {
          console.log("cart data", items);

          const formdata = new FormData();
          formdata.append("user_id", localStorage.getItem("user_id"));
          formdata.append("items", JSON.stringify(items));

          axios
            .post("http://localhost/ShreeHari/orders.php", formdata)
            .then((res) => {
              console.log("order placed", res.data);
            });

          console.log("Payment Success", response);
          alert(
            "Payment successful\nPayment ID : " + response.razorpay_payment_id
          );
        },

        prefill: {
          name: "Test User",
          email: "test@mail.com",
          contact: "9999999999",
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
    // COD
    if (method === "cod") {
      alert("Order placed successfully (Cash on Delivery)");
      navigate("/");
      return;
    }

    // SAME button logic as PaymentCheck
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
                <b>Address:</b> {address.address}
              </p>
            </div>

            <div className="card p-3">
              <h5 className="mb-3">Select Payment Method</h5>

              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  checked={method === "cod"}
                  onChange={() => setMethod("cod")}
                />
                <label className="form-check-label">Cash on Delivery</label>
              </div>

              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  checked={method === "upi"}
                  onChange={() => setMethod("upi")}
                />
                <label className="form-check-label">UPI</label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  checked={method === "card"}
                  onChange={() => setMethod("card")}
                />
                <label className="form-check-label">Debit / Credit Card</label>
              </div>

              {method === "upi" && (
                <input
                  className="form-control mt-3"
                  placeholder="Enter UPI ID"
                />
              )}

              {method === "card" && (
                <div className="mt-3">
                  <input
                    className="form-control mb-2"
                    placeholder="Card Number"
                  />
                  <div className="row">
                    <div className="col">
                      <input className="form-control" placeholder="MM/YY" />
                    </div>
                    <div className="col">
                      <input className="form-control" placeholder="CVV" />
                    </div>
                  </div>
                </div>
              )}
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
                    {item.name} × {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
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
