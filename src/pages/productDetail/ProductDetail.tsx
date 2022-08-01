import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loader from "../../components/Loader/Loader"
import { BASE_URL, token } from "../../config"
import { ProductType } from "../homepage/Homepage"

import './ProductDetail.css'
const ProductDetail = () => {
    const id = useParams().id
    const [product, setProduct] = useState({} as ProductType) 
    const [isLoading, setLoading] = useState(false)

    useEffect(()=> {
        const fetchData = async() => {
            setLoading(true)

            const config = {
              headers: {
                'Content-Type': 'application/json',
                Authorization: token,
              },
            }
            const {data} = await axios.get(`${BASE_URL}/api/products/${id}`, config);
            if(data){
                setLoading(false)
                setProduct(data.product)
            }
          }
          fetchData()
    }, [])
    return (
        <>
            {
                isLoading ? <Loader/> : 
                <div className="details-container">
                <div className="details-upper-container">
                <div>
                    <img alt={product.name} src={product.avatar}/>
                </div>

                <div className="details-name-price">
                    {/* namr and price */}
                    <div className="details-name">
                     <strong>{product.name}</strong>
                    </div>
                    <div className="details-name">
                     <strong>${`${product.price}`}</strong>
                    </div>
                </div>
            </div>
            <hr className="hr"/>

            <div>
                <h2>Description</h2>
                {product.description}
            </div>
            </div>
            }
            
        </>
    )
}

export default ProductDetail