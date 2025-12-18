import { useState, useEffect } from 'react';
import { API } from './utils/api';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = ['All', 'Electronics', 'Fashion', 'Watches', 'Toys', 'Accessories', 'Beauty', 'Gifts'];

  const fallbackProducts = [
    {
      _id: '1',
      name: 'iPhone 15 Pro Max',
      price: 134900,
      description: 'Electronics - Latest iPhone with titanium design and A17 Pro chip',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop'
    },
    {
      _id: '2',
      name: 'Samsung Galaxy S24 Ultra',
      price: 124999,
      description: 'Electronics - Premium Android smartphone with S Pen',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop'
    },
    {
      _id: '3',
      name: 'MacBook Pro M3',
      price: 199900,
      description: 'Electronics - 14-inch laptop with M3 Pro chip for professionals',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop'
    },
    {
      _id: '4',
      name: 'Sony WH-1000XM5 Headphones',
      price: 29990,
      description: 'Electronics - Industry-leading noise canceling wireless headphones',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
    },
    {
      _id: '5',
      name: 'Designer Evening Gown',
      price: 12999,
      description: 'Fashion - Elegant black evening gown for special occasions',
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop'
    },
    {
      _id: '6',
      name: 'Apple Watch Series 9',
      price: 41900,
      description: 'Watches - Advanced smartwatch with health monitoring',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'
    },
    {
      _id: '7',
      name: 'Baby Teddy Bear',
      price: 1999,
      description: 'Toys - Adorable small teddy bear perfect for babies and kids',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Is6crRG4HM1vUE9hHacn75cizr32o9viEA&s'
    },
    {
      _id: '8',
      name: 'Luxury Handbag',
      price: 15999,
      description: 'Accessories - Premium leather handbag with gold hardware',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop'
    },
    {
      _id: '9',
      name: 'Professional Makeup Kit',
      price: 8999,
      description: 'Beauty - Complete makeup collection with 50+ products',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop'
    },
    {
      _id: '10',
      name: 'Skincare Bundle',
      price: 4999,
      description: 'Gifts - Complete skincare routine with cleanser, toner and moisturizer',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZZ_jaXXOlraSbO_3ui3hD2vxE8Y6rmZYyBw&s'
    }
  ];

  useEffect(() => {
    console.log('Setting fallback products:', fallbackProducts.length);
    setProducts(fallbackProducts);
    setLoading(false);
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API}/api/product`);
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setProducts(data);
        }
      }
    } catch (error) {
      console.log('Backend not available, using fallback products');
    }
  };

  const addToCart = (product) => {
    if (!user) {
      setCurrentPage('login');
      return;
    }
    setCart([...cart, product]);
    alert('Product added to cart!');
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item._id !== productId));
  };

  const login = (userData) => {
    setUser(userData);
    setCurrentPage('home');
  };

  const logout = () => {
    setUser(null);
    setCart([]);
  };

  const addProduct = async (newProduct) => {
    const product = {
      _id: Date.now().toString(),
      name: newProduct.name,
      price: parseInt(newProduct.price),
      description: newProduct.description,
      image: newProduct.image
    };
    setProducts([...products, product]);
    setCurrentPage('home');
    alert('Product added successfully!');
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || 
      product.description?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      product.name?.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const HomePage = () => (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 2rem',
        borderRadius: '1rem',
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h1 style={{fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1rem'}}>
          🏪 EliteMart Professional
        </h1>
        <p style={{fontSize: '1.3rem', opacity: 0.9, marginBottom: '2rem'}}>
          Discover Premium Products at Unbeatable Prices
        </p>
        <div style={{display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap'}}>
          <span style={{background: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '2rem'}}>
            ✨ Premium Quality
          </span>
          <span style={{background: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '2rem'}}>
            🚚 Free Delivery
          </span>
          <span style={{background: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '2rem'}}>
            💯 Authentic Products
          </span>
        </div>
      </div>

      <div style={{marginBottom: '2rem'}}>
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '1rem 1.5rem',
            fontSize: '1.1rem',
            border: '2px solid #e2e8f0',
            borderRadius: '2rem',
            outline: 'none',
            marginBottom: '1.5rem'
          }}
        />
        
        <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center'}}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '0.75rem 1.5rem',
                border: 'none',
                borderRadius: '2rem',
                backgroundColor: selectedCategory === category ? '#3b82f6' : '#f1f5f9',
                color: selectedCategory === category ? 'white' : '#64748b',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{textAlign: 'center', padding: '4rem'}}>
          <div style={{fontSize: '2rem', marginBottom: '1rem'}}>⏳</div>
          <p style={{fontSize: '1.2rem', color: '#64748b'}}>Loading amazing products...</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', // Changed to auto-fill
          gap: '2rem'
        }}>
          {filteredProducts.map(product => (
            <div key={product._id} style={{
              backgroundColor: 'white',
              borderRadius: '1.5rem',
              padding: '1.5rem',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              border: '1px solid #f1f5f9'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px -5px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
            }}
            >
              <div style={{position: 'relative', marginBottom: '1rem'}}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                    borderRadius: '1rem'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '2rem',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  ⭐ Premium
                </div>
              </div>
              
              <h3 style={{
                fontSize: '1.3rem', 
                fontWeight: 'bold', 
                marginBottom: '0.5rem',
                color: '#1e293b'
              }}>
                {product.name}
              </h3>
              
              <p style={{
                color: '#64748b', 
                marginBottom: '1rem',
                fontSize: '0.95rem',
                lineHeight: '1.5'
              }}>
                {product.description}
              </p>
              
              <div style={{
                marginTop: '1.5rem'
              }}>
                <div style={{marginBottom: '1rem'}}>
                  <span style={{
                    fontSize: '1.8rem', 
                    fontWeight: 'bold', 
                    color: '#059669'
                  }}>
                    ₹{product.price?.toLocaleString()}
                  </span>
                  <div style={{fontSize: '0.8rem', color: '#64748b'}}>
                    Free Delivery
                  </div>
                </div>
                
                <div style={{
                  display: 'flex', 
                  gap: '0.75rem',
                  width: '100%'
                }}>
                  <button
                    onClick={() => addToCart(product)}
                    style={{
                      flex: 1,
                      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                      color: 'white',
                      padding: '0.875rem 1rem',
                      border: 'none',
                      borderRadius: '0.75rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      textAlign: 'center'
                    }}
                  >
                    🛒 Add to Cart
                  </button>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    style={{
                      flex: 1,
                      background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                      color: 'white',
                      padding: '0.875rem 1rem',
                      border: 'none',
                      borderRadius: '0.75rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      textAlign: 'center'
                    }}
                  >
                    👁️ View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {selectedProduct && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '1.5rem',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80%',
            overflow: 'auto'
          }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
              <h2 style={{fontSize: '1.8rem', fontWeight: 'bold'}}>{selectedProduct.name}</h2>
              <button
                onClick={() => setSelectedProduct(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>
            
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              style={{
                width: '100%',
                height: '300px',
                objectFit: 'cover',
                borderRadius: '1rem',
                marginBottom: '1.5rem'
              }}
            />
            
            <div style={{marginBottom: '1.5rem'}}>
              <h3 style={{fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>Description</h3>
              <p style={{color: '#64748b', lineHeight: '1.6'}}>{selectedProduct.description}</p>
            </div>
            
            <div style={{marginBottom: '1.5rem'}}>
              <h3 style={{fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>Price</h3>
              <span style={{fontSize: '2rem', fontWeight: 'bold', color: '#059669'}}>
                ₹{selectedProduct.price?.toLocaleString()}
              </span>
            </div>
            
            <div style={{display: 'flex', gap: '1rem'}}>
              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  color: 'white',
                  padding: '1rem',
                  border: 'none',
                  borderRadius: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                🛒 Add to Cart
              </button>
              <button
                onClick={() => setSelectedProduct(null)}
                style={{
                  flex: 1,
                  backgroundColor: '#6b7280',
                  color: 'white',
                  padding: '1rem',
                  border: 'none',
                  borderRadius: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {filteredProducts.length === 0 && !loading && (
        <div style={{textAlign: 'center', padding: '4rem'}}>
          <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🔍</div>
          <p style={{fontSize: '1.2rem', color: '#64748b'}}>No products found</p>
        </div>
      )}
    </div>
  );

  const CartPage = () => {
    const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);

    return (
      <div>
        <h2 style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center'}}>
          🛒 Shopping Cart ({cart.length} items)
        </h2>
        
        {cart.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem',
            backgroundColor: 'white',
            borderRadius: '1.5rem',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{fontSize: '4rem', marginBottom: '1rem'}}>🛒</div>
            <p style={{fontSize: '1.3rem', color: '#64748b', marginBottom: '2rem'}}>Your cart is empty</p>
            <button
              onClick={() => setCurrentPage('home')}
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                color: 'white',
                padding: '1rem 2rem',
                border: 'none',
                borderRadius: '1rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div>
            {cart.map((item, index) => (
              <div key={index} style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '1.5rem',
                marginBottom: '1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{display: 'flex', alignItems: 'center', gap: '1.5rem'}}>
                  <img 
                    src={item.image} 
                    alt={item.name}
                    style={{
                      width: '100px', 
                      height: '100px', 
                      borderRadius: '1rem', 
                      objectFit: 'cover'
                    }}
                  />
                  <div>
                    <h3 style={{fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '0.5rem'}}>
                      {item.name}
                    </h3>
                    <p style={{color: '#64748b'}}>{item.description}</p>
                  </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '2rem'}}>
                  <span style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#059669'}}>
                    ₹{item.price?.toLocaleString()}
                  </span>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    style={{
                      backgroundColor: '#ef4444',
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      border: 'none',
                      borderRadius: '1rem',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '1.5rem',
              marginTop: '2rem',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '2rem',
                fontWeight: 'bold',
                marginBottom: '2rem',
                color: '#1e293b'
              }}>
                <span>Total: ₹{total.toLocaleString()}</span>
              </div>
              <button
                style={{
                  background: 'linear-gradient(135deg, #059669, #047857)',
                  color: 'white',
                  padding: '1.5rem 2rem',
                  border: 'none',
                  borderRadius: '1rem',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                🚀 Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const LoginPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '' });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (formData.name && formData.email) {
        login(formData);
      }
    };

    return (
      <div style={{
        maxWidth: '500px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '3rem',
        borderRadius: '1.5rem',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
          <div style={{fontSize: '3rem', marginBottom: '1rem'}}>👋</div>
          <h2 style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#1e293b'}}>
            Welcome Back
          </h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={{marginBottom: '1.5rem'}}>
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              style={{
                width: '100%',
                padding: '1.2rem',
                border: '2px solid #e2e8f0',
                borderRadius: '1rem',
                fontSize: '1.1rem',
                outline: 'none'
              }}
              required
            />
          </div>
          <div style={{marginBottom: '2rem'}}>
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              style={{
                width: '100%',
                padding: '1.2rem',
                border: '2px solid #e2e8f0',
                borderRadius: '1rem',
                fontSize: '1.1rem',
                outline: 'none'
              }}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              color: 'white',
              padding: '1.2rem',
              border: 'none',
              borderRadius: '1rem',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Login
          </button>
        </form>
      </div>
    );
  };

  const AddProductPage = () => {
    const [formData, setFormData] = useState({
      name: '',
      price: '',
      image: '',
      description: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (formData.name && formData.price && formData.image && formData.description) {
        addProduct(formData);
        setFormData({ name: '', price: '', image: '', description: '' });
      }
    };

    return (
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '3rem',
        borderRadius: '1.5rem',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
          <div style={{fontSize: '3rem', marginBottom: '1rem'}}>➕</div>
          <h2 style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#1e293b'}}>
            Add New Product
          </h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={{marginBottom: '1.5rem'}}>
            <input
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              style={{
                width: '100%',
                padding: '1.2rem',
                border: '2px solid #e2e8f0',
                borderRadius: '1rem',
                fontSize: '1.1rem',
                outline: 'none'
              }}
              required
            />
          </div>
          <div style={{marginBottom: '1.5rem'}}>
            <input
              type="number"
              placeholder="Price (₹)"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              style={{
                width: '100%',
                padding: '1.2rem',
                border: '2px solid #e2e8f0',
                borderRadius: '1rem',
                fontSize: '1.1rem',
                outline: 'none'
              }}
              required
            />
          </div>
          <div style={{marginBottom: '1.5rem'}}>
            <input
              type="url"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              style={{
                width: '100%',
                padding: '1.2rem',
                border: '2px solid #e2e8f0',
                borderRadius: '1rem',
                fontSize: '1.1rem',
                outline: 'none'
              }}
              required
            />
          </div>
          <div style={{marginBottom: '2rem'}}>
            <textarea
              placeholder="Product Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              style={{
                width: '100%',
                padding: '1.2rem',
                border: '2px solid #e2e8f0',
                borderRadius: '1rem',
                fontSize: '1.1rem',
                outline: 'none',
                minHeight: '100px',
                resize: 'vertical'
              }}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #059669, #047857)',
              color: 'white',
              padding: '1.2rem',
              border: 'none',
              borderRadius: '1rem',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Add Product
          </button>
        </form>
      </div>
    );
  };

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#f8fafc', width: '100vw', margin: 0, padding: 0}}>
      <header style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
        color: 'white',
        padding: '1rem 0',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{
          width: '100%',
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 
            onClick={() => setCurrentPage('home')}
            style={{
              fontSize: '2rem', 
              fontWeight: 'bold', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            🏪 EliteMart Professional
          </h1>
          
          <nav style={{display: 'flex', alignItems: 'center', gap: '2rem'}}>
            <button 
              onClick={() => setCurrentPage('home')}
              style={{
                background: currentPage === 'home' ? 'rgba(255,255,255,0.2)' : 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1.1rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '1rem',
                fontWeight: '600'
              }}
            >
              🏠 Home
            </button>
            
            <button 
              onClick={() => setCurrentPage('cart')}
              style={{
                background: currentPage === 'cart' ? 'rgba(255,255,255,0.2)' : 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '1rem',
                fontWeight: '600'
              }}
            >
              🛒 Cart 
              {cart.length > 0 && (
                <span style={{
                  background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                  color: '#1e40af',
                  fontSize: '0.8rem',
                  fontWeight: '800',
                  padding: '0.3rem 0.7rem',
                  borderRadius: '50%',
                  minWidth: '1.5rem',
                  textAlign: 'center'
                }}>
                  {cart.length}
                </span>
              )}
            </button>
            
            <button 
              onClick={() => setCurrentPage('addProduct')}
              style={{
                background: currentPage === 'addProduct' ? 'rgba(255,255,255,0.2)' : 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1.1rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '1rem',
                fontWeight: '600'
              }}
            >
              ➕ Add Product
            </button>
            
            {user ? (
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <div style={{
                  background: 'rgba(255,255,255,0.15)',
                  padding: '0.5rem 1rem',
                  borderRadius: '2rem',
                  fontSize: '1rem'
                }}>
                  👋 Hello, {user.name}
                </div>
                <button 
                  onClick={logout}
                  style={{
                    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    border: 'none',
                    borderRadius: '1rem',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setCurrentPage('login')}
                style={{
                  background: 'linear-gradient(135deg, #ffffff, #f3f4f6)',
                  color: '#1e40af',
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '1rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Login
              </button>
            )}
          </nav>
        </div>
      </header>
      
      <main style={{
        width: '100%',
        padding: '2rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'cart' && <CartPage />}
        {currentPage === 'login' && <LoginPage />}
        {currentPage === 'addProduct' && <AddProductPage />}
      </main>
      
      {/* Footer with Contact */}
      <footer style={{
        backgroundColor: '#1e293b',
        color: 'white',
        padding: '3rem 2rem 2rem',
        marginTop: '4rem'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          <div>
            <h3 style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem'}}>
              🏪 EliteMart Professional
            </h3>
            <p style={{color: '#94a3b8', lineHeight: '1.6'}}>
              Your trusted partner for premium quality products at unbeatable prices.
            </p>
          </div>
          
          <div>
            <h4 style={{fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem'}}>Contact Us</h4>
            <div style={{color: '#94a3b8'}}>
              <p style={{marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                📧 <a href="mailto:support@elitemart.com" style={{color: '#60a5fa', textDecoration: 'none'}}>moni@gmail.com</a>
              </p>
              <p style={{marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                📞 +91 9345528492
              </p>
              <p style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                📍 Mumbai, Maharashtra, India
              </p>
            </div>
          </div>
          
          <div>
            <h4 style={{fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem'}}>Quick Links</h4>
            <div style={{color: '#94a3b8'}}>
              <p style={{marginBottom: '0.5rem'}}>
                <button onClick={() => setCurrentPage('home')} style={{background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer'}}>Home</button>
              </p>
              <p style={{marginBottom: '0.5rem'}}>
                <button onClick={() => setCurrentPage('addProduct')} style={{background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer'}}>Add Product</button>
              </p>
              <p>
                <button onClick={() => setCurrentPage('cart')} style={{background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer'}}>Shopping Cart</button>
              </p>
            </div>
          </div>
        </div>
        
        <div style={{
          borderTop: '1px solid #374151',
          marginTop: '2rem',
          paddingTop: '1rem',
          textAlign: 'center',
          color: '#94a3b8'
        }}>
          <p>© 2025 EliteMart Professional. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;