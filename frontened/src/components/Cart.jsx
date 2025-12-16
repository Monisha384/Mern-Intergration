import { Link } from "react-router-dom";

export default function Cart({ cart, setCart }) {
    const removeItem = (id) => {
        setCart(cart.filter(item => item._id !== id || item.id !== id));
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price, 0);
    };

    const clearCart = () => {
        setCart([]);
    };

    if (cart.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center">
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                    <p className="text-gray-600 mb-8">Add some products to get started!</p>
                    <Link 
                        to="/" 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
                    <span className="text-blue-100">{cart.length} items</span>
                </div>

                {/* Cart Items */}
                <div className="divide-y divide-gray-200">
                    {cart.map((item, index) => (
                        <div key={`${item._id || item.id}-${index}`} className="p-6 flex items-center space-x-4">
                            {/* Product Image */}
                            <div className="flex-shrink-0">
                                <img 
                                    src={item.image} 
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-lg"
                                />
                            </div>
                            
                            {/* Product Info */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-gray-900 truncate">
                                    {item.name}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    {item.category}
                                </p>
                                {item.rating && (
                                    <div className="flex items-center mt-2">
                                        <div className="flex items-center bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
                                            <span>{item.rating}</span>
                                            <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {/* Price */}
                            <div className="text-right">
                                <p className="text-2xl font-bold text-gray-900">₹{item.price}</p>
                            </div>
                            
                            {/* Remove Button */}
                            <button 
                                onClick={() => removeItem(item._id || item.id)}
                                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors duration-200"
                                title="Remove item"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>

                {/* Cart Summary */}
                <div className="bg-gray-50 px-6 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                        <span className="text-3xl font-bold text-green-600">₹{getTotalPrice()}</span>
                    </div>
                    
                    <div className="flex space-x-4">
                        <button 
                            onClick={clearCart}
                            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                        >
                            Clear Cart
                        </button>
                        <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}