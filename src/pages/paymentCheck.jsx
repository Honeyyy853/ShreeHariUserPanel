import React from "react";
import axios from "axios";
import { Navbar, Footer } from "../components";

const PaymentCheck = () => {

  const handlePaymentCheck = async () => {
    try {
      // create order from backend
      const res = await axios.get(
        "http://localhost/ShreeHari/payment/createorder.php"
      );

      const data = res.data;

      const options = {
        key: "rzp_test_SHvbTnyYE85HSK", // your test key
        amount: data.amount,           // should be 100000 (₹1000)
        currency: "INR",
        order_id: data.id,

        name: "Demo Company",
        description: "Payment of ₹1000",

        handler: function (response) {
          alert(
            "Payment successful\nPayment ID : " +
              response.razorpay_payment_id
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

  return (
    <>
      <Navbar />

      <div className="container py-4 text-center">
        <h3 className="mb-3">Payment Check</h3>

        <h5 className="mb-3">Amount to Pay : ₹1000</h5>

        <button className="btn btn-primary" onClick={handlePaymentCheck}>
          Pay ₹1000
        </button>
      </div>

      <Footer />
    </>
  );
};

export default PaymentCheck;
