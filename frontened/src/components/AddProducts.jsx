import { useState } from 'react'
import { API } from '../utils/api'

export default function AddProducts() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [rating, setRating] = useState("");

    const categories = ["Electronics", "Audio", "Gaming", "Wearables", "Accessories", "Photography"];

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API}/api/postProduct`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    description,
                    price: Number(price),
                    image,
                    category,
                    rating: Number(rating)
                }),
            });

            if(res.ok) {
                alert("Product added successfully");
                setName("");
                setDescription("");
                setPrice("");
                setImage("");
                setCategory("");
                setRating("");
            } else {
                alert("Failed to add product");
            }
        } catch(error) {
            console.error(error);
            alert("Error adding product");
        }
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-blue-600 px-6 py-4">
                    <h2 className="text-2xl font-bold text-white">Add New Product</h2>
                    <p className="text-blue-100 mt-1">Fill in the details to list your product</p>
                </div>
                
                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Product Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Product Name *
                        </label>
                        <input 
                            type="text" 
                            placeholder="Enter product name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Description *
                        </label>
                        <textarea 
                            placeholder="Enter product description" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                            required
                        />
                    </div>

                    {/* Price and Rating Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Price (₹) *
                            </label>
                            <input 
                                type="number" 
                                placeholder="0" 
                                value={price} 
                                onChange={(e) => setPrice(e.target.value)}
                                min="0"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Rating
                            </label>
                            <input 
                                type="number" 
                                placeholder="4.5" 
                                value={rating} 
                                onChange={(e) => setRating(e.target.value)}
                                min="0"
                                max="5"
                                step="0.1"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Category *
                        </label>
                        <select 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Image URL *
                        </label>
                        <input 
                            type="url" 
                            placeholder="https://example.com/image.jpg" 
                            value={image} 
                            onChange={(e) => setImage(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Image Preview */}
                    {image && (
                        <div className="bg-gray-50 rounded-lg p-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Image Preview
                            </label>
                            <div className="flex justify-center">
                                <img 
                                    src={image} 
                                    alt="Preview" 
                                    className="max-w-xs max-h-48 object-cover rounded-lg shadow-md"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button 
                            type="submit" 
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 text-lg"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}