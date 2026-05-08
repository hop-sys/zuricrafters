import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import '../css/Makepayment.css';

const Makepayment = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { product, total = 0 } = location.state || {};
    const img_url = "https://hope.alwaysdata.net/static/images/";

    const [number, setNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    // Brand Colors for inline consistency if needed
    const zuriBrown = "#5C3D2E";
    const zuriGold = "#FFB74D";

    if (!product) {
        return (
            <div className="container mt-5 text-center py-5">
                <h4 style={{ color: zuriBrown }}>Product data not found.</h4>
                <button 
                    className="btn mt-3" 
                    style={{ backgroundColor: zuriBrown, color: zuriGold }}
                    onClick={() => navigate('/')}
                >
                    Go Back to Shop
                </button>
            </div>
        );
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const formdata = new FormData();
            formdata.append("phone", number);
            formdata.append("amount", total || product.product_cost);

            const response = await axios.post("https://hope.alwaysdata.net/api/mpesa_payment", formdata);
            setLoading(false);
            setSuccess(response.data.message);

            setTimeout(() => setSuccess(""), 5000);
        } catch (error) {
            setLoading(false);
            setError(error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="payment-page-wrapper">
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-10 col-xl-9">
                        <div className="payment-card shadow-lg rounded-4 overflow-hidden">
                            <div className="row g-0">
                                
                                {/* Left Side: Product Image */}
                                <div className="col-md-6">
                                    <div className="payment-image-container">
                                        <img 
                                            src={img_url + product.product_photo} 
                                            alt={product.product_name} 
                                            className="payment-product-img" 
                                        />
                                    </div>
                                </div>

                                {/* Right Side: Payment Logic (Transparent for Dark Mode) */}
                                <div className="col-md-6 p-4 p-lg-5 d-flex flex-column payment-form-section">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <button 
                                            className="btn btn-zuri-outline" 
                                            onClick={() => navigate("/")}>
                                            ← Back
                                        </button>
                                        <span className="badge-zuri">Artisanal Heritage</span>
                                    </div>

                                    <h2 className="payment-title">{product.product_name}</h2>
                                    <h5 className="payment-subtitle">Authentic Kenyan Craft</h5>
                                    
                                    <p className="payment-desc my-3">
                                        {product.product_description}
                                    </p>

                                    <div className="price-tag-container mb-4">
                                        <span className="price-label">Total Amount</span>
                                        <h3 className="payment-price">
                                            KES {Number(total || product.product_cost).toLocaleString()}
                                        </h3>
                                    </div>

                                    <form onSubmit={handlesubmit} className="mt-auto">
                                        {loading && <Loader />}
                                        
                                        {success && <div className="alert alert-zuri-success">{success}</div>}
                                        {error && <div className="alert alert-zuri-error">{error}</div>}

                                        <div className="form-group mb-3">
                                            <label className="small fw-bold mb-1" style={{ color: zuriBrown }}>
                                                M-Pesa Number
                                            </label>
                                            <input 
                                                type="tel"
                                                className='form-control mpesa-input'
                                                placeholder='2547XXXXXXXX'
                                                required 
                                                value={number}
                                                onChange={(e) => setNumber(e.target.value)}
                                            /> 
                                        </div>

                                        <button 
                                            type="submit" 
                                            disabled={loading}
                                            className='btn btn-zuri-primary w-100 py-3'>
                                            {loading ? "Processing..." : "Complete Payment"}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Makepayment;