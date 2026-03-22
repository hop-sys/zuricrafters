import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import '../css/Makepayment.css';

const Makepayment = () => {
    const { product } = useLocation().state || {};
    const navigate = useNavigate();
    const img_url = "https://hope.alwaysdata.net/static/images/"

    const [number, setNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handlesubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formdata = new FormData();
            formdata.append("phone", number);
            formdata.append("amount", product.product_cost);

            const response = await axios.post("https://hope.alwaysdata.net/api/mpesa_payment", formdata)
            setLoading(false);
            setSuccess(response.data.message);

            setTimeout(() => {
            setSuccess("");
            }, 1000);

        } catch (error) {
            setLoading(false)
            setError(error.message)
        }
    }

    return (
        <div className="container mt-3">
            <div className='row justify-content-center'>
                <div className="col-md-5 card shadow p-3">
                    
                    {/* Header Row: Back Button and Title inside the card */}
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <button 
                            className="btn btn-warning btn-sm" 
                            onClick={() => navigate("/")}
                            style={{ padding: '4px 10px', fontSize: '12px', border: '1px solid #7b4b2a' }}>
                            ← Back
                        </button>
                        <h2 className="text-success m-0" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                            Lipa na MPESA
                        </h2>
                    </div>

                    {/* Product Image */}
                    <img src={img_url + product.product_photo} alt="product" className='product_img' />

                    <div className="card-body p-1">
                        <h2 className="text-info mt-1" style={{ fontSize: '1.1rem' }}> {product.product_name}</h2>
                        
                        <p className="text-dark mb-1" style={{ fontSize: '14px', lineHeight: '1.4' }}> 
                            {product.product_description}
                        </p>

                        <b className="text-warning d-block mb-2"> KES {product.product_cost}</b>

                        <form onSubmit={handlesubmit}>
                            {loading && <Loader />}
                            
                            {/* Status Messages */}
                            {success && <div className="text-success small mb-1">{success}</div>}
                            {error && <div className="text-danger small mb-1">{error}</div>}

                            <input 
                                type="tel"
                                className='form-control mb-2'
                                placeholder='254XXXXXXXXX'
                                required 
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                            /> 

                            <input 
                                type="submit"
                                value="Make Payment"
                                className='btn btn-success w-100' 
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Makepayment;