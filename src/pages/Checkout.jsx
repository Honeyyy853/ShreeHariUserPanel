import React, { useEffect, useState } from "react";
import { Navbar, Footer } from "../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const [sameAddress, setSameAddress] = useState("no");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    const fd = new FormData();
    fd.append("user_id", userId);

    axios
      .post("http://localhost/ShreeHari/UserPanelAPI/viewCartUser.php", fd)
      .then((res) => {
        if (res.data.status === "true") {
          const data = (res.data.data || []).map((i) => ({
            ...i,
            qty: Number(i.quantity || 0),
          }));
          setItems(data.filter((i) => i.qty > 0));
        }
      });
  }, []);

  const fetchRegisteredAddress = async () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    const fd = new FormData();
    fd.append("user_id", userId);

    try {
      const res = await axios.post("http://localhost/ShreeHari/users.php", fd);

      if (res.data.status === "true") {
        const u = res.data.data;

        setForm({
          name: u.name || "",
          phone: u.phone || "",
          address: u.address || "",
          city: "",
          pincode: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const subtotal = items.reduce(
    (s, i) => s + Number(i.price || 0) * Number(i.qty || 0),
    0
  );

  const shipping = items.length > 0 ? 40 : 0;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {

    alert("Order placed (demo)");
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all address fields");
      return;
    }

    if (items.length === 0) {
      alert("Your cart is empty");
      return;
    }

    alert("Order placed (demo)");
  };

  return (
    <>
      <Navbar />

      <div className="container my-4">
        <h3 className="fw-bold mb-4">Checkout</h3>

        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="row g-4">
            {/* Left : Address */}
            <div className="col-md-7">
              <div className="card p-4">
                {/* Same as registered address */}
                <div className="mt-3">
                  <h5 className="mb-3">Same as registered address</h5>

                  <div className="form-check mt-1">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="sameAddress"
                        id="sameAddressYes"
                        value="yes"
                        checked={sameAddress === "yes"}
                        onChange={() => {
                          setSameAddress("yes");
                          fetchRegisteredAddress();
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="sameAddressYes"
                      >
                        Yes
                      </label>
                    </div>

                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="sameAddress"
                        id="sameAddressNo"
                        value="no"
                        checked={sameAddress === "no"}
                        onChange={() => {
                          setSameAddress("no");
                          setForm({
                            name: "",
                            phone: "",
                            address: "",
                            city: "",
                            pincode: "",
                          });
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="sameAddressNo"
                      >
                        No
                      </label>
                    </div>
                  </div>
                </div>

                <h5 className="mb-3 mt-4">Delivery Address</h5>

                <input
                  className="form-control mb-2"
                  placeholder="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />

                <input
                  className="form-control mb-2"
                  placeholder="Mobile Number"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />

                <textarea
                  className="form-control mb-2"
                  placeholder="Full Address"
                  name="address"
                  rows="3"
                  value={form.address}
                  onChange={handleChange}
                />

                {/* city and pincode are not in your DB yet */}

                {/* <div className="mt-3">
                  <b>Payment Method</b>
                  <div className="form-check mt-1">
                    <input
                      className="form-check-input"
                      type="radio"
                      checked
                      readOnly
                    />
                    <label className="form-check-label">
                      Cash on Delivery
                    </label>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Right : Order summary */}
            <div className="col-md-5">
              <div className="card p-4">
                <h5 className="mb-3">Order Summary</h5>

                {items.map((i) => (
                  <div
                    key={i.product_id}
                    className="d-flex justify-content-between mb-2"
                  >
                    <div>
                      {i.name} × {i.qty}
                    </div>
                    <div>₹{Number(i.price) * Number(i.qty)}</div>
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

                <div className="d-flex justify-content-between fw-bold mb-3">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

                {/* <button
                  className="btn btn-success w-100"
                  onClick={placeOrder}
                >
                  Place Order
                </button> */}
                <button
                  onClick={() =>
                    navigate("/payment", {
                      state: {
                        items,
                        address: form,
                        subtotal,
                        shipping: 40,
                        total: subtotal + 40,
                      },
                    })
                  }
                  className="btn btn-success w-100"
                >
                  Place Order
                </button>
              </div>
            </div>   
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Checkout;
