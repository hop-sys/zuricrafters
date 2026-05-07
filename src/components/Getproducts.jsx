import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import "../css/Getproducts.css";
import Mycarousel from "./Mycarousel";
import Aboutus from "./Aboutus";
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

      const response = await axios.get(
        "https://hope.alwaysdata.net/api/get_products"
      );

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

  // ADD TO CART
  const addToCart = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/signup");
      return;
    }

    const cartKey = `cart_${user.email}`;

    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const productId = product.product_id || product.id;

    const existingItem = cart.find(
      (item) => item.product_id === productId
    );

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

  // FILTER PRODUCTS BASED ON SEARCH QUERY
  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="row">
      <FloatingButtons />
      <Mycarousel />
      <SearchBar onSearch={setSearch} />

      {loading && <Loader />}
      <h4 className="text-danger">{error}</h4>

      {filteredProducts.map((product) => {
        const productId = product.product_id || product.id;

        return (
          <div
            key={productId}
            className="col-md-3 justify-content-center mb-3"
          >
            <div className="card">
              <img
                src={img_url + product.product_photo}
                className="product_img mt-3"
                alt={product.product_name}
              />

              <div className="card-body">
                <h5 className="card-title">
                  {product.product_name}
                </h5>

                <p className="card-text">
                  {product.product_description.slice(0, 100)}...
                </p>

                <h4 className="price">
                  Ksh {product.product_cost}
                </h4>

                <button
                  className="btn btn-outline-warning ms-2"
                  onClick={() => addToCart(product)}
                >
                  <i className="bi bi-cart"></i> Add to Cart
                </button>

                <button
                  className="btn btn-buy"
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
        );
      })}
    </div>
  );
};

export default Getproducts;