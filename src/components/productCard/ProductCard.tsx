import React from "react";
import { Link } from "react-router-dom";
import './productCard.css'


const ProductCard = ({product} :any) => {
    return(
        <div className='product-card'>
            <div className='product-img'>
            <Link to={`/product/${product._id}`}>
                <img alt={product.name} src={product.avatar}/>
            </Link>
            </div>
            
            <div className='product-title'>
                {product.name}
            </div>
            <div className='product-price'>
                {`${product.price}`}
            </div>
        </div>
    )
}

export default ProductCard