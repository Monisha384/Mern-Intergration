import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { API } from '../utils/api';

export default function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    useEffect(()=>{
      fetch(`${API}/api/product`)
      .then((res)=>res.json())
      .then(allproducts=>{
        const product = allproducts.find((product)=>product._id===id);
      setProduct(product);
      })
    })


  if (!product) return <p>Product not found</p>;
  return (
    <div>
        <img src={product.image} width="250" />
        <p>{product.name}</p>
        <p>{product.description}</p>
       <p> {product.price}</p>
       <Link to={`/buynow/${product._id}`}>
        <button>Buy Now</button>
      </Link>
      </div>
  )
}
