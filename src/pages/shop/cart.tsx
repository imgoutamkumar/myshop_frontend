"use client";

import { useState } from "react";
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight, Lock } from "lucide-react";
import { Link } from "react-router-dom";

// Premium mock data
const initialCartItems = [
  {
    id: "c1",
    name: "Silk Slip Midi Dress",
    category: "Dresses",
    color: "Champagne",
    size: "S",
    price: 3299,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8",
  },
  {
    id: "c2",
    name: "Oversized Cashmere Cardigan",
    category: "Knitwear",
    color: "Oatmeal",
    size: "M",
    price: 4599,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1434389678224-118df283d65b",
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Interactivity handlers
  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items => 
      items.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shippingThreshold = 5000;
  const shipping = subtotal === 0 ? 0 : (subtotal > shippingThreshold ? 0 : 150);
  const tax = Math.round(subtotal * 0.05); // 5% tax estimate
  const total = subtotal + shipping + tax;

  // Premium Empty State
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[75vh] bg-stone-50 font-sans font-light text-stone-800 flex flex-col items-center justify-center px-4 text-center">
        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center text-rose-400 mb-6">
          <ShoppingBag className="w-8 h-8 text-rose-300" strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl font-serif text-rose-900 mb-3">Your Bag is Empty</h2>
        <p className="text-stone-500 max-w-sm mb-8 leading-relaxed">
          Looks like you haven't added anything to your bag yet. Let's find some beautiful pieces for your wardrobe.
        </p>
        <Link 
          to="/shop/products" 
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-rose-900 text-white rounded-full font-medium shadow-sm hover:bg-rose-800 hover:shadow-md transition-all group"
        >
          Start Shopping
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans font-light text-stone-800 py-12 md:py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 border-b border-stone-200/60 pb-6">
          <h1 className="text-4xl md:text-5xl font-serif text-rose-900 mb-2 tracking-tight">Shopping Bag</h1>
          <p className="text-stone-500 text-sm">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} reserved for checkout</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* LEFT: Cart Items List */}
          <div className="flex-1 flex flex-col gap-8">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 md:gap-6 group">
                
                {/* Product Image */}
                <Link to={`/shop/product/${item.id}`} className="shrink-0">
                  <div className="w-28 h-36 md:w-36 md:h-48 rounded-2xl overflow-hidden bg-stone-100">
                    <img 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      src={item.image} 
                      alt={item.name} 
                    />
                  </div>
                </Link>

                {/* Product Details & Controls */}
                <div className="flex flex-col flex-1 py-1">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest font-medium text-stone-400 block mb-1">
                        {item.category}
                      </span>
                      <Link to={`/shop/product/${item.id}`}>
                        <h3 className="text-base md:text-lg font-medium text-stone-800 hover:text-rose-900 transition-colors line-clamp-2">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-stone-500 mt-1.5 font-light">
                        {item.color} <span className="mx-1">•</span> Size {item.size}
                      </p>
                    </div>
                    
                    {/* Delete Button */}
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-stone-400 hover:text-rose-600 transition-colors p-2 -mr-2 md:opacity-0 group-hover:opacity-100"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>

                  <div className="mt-auto flex items-end justify-between">
                    {/* Premium Pill Quantity Selector */}
                    <div className="flex items-center gap-4 border border-stone-200 rounded-full px-1.5 py-1.5 bg-white shadow-sm">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-stone-500 hover:bg-stone-100 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-stone-500 hover:bg-stone-100 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    
                    {/* Price */}
                    <div className="text-right">
                      <p className="text-base md:text-lg font-medium text-stone-800">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-[11px] text-stone-400 mt-0.5">
                          ₹{item.price.toLocaleString()} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Order Summary (Sticky) */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div className="sticky top-28 bg-white p-6 md:p-8 rounded-3xl border border-stone-100 shadow-sm flex flex-col gap-6">
              <h2 className="text-2xl font-serif text-rose-900">Summary</h2>
              
              {/* Cost Breakdown */}
              <div className="flex flex-col gap-4 text-sm text-stone-500 font-light">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="text-stone-800 font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-md text-xs">Complimentary</span>
                  ) : (
                    <span className="text-stone-800 font-medium">₹{shipping.toLocaleString()}</span>
                  )}
                </div>

                {shipping > 0 && (
                  <p className="text-[11px] text-rose-600/80 -mt-2">
                    Add ₹{(shippingThreshold - subtotal).toLocaleString()} more to unlock complimentary shipping.
                  </p>
                )}

                <div className="flex justify-between items-center">
                  <span>Estimated Tax</span>
                  <span className="text-stone-800 font-medium">₹{tax.toLocaleString()}</span>
                </div>
                
                <div className="h-[1px] w-full bg-stone-100 my-2"></div>
                
                <div className="flex justify-between items-center text-xl font-serif text-stone-900">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Action */}
              <div className="flex flex-col gap-3 mt-2">
                <Link 
                  to="/shop/checkout"
                  className="w-full py-4 rounded-full bg-rose-900 text-white font-medium tracking-wide hover:bg-rose-800 transition-all shadow-sm hover:shadow-md flex justify-center items-center gap-2"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>
                
                <div className="flex justify-center items-center gap-1.5 text-[11px] text-stone-400 font-medium uppercase tracking-wider mt-2">
                  <Lock className="w-3 h-3" /> Secure Checkout
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;