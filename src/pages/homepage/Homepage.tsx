import React, { useEffect, useState } from 'react'

import axios from 'axios';
import './homepage.css';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../../components/productCard/ProductCard';
import Loader from '../../components/Loader/Loader';
import { BASE_URL, token } from '../../config';


export type ProductType = {
    createdAt : Number;
    name: string;
    avatar : string;
    developerEmail : string;
    price : Number;
    description : string;
    _id: Number;
    category: string;
}

export type category = {
  category : String
}

type categories = {
  name: string,
  _id : number
}

const Homepage = () => {

  const [productsList, setProductList] = useState([] as ProductType[]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('')
  const [isLoading, setLoading] = useState(false)

  const Navigate = useNavigate()


  useEffect(()=> {
    
    setLoading(true)
    const fetchData = async() => {

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
      }
      const {data} = await axios.get(`${BASE_URL}/api/products`, config);
      const categoryResult = await axios.get(`${BASE_URL}/api/categories`, config);
      setLoading(false)
      setCategories(categoryResult.data.categories)
     
      setProductList(data.products)
    }
    fetchData()
  }, []);
   
    const handleCategory = (e:React.ChangeEvent<HTMLSelectElement>) => {
    
      let value = e.currentTarget.value
      console.log(value)
      
      setCurrentCategory(value)

      const fetchData = async() => {
        setLoading(true)

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
        const {data} = await axios.get(`${BASE_URL}/api/products`, config);
          const newArr = data.products.filter((item : ProductType) => item.category == value)
          
          setLoading(false)
          setProductList((prod) => [...newArr])
      }
      fetchData()
    }



  return (
    <>
    <div className='select-container'>
      
    <select value={currentCategory} onChange={(e)=>handleCategory(e)}>
                <option >Select Category</option>
                {
                  categories.map((item : categories) => <option value={item.name} key={item._id}>{item.name}</option>)
                }   
              </select>
    </div>
    <div className='product-list-container' >
        {
          isLoading ? <Loader/> : productsList && productsList.map((product)=> (
            <ProductCard key={product._id} product={product}/>
          )) 
        }

       
    </div>
    <button onClick={()=> Navigate('/create') } style={{backgroundColor:"black",outline:"none", color:"white", padding: "10px 15px", borderRadius: "50%", fontSize:"25px", position:"fixed", right:"5%", bottom:"5%"}}>+</button>

    </>
  )
}

export default Homepage