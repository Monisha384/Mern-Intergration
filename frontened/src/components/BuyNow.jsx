import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../utils/api"; 

export default function BuyNow() {
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
      <h2>Buy Now</h2>
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <p>✅ Order has been placed</p>
    </div>
  );
}
