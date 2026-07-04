"use client";

import { useState } from "react";
import { Trash2, MapPin, CreditCard, ChevronRight, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom"; // Assuming you are using React Router

const Checkout = () => {
    const [showAddress, setShowAddress] = useState(false);

    // Updated dummy data to match the aesthetic brand
    const products = [
        { 
            name: "Floral Wrap Dress", 
            color: "Soft Pink", 
            price: 1999, 
            quantity: 1, 
            size: "S", 
            image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446" 
        },
        { 
            name: "Ribbed Knit Sweater", 
            color: "Cream", 
            price: 2499, 
            quantity: 1, 
            size: "M", 
            image: "https://images.unsplash.com/photo-1434389678224-118df283d65b" 
        },
    ];

    // Calculate totals
    const subtotal = products.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = subtotal > 3000 ? 0 : 150; // Free shipping over 3000
    const tax = Math.round(subtotal * 0.05); // 5% tax
    const total = subtotal + shipping + tax;

    return (
        <div className="min-h-screen bg-stone-50 font-sans font-light text-stone-800 py-4 md:py-4">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-4xl md:text-5xl font-serif text-rose-900 mb-2">Shopping Bag</h1>
                    <p className="text-stone-500">{products.length} items in your bag</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                    
                    {/* LEFT COLUMN: Cart Items */}
                    <div className="flex-1 flex flex-col gap-8">
                        <div className="flex flex-col gap-6">
                            {products.map((product, index) => (
                                <div key={index} className="flex gap-4 md:gap-6 pb-6 border-b border-stone-200 group">
                                    {/* Product Image */}
                                    <div className="w-28 h-36 md:w-32 md:h-44 rounded-2xl overflow-hidden bg-stone-100 shrink-0">
                                        <img 
                                            className="w-full h-full object-cover" 
                                            src={product.image} 
                                            alt={product.name} 
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex flex-col flex-1 py-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-base md:text-lg font-medium text-stone-800">{product.name}</h3>
                                                <p className="text-sm text-stone-500 mt-1">Color: {product.color} | Size: {product.size}</p>
                                            </div>
                                            <button className="text-stone-400 hover:text-rose-600 transition-colors p-2 -mr-2">
                                                <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                                            </button>
                                        </div>

                                        <div className="mt-auto flex items-end justify-between">
                                            {/* Premium Quantity Selector */}
                                            <div className="flex items-center gap-4 border border-stone-200 rounded-full px-3 py-1.5 bg-white">
                                                <button className="text-stone-400 hover:text-rose-900 transition-colors">
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="text-sm font-medium w-4 text-center">{product.quantity}</span>
                                                <button className="text-stone-400 hover:text-rose-900 transition-colors">
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <p className="text-base md:text-lg font-medium text-stone-800">
                                                ₹{(product.price * product.quantity).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Continue Shopping Link */}
                        <Link to="/shop/home" className="inline-flex items-center gap-2 text-stone-500 hover:text-rose-900 transition-colors w-fit group text-sm font-medium">
                            <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:-translate-x-1 transition-transform">
                                <path d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Continue Shopping
                        </Link>
                    </div>

                    {/* RIGHT COLUMN: Order Summary (Sticky) */}
                    <div className="w-full lg:w-[400px] xl:w-[420px] shrink-0">
                        {/* Sticky container */}
                        <div className="sticky top-28 bg-white p-6 md:p-8 rounded-3xl border border-stone-100 shadow-sm flex flex-col gap-8">
                            <h2 className="text-2xl font-serif text-rose-900">Order Summary</h2>
                            
                            {/* Address & Payment UI */}
                            <div className="flex flex-col gap-4">
                                {/* Address Box */}
                                <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50 flex flex-col gap-2 relative">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2 text-stone-800 font-medium text-sm">
                                            <MapPin className="w-4 h-4 text-rose-500" />
                                            Delivery Address
                                        </div>
                                        <button 
                                            onClick={() => setShowAddress(!showAddress)} 
                                            className="text-xs text-rose-600 font-medium hover:underline"
                                        >
                                            Change
                                        </button>
                                    </div>
                                    <p className="text-sm text-stone-500 pl-6">123 Fashion Ave, NY 10001</p>
                                </div>

                                {/* Payment Method Box */}
                                <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50 flex flex-col gap-2 relative">
                                    <div className="flex items-center gap-2 text-stone-800 font-medium text-sm">
                                        <CreditCard className="w-4 h-4 text-rose-500" />
                                        Payment Method
                                    </div>
                                    <select className="ml-6 mt-1 text-sm bg-transparent border-none text-stone-600 outline-none cursor-pointer p-0 focus:ring-0">
                                        <option value="Card">Credit/Debit Card</option>
                                        <option value="UPI">UPI / Netbanking</option>
                                        <option value="COD">Cash on Delivery</option>
                                    </select>
                                </div>
                            </div>

                            {/* Cost Breakdown */}
                            <div className="flex flex-col gap-3 text-sm text-stone-500">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="text-stone-800">₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    {shipping === 0 ? (
                                        <span className="text-emerald-600 font-medium">Free</span>
                                    ) : (
                                        <span className="text-stone-800">₹{shipping.toLocaleString()}</span>
                                    )}
                                </div>
                                <div className="flex justify-between">
                                    <span>Estimated Tax</span>
                                    <span className="text-stone-800">₹{tax.toLocaleString()}</span>
                                </div>
                                
                                <div className="h-[1px] w-full bg-stone-200 my-2"></div>
                                
                                <div className="flex justify-between items-center text-lg font-medium text-stone-800">
                                    <span>Total</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <button className="w-full py-4 rounded-full bg-rose-900 text-white font-medium tracking-wide hover:bg-rose-800 transition-all shadow-sm hover:shadow-md flex justify-center items-center gap-2">
                                Proceed to Checkout
                                <ChevronRight className="w-4 h-4" />
                            </button>
                            
                            <p className="text-xs text-center text-stone-400 -mt-3">
                                Secure encrypted checkout
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;