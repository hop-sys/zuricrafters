import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import '../css/Makepayment.css';

const Makepayment = () => {
    const location = useLocation();
    const { product } = location.state || {};
    const navigate = useNavigate();
    const img_url = "https://hope.alwaysdata.net/static/images/";

    const [number, setNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    // Handle case where product might be undefined
    if (!product) {
        return <div className="container mt-5 text-center">Product data not found. <button onClick={() => navigate('/')}>Go Back</button></div>;
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const formdata = new FormData();
            formdata.append("phone", number);
            formdata.append("amount", product.product_cost);

            const response = await axios.post("https://hope.alwaysdata.net/api/mpesa_payment", formdata);
            setLoading(false);
            setSuccess(response.data.message);

            setTimeout(() => {
                setSuccess("");
            }, 3000);

        } catch (error) {
            setLoading(false);
            setError(error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="payment-page-wrapper">
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-10 col-xl-8">
                        {/* Main Card Container */}
                        <div className="payment-card shadow-sm rounded-4 overflow-hidden border-0">
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

                                {/* Right Side: Payment Logic */}
                                <div className="col-md-6 p-4 p-lg-5 d-flex flex-column bg-white">
                                    {/* Top Navigation */}
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <button 
                                            className="btn btn-back" 
                                            onClick={() => navigate("/")}>
                                            ← Back
                                        </button>
                                        <span className="badge-best-seller">Best Seller</span>
                                    </div>

                                    {/* Product Details */}
                                    <h2 className="payment-title">{product.product_name}</h2>
                                    <h5 className="payment-subtitle">Handcrafted Artisanal Piece</h5>
                                    
                                    <p className="payment-desc my-3">
                                        {product.product_description}
                                    </p>

                                    <h3 className="payment-price mb-4">
                                        KES {Number(product.product_cost).toLocaleString()}
                                    </h3>

                                    {/* M-Pesa Form */}
                                    <form onSubmit={handlesubmit} className="mt-auto">
                                        {loading && <Loader />}
                                        
                                        {success && <div className="text-success small mb-2 fw-bold">{success}</div>}
                                        {error && <div className="text-danger small mb-2">{error}</div>}

                                        <div className="form-group mb-3">
                                            <input 
                                                type="tel"
                                                className='form-control mpesa-input'
                                                placeholder='254XXXXXXXXX'
                                                required 
                                                value={number}
                                                onChange={(e) => setNumber(e.target.value)}
                                            /> 
                                        </div>

                                        <button 
                                            type="submit" 
                                            className='btn btn-mpesa w-100 py-2'>
                                            Make Payment - KES {product.product_cost}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* Footer text from mockup */}
                        <p className="text-center mt-4 small design-tag">Designed in Nairobi, Kenya</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Makepayment;