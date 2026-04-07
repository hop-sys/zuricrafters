import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Product.css';

const Products = () => {
    const navigate = useNavigate();
    const img_url = "https://hope.alwaysdata.net/static/images/";

    const productList = [
        {
            
           id: 3,
           product_name: "The Shadow Strand",
           product_subtitle: "Matte Stone & Polished Wood",
           product_description: "A bold, unisex strand featuring matte black onyx-style beads punctuated by warm wood accents and industrial steel spacers.",
           product_cost: "650", // Suggested price in KSh
           product_photo: "necklace2.jpg",
           badge: "Unisex"

        },
        {
            id: 2,
            product_name: "Turkana Turquoise",
            product_subtitle: "Coconut & Heishi",
            product_description: "Inspired by the vibrant culture of the Turkana people, this strand combines natural coconut beads with turquoise heishi accents for a bold, earthy look.",
            product_cost: "700",
            product_photo: "necklace1.jpg",
            badge: "Everyday"
        }
    ];

    return (
        <section className="products-card-section py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h6 className="brand-gold text-uppercase ls-3">The Collection</h6>
                    <h2 className="brand-brown display-5 fw-bold">Artisan Jewelry</h2>
                </div>

                <div className="row g-4 row-cols-1 row-cols-lg-2">
                    {productList.map((item) => (
                        <div key={item.id} className="col">
                            <div className="zuri-horizontal-card">
                                <div className="row g-0 h-100">
                                    {/* Left Side: Image */}
                                    <div className="col-5">
                                        <div className="card-img-container">
                                            <img 
                                                src={img_url + item.product_photo} 
                                                alt={item.product_name} 
                                                className="card-img-side" 
                                            />
                                        </div>
                                    </div>
                                    
                                    {/* Right Side: Info */}
                                    <div className="col-7 d-flex align-items-center">
                                        <div className="card-body-side p-3 p-xl-4">
                                            <span className="small-badge mb-2">{item.badge}</span>
                                            <h3 className="card-title-text">{item.product_name}</h3>
                                            <p className="card-price-text mb-3">KSh {item.product_cost}</p>
                                            
                                            <button 
                                                className="btn btn-zuri-card w-100"
                                                onClick={() => navigate('/makepayment', { state: { product: item } })}
                                            >
                                                Purchase
                                            </button>
                                            {/* <button className="btn btn-buy"  */}
                                            {/* onClick={() => navigate("/makepayment", {state: {product}})}>Purchase Now</button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Products;