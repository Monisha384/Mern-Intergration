const mongoose = require('mongoose');
const Product = require('./model/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: 'iPhone 15 Pro Max',
    price: 134900,
    description: 'Latest iPhone with titanium design and A17 Pro chip',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop'
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    price: 124999,
    description: 'Premium Android smartphone with S Pen',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop'
  },
  {
    name: 'MacBook Pro M3',
    price: 199900,
    description: '14-inch laptop with M3 Pro chip for professionals',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop'
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    price: 29990,
    description: 'Industry-leading noise canceling wireless headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
  },
  {
    name: 'Designer Evening Dress',
    price: 12999,
    description: 'Elegant black evening gown for special occasions',
    image: 'https://images.unsplash.com/photo-1566479179817-c0ae8e5b4b5e?w=400&h=400&fit=crop'
  },
  {
    name: 'Apple Watch Series 9',
    price: 41900,
    description: 'Advanced smartwatch with health monitoring',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'
  },
  {
    name: 'Giant Teddy Bear',
    price: 4999,
    description: 'Soft and cuddly 5ft teddy bear perfect for gifts',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop'
  },
  {
    name: 'Luxury Handbag',
    price: 15999,
    description: 'Premium leather handbag with gold hardware',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop'
  },
  {
    name: 'Professional Makeup Kit',
    price: 8999,
    description: 'Complete makeup collection with 50+ products',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop'
  },
  {
    name: 'Premium Gift Hamper',
    price: 6999,
    description: 'Luxury gift box with chocolates, wine and treats',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop'
  }
];

async function addProducts() {
  try {
    await mongoose.connect(process.env.DB_url);
    console.log('Connected to MongoDB');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Add new products
    const result = await Product.insertMany(sampleProducts);
    console.log(`Added ${result.length} products successfully!`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addProducts();