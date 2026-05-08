import React, { useState } from 'react'
import Loader from './Loader';
import axios from 'axios';
import '../css/Addproducts.css';

const Addproducts = () => {
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_category, setProductCategory] = useState("");
  const [product_photo, setProductPhoto] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState ("");
  const [error, setError] = useState ("");

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setLoading(true)

    try{
      const formdata = new FormData()
      formdata.append("product_name", product_name);
      formdata.append("product_description", product_description);
      formdata.append("product_cost", product_cost);
      formdata.append("product_category", product_category);
      formdata.append("product_photo", product_photo);

      const response = await axios.post("https://hope.alwaysdata.net/api/add_product", formdata);

      setLoading(false);
      setSuccess(response.data.message)

      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto("");
      setProductCategory("");

      e.target.reset()

      setTimeout(() => {
        setSuccess("");
      }, 1000);
    }
    catch(error){
      setLoading(false);
      setError(error.message)
    }
  }

  return (
    <div className='row justify-content-center mt-4'>
      {/* Changed class to include 'auth-card' or generic 'card' that matches your CSS */}
      <div className='col-md-6 p-4 card shadow-none border-gold'>
        <h3 className='text-warning text-center mb-4'>Add Product</h3>

        {loading && <Loader/>}
        <h3 className='text-success'>{success}</h3>
        <h4 className="text-danger">{error}</h4>

        <form onSubmit={handleSubmit}>
          <input type="text"
            placeholder='Enter the craft name'
            className='form-control mb-3'
            required 
            value={product_name}
            onChange={(e) => setProductName(e.target.value)}/>

          <input type="text"
            placeholder='Enter the craft description'
            className='form-control mb-3'
            required 
            value={product_description}
            onChange={(e) => setProductDescription(e.target.value)}/>

          <input type="number"
            placeholder='Enter the price of the craft'
            className='form-control mb-3'
            required 
            value={product_cost}
            onChange={(e) => setProductCost(e.target.value)}/>

          <input type="text"
            placeholder='Enter the craft category'
            className='form-control mb-3'
            required 
            value={product_category}
            onChange={(e) => setProductCategory(e.target.value)}/>

          <div className="text-center">
            <label className='text-warning fw-bold mb-2'>Craft photo</label>
            <input type="file"
              className='form-control mb-4' 
              required
              accept='image/*'
              onChange={(e) => setProductPhoto (e.target.files[0])}/>
          </div>

          {/* CHANGED: Removed btn-outline-primary and added btn-primary for solid gold */}
          <input type="submit"
            value="Add Craft"
            className='btn btn-primary w-100 py-2' 
            style={{ fontWeight: 'bold' }} />
        </form>
      </div>
    </div>
  )
}

export default Addproducts;