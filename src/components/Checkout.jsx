import React, { useEffect, useState } from "react";
import "../css/Checkout.css";
import FloatingButtons from "./FloatingButtons";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const cartKey = user ? `cart_${user.email}` : null;

  // Colors
  const zuriBrown = "#5C3D2E";
  const zuriGold = "#FFB74D";
  const zuriMuted = "#A68A7C";

  // INITIAL LOAD
  useEffect(() => {
    if (!user) {
      window.location.href = "/signup";
      return;
    }
    const savedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCart(savedCart);
  }, [user, cartKey]);

  // HELPER: SYNC STATE & STORAGE
  const updateCartPersistently = (updatedCart) => {
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    setCart(updatedCart);
    window.dispatchEvent(new Event("storage"));
  };

  // HELPER: FULL CLEAR
  const clearCartAndNotify = () => {
    localStorage.removeItem(cartKey);
    setCart([]);
    window.dispatchEvent(new Event("storage"));
  };

  // CART ACTIONS
  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item.product_id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCartPersistently(updated);
  };

  const decreaseQty = (id) => {
    let updated = cart
      .map((item) =>
        item.product_id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    updateCartPersistently(updated);
  };

  const removeFromCart = (id) => {
    const updated = cart.filter((item) => item.product_id !== id);
    updateCartPersistently(updated);
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.product_cost) * item.quantity,
    0
  );

  // MPESA PAYMENT LOGIC
  const handlePayment = async () => {
    if (!phone) {
      setStatusMessage("Please enter your M-Pesa number");
      return;
    }

    try {
      setLoading(true);
      setStatusMessage("Connecting to M-Pesa...");

      const formData = new FormData();
      formData.append("phone", phone);
      formData.append("amount", total);

      const response = await fetch("https://hope.alwaysdata.net/api/mpesa_payment", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage(data.message || "Request sent! Check your phone.");
        clearCartAndNotify();
        setPhone("");
      } else {
        setStatusMessage(data.message || "Payment request failed.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setStatusMessage("Connection error. Please try again.");
    } finally {
      setLoading(false);
      setTimeout(() => setStatusMessage(""), 6000);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🧾 Checkout</h2>

      {cart.length === 0 ? (
        <div className="text-center py-5">
          <h4>Your cart is empty 🛒</h4>
          <button 
            className="btn btn-outline-dark mt-3" 
            onClick={() => window.location.href = '/'}
            style={{ borderColor: zuriBrown, color: zuriBrown }}
          >
            Back to Shop
          </button>
        </div>
      ) : (
        <>
          <div className="row">
            {cart.map((item) => (
              <div key={item.product_id} className="col-12 mb-3">
                <div className="card p-3 shadow-sm d-flex flex-row justify-content-between align-items-center" 
                     style={{ borderColor: zuriBrown, backgroundColor: "transparent" }}>
                  <div>
                    <h5 className="mb-1" style={{ color: zuriBrown }}>{item.product_name}</h5>
                    <p className="text-muted mb-0">KSh {Number(item.product_cost).toLocaleString()}</p>
                  </div>

                  <div className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center border rounded" style={{ borderColor: zuriBrown }}>
                      <button className="btn btn-sm px-3" onClick={() => decreaseQty(item.product_id)}>➖</button>
                      <span className="fw-bold px-2">{item.quantity}</span>
                      <button className="btn btn-sm px-3" onClick={() => increaseQty(item.product_id)}>➕</button>
                    </div>

                    <div className="text-end" style={{ minWidth: "100px" }}>
                      <strong className="d-block" style={{ color: zuriBrown }}>
                        KSh {(item.product_cost * item.quantity).toLocaleString()}
                      </strong>
                    </div>

                    <button
                      className="btn btn-sm"
                      onClick={() => removeFromCart(item.product_id)}
                      style={{
                        backgroundColor: zuriBrown,
                        color: zuriGold,
                        fontWeight: "bold",
                        transition: "0.3s"
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = zuriGold;
                        e.target.style.color = zuriBrown;
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = zuriBrown;
                        e.target.style.color = zuriGold;
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-end mt-4">
            <h3 className="fw-bold">Total: KSh {total.toLocaleString()}</h3>
          </div>

          {/* PAYMENT BOX - DARK MODE FIXED */}
          <div className="mt-4 p-4 border rounded shadow-sm" 
               style={{ 
                 backgroundColor: "rgba(92, 61, 46, 0.05)", // Very light brown tint
                 borderColor: zuriBrown 
               }}>
            <label className="form-label fw-bold" style={{ color: zuriBrown }}>M-Pesa Phone Number</label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="e.g. 2547XXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ borderColor: zuriBrown, backgroundColor: "transparent", color: "inherit" }}
            />
            
            {statusMessage && (
              <div className="alert mt-3" style={{ 
                backgroundColor: zuriGold, 
                color: zuriBrown, 
                border: `1px solid ${zuriBrown}`,
                fontWeight: "bold",
                textAlign: "center"
              }}>
                {statusMessage}
              </div>
            )}

            <button
              className="btn mt-3 w-100 py-3 fw-bold"
              onClick={handlePayment}
              disabled={loading || cart.length === 0}
              style={{
                backgroundColor: loading || cart.length === 0 ? zuriMuted : zuriBrown,
                color: zuriGold,
                border: `2px solid ${zuriBrown}`,
                transition: "all 0.3s ease",
                cursor: loading || cart.length === 0 ? "not-allowed" : "pointer"
              }}
              onMouseOver={(e) => {
                if (!loading && cart.length > 0) {
                  e.target.style.backgroundColor = zuriGold;
                  e.target.style.color = zuriBrown;
                }
              }}
              onMouseOut={(e) => {
                if (!loading && cart.length > 0) {
                  e.target.style.backgroundColor = zuriBrown;
                  e.target.style.color = zuriGold;
                }
              }}
            >
              {loading ? "Processing..." : `Pay KSh ${total.toLocaleString()}`}
            </button>
          </div>

          <FloatingButtons />
        </>
      )}
    </div>
  );
};

export default Checkout;