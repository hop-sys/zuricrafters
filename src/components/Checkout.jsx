import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Checkout.css";
import FloatingButtons from "./FloatingButtons";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const cartKey = user ? `cart_${user.email}` : null;

  // LOAD CART
  const loadCart = () => {
    if (!user) return;
    const savedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCart(savedCart);
  };

  useEffect(() => {
    if (!user) {
      navigate("/signup");
      return;
    }

    loadCart();
  }, []);

  // SAVE CART
  const saveCart = (updatedCart) => {
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    setCart(updatedCart);
    window.dispatchEvent(new Event("storage"));
  };

  // INCREASE
  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item.product_id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    saveCart(updated);
  };

  // DECREASE
  const decreaseQty = (id) => {
    let updated = cart.map((item) =>
      item.product_id === id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    updated = updated.filter((item) => item.quantity > 0);
    saveCart(updated);
  };

  // REMOVE
  const removeFromCart = (id) => {
    const updated = cart.filter((item) => item.product_id !== id);
    saveCart(updated);
  };

  // TOTAL
  const total = cart.reduce(
    (sum, item) => sum + Number(item.product_cost) * item.quantity,
    0
  );
  
  // PAYMENT
  const handlePayment = async () => {
  if (!phone) {
    alert("Please enter your M-Pesa number");
    return;
  }

  try {
    setLoading(true);

    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("amount", total);

    const response = await fetch(
      "http://hope.alwaysdata.net/api/mpesa_payment",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.message) {
      alert(data.message);
    }

    // clear cart after request is sent
    setCart([]);
    localStorage.removeItem(cartKey);
    setPhone("");

  } catch (error) {
    console.error("Payment error:", error);
    alert("Payment failed. Try again.");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="container mt-4">
      <h2>🧾 Checkout</h2>

      {cart.length === 0 ? (
        <h4>Your cart is empty 🛒</h4>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.product_id} className="col-md-12 mb-3">
              <div className="card p-3 d-flex flex-row justify-content-between align-items-center">
                {/* PRODUCT INFO */}
                <div>
                  <h5>{item.product_name}</h5>
                  <p>KSh {item.product_cost}</p>
                </div>

                {/* QUANTITY */}
                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-sm btn-dark"
                    onClick={() => decreaseQty(item.product_id)}
                  >
                    ➖
                  </button>

                  <span style={{ fontWeight: "bold" }}>
                    {item.quantity}
                  </span>

                  <button
                    className="btn btn-sm btn-dark"
                    onClick={() => increaseQty(item.product_id)}
                  >
                    ➕
                  </button>
                </div>

                {/* TOTAL */}
                <div>
                  <strong>
                    KSh {item.product_cost * item.quantity}
                  </strong>
                </div>

                {/* REMOVE */}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeFromCart(item.product_id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* TOTAL */}
          <div className="text-end mt-4">
            <h3>Total: KSh {total.toFixed(2)}</h3>
          </div>

          {/* PHONE INPUT */}
          <div className="mt-3">
            <label className="form-label">M-Pesa Phone Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. 0712345678 or 254712345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* PAY BUTTON */}
          <button
            className="btn btn-success mt-3"
            onClick={handlePayment}
            disabled={loading || cart.length === 0}
          >
            {loading ? "Processing..." : "Pay Now (M-Pesa)"}
          </button>

          {/* FLOATING BUTTONS */}
          <FloatingButtons />
        </>
      )}
    </div>
  );
};

export default Checkout;