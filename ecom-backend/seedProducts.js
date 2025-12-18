const mongoose = require('mongoose');
const Product = require('./model/Product');
require('dotenv').config();

const products = [
  // Electronics
  { name: 'iPhone 15 Pro', price: 129999, description: 'Latest iPhone with A17 Pro chip', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop' },
  { name: 'Samsung Galaxy S24', price: 89999, description: 'Premium Android smartphone', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop' },
  { name: 'MacBook Air M3', price: 114900, description: '13-inch laptop with M3 chip', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop' },
  { name: 'Sony WH-1000XM5', price: 29990, description: 'Noise cancelling headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop' },
  
  // Fashion - Dresses
  { name: 'Floral Summer Dress', price: 2499, description: 'Beautiful floral print dress', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop' },
  { name: 'Evening Gown', price: 8999, description: 'Elegant evening wear', image: 'https://images.unsplash.com/photo-1566479179817-c0ae8e5b4b5e?w=400&h=400&fit=crop' },
  { name: 'Casual Midi Dress', price: 1899, description: 'Comfortable daily wear', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop' },
  
  // Watches
  { name: 'Apple Watch Series 9', price: 41900, description: 'Smart fitness tracker', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
  { name: 'Rolex Submariner', price: 899999, description: 'Luxury diving watch', image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&h=400&fit=crop' },
  { name: 'Casio G-Shock', price: 12999, description: 'Rugged sports watch', image: 'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=400&h=400&fit=crop' },
  
  // Toys - Teddy Bears
  { name: 'Giant Teddy Bear', price: 3999, description: 'Soft and cuddly 4ft teddy', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop' },
  { name: 'Baby Teddy Bear', price: 899, description: 'Perfect for kids', image: 'https://images.unsplash.com/photo-1530325553146-05cee2b50b7e?w=400&h=400&fit=crop' },
  
  // Accessories
  { name: 'Leather Handbag', price: 4999, description: 'Premium leather bag', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop' },
  { name: 'Designer Sunglasses', price: 15999, description: 'UV protection eyewear', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop' },
  { name: 'Gold Necklace', price: 25999, description: '18k gold jewelry', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop' },
  
  // Makeup & Beauty
  { name: 'Makeup Kit Pro', price: 3499, description: 'Complete makeup collection', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop' },
  { name: 'Lipstick Set', price: 1299, description: '12 vibrant shades', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop' },
  { name: 'Skincare Bundle', price: 2799, description: 'Complete skincare routine', image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&h=400&fit=crop' },
  
  // Gifts
  { name: 'Gift Hamper Deluxe', price: 4999, description: 'Premium gift collection', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop' },
  { name: 'Chocolate Box', price: 1499, description: 'Assorted premium chocolates', image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=400&fit=crop' },
  { name: 'Flower Bouquet', price: 899, description: 'Fresh roses arrangement', image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400&h=400&fit=crop' }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.DB_url);
    console.log('Connected to MongoDB');
    
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    await Product.insertMany(products);
    console.log('Added sample products');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedDatabase();