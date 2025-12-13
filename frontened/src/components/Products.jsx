import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import {API} from "../utils/api"


export default function Products({setCart,cart}) {
const [products, setProducts] = useState([])
  useEffect(()=>{
    fetch(`${API}/api/product`)
    .then((res)=>res.json())
    .then((data)=>setProducts(data))
  })
 const addToCart = (item) => {
    setCart([...cart, item]);
  };
 const deleteProduct= async(id)=>{
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if(!confirmDelete) return;
    const res = await fetch(`${API}/api/deleteProduct/${id}`,{
      method:"DELETE",
    });
    if(res.status===204){
    alert("Product deleted successfully");
    setProducts(products.filter((p)=>p._id!==id));
    } else {
      alert("Failed to delete product");
    }
  };

  return (
    <div>
        <h2>All Products</h2>
        {products.map(p => (
          <div key={p._id} >
            <img src={p.image} alt={p.name} width="150" />
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
             <Link to={`/product/${p._id}`}>View</Link> 
           <button onClick={() => addToCart(p)}>Add to Cart</button>
           <button onClick={()=> deleteProduct(p._id)}> Delete </button>
          </div>
        ))}
    </div>
  )
}
