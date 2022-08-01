import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL, token } from '../../config';
import './CreateProduct.css'

const CreateProduct = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [avatar, setAvatar] = useState('')
    const [developerEmail, setDeveloperEmail] = useState('')


    const update = (e: React.MouseEvent<HTMLInputElement>): void => {
        e.preventDefault()
        if(!name || !price || !category || !description || !avatar|| !developerEmail){
            toast.error('All field are required');
            return;
        }
        const uploadProduct = async()=> {
            const config = {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: token,
                },
              }

            const {data} = await axios.post(`${BASE_URL}/api/products`, {name, price, category, description, avatar, developerEmail}, config);
            if(data.message == "Success"){
              setTimeout(()=> navigate('/'), 2000)
              toast.success("product added successfully")
            }
            else{
              toast.warning(data.message)
            }   
        }

        uploadProduct();
  
    }
    return (
        <div style={{display:"flex", justifyContent:"center"}}>
        <form>
            <h2 style={{textAlign:"center"}}>Create Product</h2>
    
            <input type="text" value={name} onChange={(e)=> setName(e.target.value)}   placeholder="Product Name"/>
            <input type="text" value={description} onChange={(e)=> setDescription(e.target.value)}  placeholder="Description"/>
            <input type="text" value={avatar} onChange={(e)=> setAvatar(e.target.value)}  placeholder="ImageURL"/>

            <input type="text" value={category} onChange={(e)=> setCategory(e.target.value)}  placeholder="Enter Category"/>

            <input type="text"  value={price} onChange={(e)=> setPrice(e.target.value)}placeholder="Price"/>
            <input type="text" value={developerEmail} onChange={(e)=> setDeveloperEmail(e.target.value)}  placeholder="Developer Email"/>
        
            <input type="submit" onClick={(e)=>update(e)}/>
         </form>
         <ToastContainer/>
        </div>

    )
}

export default CreateProduct