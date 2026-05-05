import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Checkout.css';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const removeFromCart = (productId) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return;

  const cartKey = `cart_${user.email}`;

  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  // remove item
  cart = cart.filter(item => item.id !== productId);

  localStorage.setItem(cartKey, JSON.stringify(cart));
};

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    // 🔒 block non-logged users
    if (!user) {
      navigate("/signup");
      return;
    }

    const cartKey = `cart_${user.email}`;
    const savedCart = JSON.parse(localStorage.getItem(cartKey)) || [];

    setCart(savedCart);
  }, [navigate]);

  // 💰 calculate total
  const total = cart.reduce((sum, item) => {
    return sum + Number(item.product_cost) * (item.quantity || 1);
  }, 0);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🧾 Checkout Summary</h2>

      {cart.length === 0 ? (
        <h4>Your cart is empty 🛒</h4>
      ) : (
        <>
          <div className="row">
            {cart.map((item, index) => (
              <div key={index} className="col-md-12 mb-3">
                <div className="card p-3 d-flex flex-row justify-content-between align-items-center">

                  <div>
                    <h5>{item.product_name}</h5>
                    <p>KSh {item.product_cost}</p>
                    <small>Qty: {item.quantity || 1}</small>
                  </div>

                  <div>
                    <strong>
                      KSh {(item.product_cost * (item.quantity || 1))}
                    </strong>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div className="text-end mt-4">
            <h3>Total: KSh {total}</h3>

            <button
  className="btn btn-warning mt-3"
  onClick={() =>
    navigate("/makepayment", {
      state: { product: cart, total }
    })
  }
>
  Proceed to Payment
</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;