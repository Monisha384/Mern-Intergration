const productModel = require("../model/Product");

exports.getProduct = async (req, res) => {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({  error:'server error' })
  }
};

exports.postProduct=async(req,res) => {
    const {name,price,description,image}=req.body
    try {
        const newProduct=new productModel({name,price,description,image});
        await newProduct.save();
        res.status(201).json(newProduct)
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'server error'})
        
    }
}
exports.deleteProduct=async(req,res)=>{
    const id=req.params.id;
    
      const deleted=await productModel.findByIdAndDelete(id);
      if(!deleted){
        return res.status(404).json({message:'Product not found'})
      }
      
   
      res.status(204).json({message:'server error'})
    }
exports.updateProduct=async(req,res)=>{
  const id=req.params.id;
  const {name,price,description,image}=req.body;
  const updated=await productModel.findByIdAndUpdate(id,{name,price,description,image},{new:true});
  if(!updated){
    return res.status(404).json({message:'Product not found'})
  }
  res.status(200).json(updated)
}