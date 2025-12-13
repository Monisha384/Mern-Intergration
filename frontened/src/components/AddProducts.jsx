
import { useState } from 'react'



export default function AddProducts() {
    
    const [name,SetName]=useState("");
    const [description,SetDescription]=useState("");
    const [price,SetPrice]=useState(0);
    const [image,SetImage]=useState("");

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const res = await fetch(`${API}/api/postProduct`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({name,description,price,image}),
            });
         
    
    if(res.ok){
        alert("Product added successfully");
                SetName("");
                SetDescription("");
                SetPrice("");
                SetImage(0);
    }
       
}
catch(error){
    console.error(error);
}
    }
  return (
    <div><form onClick={handleSubmit}>
        <input type="text" name='name' placeholder='PRODUCT NAME' value={name} onChange={(e)=>{SetName(e.target.value)}}/><br />
        <input type="text" name='description' placeholder='PRODUCT DESCRIPTION' value={description} onChange={(e)=>{SetDescription(e.target.value)}} /><br />
        <input type="text" name='price' placeholder='PRODUCT PRICE' value={price} onChange={(e)=>{SetPrice(e.target.value)}}/><br />
        <input type="text" name='image' placeholder='IMAGE URL' value={image} onChange={(e)=>{SetImage(e.target.value)}}/><br />
        <button type="submit">Add Products</button>

        
        
        </form></div>
  ) 
}
