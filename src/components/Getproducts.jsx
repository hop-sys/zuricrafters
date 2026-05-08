import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import "../css/Getproducts.css";
import Mycarousel from "./Mycarousel";
import SearchBar from "./SearchBar";
import FloatingButtons from "./FloatingButtons";

const Getproducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const img_url = "https://hope.alwaysdata.net/static/images/";

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://hope.alwaysdata.net/api/get_products");
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ADD TO CART LOGIC
  const addToCart = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/signup");
      return;
    }

    const cartKey = `cart_${user.email}`;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const productId = product.product_id || product.id;

    const existingItem = cart.find((item) => item.product_id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...product,
        product_id: productId,
        quantity: 1,
      });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  };

  // FILTER PRODUCTS
  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid px-4">
      <FloatingButtons />
      <Mycarousel />
      <SearchBar onSearch={setSearch} />

      {loading && <Loader />}
      {error && <h4 className="text-danger text-center mt-3">{error}</h4>}

      <div className="row mt-4">
        {filteredProducts.map((product) => {
          const productId = product.product_id || product.id;

          return (
            <div key={productId} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex mb-4">
              {/* .d-flex on the column and .flex-column on the card makes them equal height */}
              <div className="card w-100 shadow-sm border-gold d-flex flex-column">
                <div className="p-3 text-center">
                  <img
                    src={img_url + product.product_photo}
                    className="product_img img-fluid"
                    alt={product.product_name}
                    style={{ maxHeight: "180px", objectFit: "contain" }}
                  />
                </div>

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-warning fw-bold">
                    {product.product_name}
                  </h5>

                  <p className="card-text text-secondary small">
                    {product.product_description.length > 80
                      ? product.product_description.slice(0, 80) + "..."
                      : product.product_description}
                  </p>

                  <h4 className="price mt-2 mb-3">
                    Ksh {Number(product.product_cost).toLocaleString()}
                  </h4>

                  {/* mt-auto pushes this entire div to the bottom of the card */}
                  <div className="mt-auto d-flex flex-column gap-2">
                    <button
                      className="btn btn-outline-warning w-100 d-flex align-items-center justify-content-center"
                      onClick={() => addToCart(product)}
                    >
                      <i className="bi bi-cart me-2"></i> Add to Cart
                    </button>

                    <button
                      className="btn btn-buy w-100 fw-bold"
                      onClick={() =>
                        navigate("/makepayment", {
                          state: { product },
                        })
                      }
                    >
                      Purchase Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Getproducts;