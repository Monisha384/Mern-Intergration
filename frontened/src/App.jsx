import { useState } from 'react';

const initialProducts = [
  { id: 1, name: 'iPhone 15', price: 79999, image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop', category: 'Electronics' },
  { id: 2, name: 'Samsung TV', price: 45999, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop', category: 'Electronics' },
  { id: 3, name: 'Nike Shoes', price: 8999, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop', category: 'Fashion' },
  { id: 4, name: 'Laptop', price: 65999, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop', category: 'Electronics' },
  { id: 5, name: 'Headphones', price: 12999, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop', category: 'Electronics' },
  { id: 6, name: 'Watch', price: 25999, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop', category: 'Fashion' },
  { id: 7, name: 'Camera', price: 89999, image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=300&fit=crop', category: 'Electronics' },
  { id: 8, name: 'Backpack', price: 3999, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop', category: 'Fashion' }
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState(initialProducts);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const login = (userData) => {
    setUser(userData);
    setCurrentPage('home');
  };

  const logout = () => {
    setUser(null);
    setCart([]);
  };

  const addProduct = (newProduct) => {
    const product = {
      ...newProduct,
      id: products.length + 1,
      price: parseInt(newProduct.price)
    };
    setProducts([...products, product]);
    setCurrentPage('home');
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h1 style={{fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem'}}>
          Welcome to ShopEase
        </h1>
        <p style={{fontSize: '1.2rem', opacity: 0.9}}>
          Discover amazing products at unbeatable prices
        </p>
      </div>

      <div style={{marginBottom: '2rem'}}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '1rem',
            border: '2px solid #e2e8f0',
            borderRadius: '0.5rem',
            outline: 'none'
          }}
        />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1.5rem'
      }}>
        {filteredProducts.map(product => (
          <div key={product.id} style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <img 
              src={product.image} 
              alt={product.name}
              style={{
                width: '100%',
                height: '250px',
                objectFit: 'cover',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
                display: 'block'
              }}
            />
            <h3 style={{fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>
              {product.name}
            </h3>
            <p style={{color: '#6b7280', marginBottom: '1rem'}}>
              {product.category}
            </p>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#059669'}}>
                ₹{product.price.toLocaleString()}
              </span>
              <button
                onClick={() => addToCart(product)}
                style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CartPage = () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    return (
      <div>
        <h2 style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem'}}>
          Shopping Cart ({cart.length} items)
        </h2>
        
        {cart.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem',
            backgroundColor: 'white',
            borderRadius: '1rem'
          }}>
            <p style={{fontSize: '1.2rem', color: '#6b7280'}}>Your cart is empty</p>
            <button
              onClick={() => setCurrentPage('home')}
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '1rem 2rem',
                border: 'none',
                borderRadius: '0.5rem',
                marginTop: '1rem',
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
                padding: '1.5rem',
                borderRadius: '1rem',
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                  <img 
                    src={item.image} 
                    alt={item.name}
                    style={{width: '80px', height: '80px', borderRadius: '0.5rem', objectFit: 'cover', display: 'block'}}
                  />
                  <div>
                    <h3 style={{fontWeight: 'bold'}}>{item.name}</h3>
                    <p style={{color: '#6b7280'}}>{item.category}</p>
                  </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                  <span style={{fontSize: '1.25rem', fontWeight: 'bold'}}>
                    ₹{item.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      backgroundColor: '#ef4444',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      border: 'none',
                      borderRadius: '0.5rem',
                      cursor: 'pointer'
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
              borderRadius: '1rem',
              marginTop: '2rem'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1rem'
              }}>
                <span>Total: ₹{total.toLocaleString()}</span>
              </div>
              <button
                style={{
                  backgroundColor: '#059669',
                  color: 'white',
                  padding: '1rem 2rem',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                Proceed to Checkout
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
        maxWidth: '400px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem'}}>
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{marginBottom: '1rem'}}>
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid #e2e8f0',
                borderRadius: '0.5rem',
                fontSize: '1rem'
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
                padding: '1rem',
                border: '2px solid #e2e8f0',
                borderRadius: '0.5rem',
                fontSize: '1rem'
              }}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '1rem',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '1.1rem',
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
      category: 'Electronics'
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (formData.name && formData.price && formData.image) {
        addProduct(formData);
        setFormData({ name: '', price: '', image: '', category: 'Electronics' });
      }
    };

    return (
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem'}}>
          Add New Product
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{marginBottom: '1rem'}}>
            <input
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid #e2e8f0',
                borderRadius: '0.5rem',
                fontSize: '1rem'
              }}
              required
            />
          </div>
          <div style={{marginBottom: '1rem'}}>
            <input
              type="number"
              placeholder="Price (₹)"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid #e2e8f0',
                borderRadius: '0.5rem',
                fontSize: '1rem'
              }}
              required
            />
          </div>
          <div style={{marginBottom: '1rem'}}>
            <input
              type="url"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid #e2e8f0',
                borderRadius: '0.5rem',
                fontSize: '1rem'
              }}
              required
            />
          </div>
          <div style={{marginBottom: '2rem'}}>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid #e2e8f0',
                borderRadius: '0.5rem',
                fontSize: '1rem'
              }}
            >
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home">Home</option>
              <option value="Sports">Sports</option>
            </select>
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#059669',
              color: 'white',
              padding: '1rem',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '1.1rem',
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
    <div style={{minHeight: '100vh', backgroundColor: '#e0f2fe', width: '100vw', margin: 0, padding: 0}}>
      <header style={{
        backgroundColor: '#1e40af',
        color: 'white',
        padding: '1rem 0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
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
            style={{fontSize: '1.5rem', fontWeight: 'bold', cursor: 'pointer'}}
          >
            🛍️ ShopEase
          </h1>
          
          <nav style={{display: 'flex', alignItems: 'center', gap: '2rem'}}>
            <button 
              onClick={() => setCurrentPage('home')}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Home
            </button>
            
            <button 
              onClick={() => setCurrentPage('cart')}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              Cart ({cart.length})
            </button>
            
            <button 
              onClick={() => setCurrentPage('addProduct')}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Add Product
            </button>
            
            {user ? (
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <span>Hello, {user.name}</span>
                <button 
                  onClick={logout}
                  style={{
                    backgroundColor: '#ef4444',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer'
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setCurrentPage('login')}
                style={{
                  backgroundColor: 'white',
                  color: '#1e40af',
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '0.25rem',
                  fontWeight: '600',
                  cursor: 'pointer'
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
        padding: '2rem'
      }}>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'cart' && <CartPage />}
        {currentPage === 'login' && <LoginPage />}
        {currentPage === 'addProduct' && <AddProductPage />}
      </main>
    </div>
  );
}

export default App;