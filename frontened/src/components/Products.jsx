import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import {API, products as staticProducts} from "../utils/api"

export default function Products({setCart,cart}) {
  const [products, setProducts] = useState(staticProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  useEffect(()=>{
    fetch(`${API}/api/product`)
    .then((res)=>res.json())
    .then((data)=>setProducts(data))
    .catch(()=>setProducts(staticProducts))
  }, [])

  const addToCart = (item) => {
    setCart([...cart, item]);
    alert("✅ Added to cart!");
  };

  const deleteProduct = async(id)=>{
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if(!confirmDelete) return;
    try {
      const res = await fetch(`${API}/api/deleteProduct/${id}`,{
        method:"DELETE",
      });
      if(res.status===204){
        alert("Product deleted successfully");
        setProducts(products.filter((p)=>p._id!==id));
      } else {
        alert("Failed to delete product");
      }
    } catch(error) {
      console.log("Delete error:", error);
    }
  };

  const categories = [...new Set(products.map(p => p.category))];
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '1rem',
        padding: '3rem 2rem',
        textAlign: 'center',
        marginBottom: '2rem',
        color: 'white'
      }}>
        <h1 style={{fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem'}}>
          Welcome to ShopEase
        </h1>
        <p style={{fontSize: '1.2rem', opacity: 0.9}}>
          Discover amazing products at unbeatable prices
        </p>
      </div>

      {/* Search and Filters */}
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem'
      }}>
        <div style={{marginBottom: '1.5rem'}}>
          <div style={{position: 'relative', maxWidth: '600px', margin: '0 auto'}}>
            <input
              type="text"
              placeholder="🔍 Search for products, brands and more..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem 1rem 1rem 3rem',
                border: '2px solid #e5e7eb',
                borderRadius: '2rem',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
            <div style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '1.2rem'
            }}>
              🔍
            </div>
          </div>
        </div>
        
        <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              border: '2px solid #e5e7eb',
              borderRadius: '0.5rem',
              background: 'white',
              cursor: 'pointer',
              fontSize: '0.9rem',
              minWidth: '150px'
            }}
          >
            <option value="">📂 All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div style={{marginBottom: '2rem', textAlign: 'center'}}>
        <h2 style={{fontSize: '1.8rem', fontWeight: '700', color: '#1f2937'}}>
          🛍️ Products ({filteredProducts.length})
        </h2>
      </div>
      
      {/* Products Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem',
        marginTop: '2rem'
      }}>
        {filteredProducts.map(p => (
          <div key={p._id || p.id} style={{
            background: 'white',
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
          }}>
            
            {/* Product Image */}
            <div style={{position: 'relative'}}>
              <img 
                src={p.image} 
                alt={p.name} 
                style={{
                  width: '100%',
                  height: '250px',
                  objectFit: 'cover'
                }}
              />
              {/* Category Badge */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                backgroundColor: '#2563eb',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: '600',
                padding: '0.5rem 1rem',
                borderRadius: '2rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}>
                {p.category}
              </div>
            </div>
            
            {/* Product Info */}
            <div style={{padding: '1.5rem'}}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                marginBottom: '0.5rem',
                color: '#111827',
                lineHeight: '1.3'
              }}>{p.name}</h3>
              
              {/* Rating */}
              {p.rating && (
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  backgroundColor: '#16a34a',
                  color: 'white',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '0.5rem',
                  gap: '0.3rem'
                }}>
                  <span>{p.rating}</span>
                  <span>⭐</span>
                </div>
              )}
              
              {/* Price */}
              <div style={{
                fontSize: '1.75rem',
                fontWeight: '800',
                color: '#16a34a',
                marginBottom: '1rem'
              }}>₹{p.price.toLocaleString()}</div>
              
              {/* Description */}
              <p style={{
                color: '#6b7280',
                fontSize: '0.9rem',
                marginBottom: '1.5rem',
                lineHeight: '1.5',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {p.description}
              </p>
              
              {/* Action Buttons */}
              <div style={{display: 'flex', gap: '0.75rem', flexWrap: 'wrap'}}>
                <button 
                  onClick={() => addToCart(p)} 
                  style={{
                    flex: 1,
                    minWidth: '120px',
                    backgroundColor: '#f97316',
                    color: 'white',
                    padding: '0.75rem 1rem',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '0.9rem'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#ea580c'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#f97316'}
                >
                  🛒 Add to Cart
                </button>
                <Link 
                  to={`/product/${p._id || p.id}`} 
                  style={{
                    flex: 1,
                    minWidth: '120px',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    padding: '0.75rem 1rem',
                    textDecoration: 'none',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    fontSize: '0.9rem'
                  }}
                >
                  👁️ View Details
                </Link>
                {p._id && (
                  <button 
                    onClick={() => deleteProduct(p._id)} 
                    style={{
                      backgroundColor: '#ef4444',
                      color: 'white',
                      padding: '0.75rem 1rem',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    🗑️
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* No Products Found */}
      {filteredProducts.length === 0 && (
        <div style={{
          textAlign: 'center', 
          padding: '4rem',
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{fontSize: '4rem', marginBottom: '1rem'}}>🔍</div>
          <h3 style={{fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#374151'}}>
            No products found
          </h3>
          <p style={{color: '#6b7280', fontSize: '1.1rem'}}>
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  )
}