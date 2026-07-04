"use client";

import { useState } from "react";
import { Trash2, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const initialWishlistItems = [
  {
    id: "p1",
    name: "H&M Women Floral Summer Dress",
    category: "Dresses",
    price: 1999,
    originalPrice: 2699,
    discountPercent: 25,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
  },
  {
    id: "p3",
    name: "Levi's Men Regular Fit Jeans",
    category: "Denim",
    price: 2499,
    originalPrice: 2999,
    discountPercent: 15,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
  },
  {
    id: "p7",
    name: "Nike Men Running Hoodie",
    category: "Sportswear",
    price: 3499,
    originalPrice: 4099,
    discountPercent: 15,
    image: "https://images.unsplash.com/photo-1602810316498-ab67cf68c8e6",
  },
  {
    id: "p12",
    name: "Vero Moda Women Cropped Top",
    category: "Tops",
    price: 899,
    originalPrice: 999,
    discountPercent: 10,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
  }
];

const Wishlist = () => {
  const [items, setItems] = useState(initialWishlistItems);

  const handleRemove = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[75vh] bg-stone-50 font-sans font-light text-stone-800 flex flex-col items-center justify-center px-4 text-center">
        <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-400 mb-6">
          <Heart className="w-6 h-6 fill-rose-100 text-rose-300" strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl font-serif text-rose-900 mb-2">Your Wishlist is Empty</h2>
        <p className="text-stone-500 max-w-xs mb-8 text-sm leading-relaxed">
          Save items that capture your eye while exploring our boutique to view them here.
        </p>
        <Link 
          to="/shop/products" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-rose-900 text-white rounded-full text-sm font-medium shadow-sm hover:bg-rose-800 transition-all group"
        >
          Explore Collections
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans font-light text-stone-800 py-12 md:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="mb-10 flex items-end justify-between border-b border-stone-200/60 pb-5">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-rose-900 tracking-tight">Favorites</h1>
            <p className="text-stone-400 text-xs mt-1">{items.length} curated styles</p>
          </div>
          <Link 
            to="/shop/home" 
            className="text-xs font-medium border-b border-rose-300 pb-0.5 text-stone-600 hover:text-rose-900 transition-colors"
          >
            Back to Shop
          </Link>
        </div>

        {/* COMPACT & MEDIUM GRID CONFIGURATION */}
        {/* grid-cols-2 on mobile dynamically makes items look tighter and high-end */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 md:gap-x-6 gap-y-8">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="group relative flex flex-col bg-transparent transition-all duration-300"
            >
              
              {/* Image Canvas Container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-stone-100">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                />
                
                {/* Minimal Overlay Dismiss Button */}
                <button 
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-stone-400 hover:text-rose-600 hover:bg-white md:opacity-0 group-hover:opacity-100 transition-all duration-200"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                {/* Subtle Discount Tag */}
                {item.discountPercent > 0 && (
                  <span className="absolute bottom-3 left-3 bg-rose-600 text-white text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-md">
                    -{item.discountPercent}%
                  </span>
                )}
              </div>

              {/* Minimal Product Details */}
              <div className="pt-3 flex flex-col gap-0.5 flex-1 bg-transparent">
                <span className="text-[10px] uppercase tracking-widest font-medium text-stone-400">
                  {item.category}
                </span>
                
                <h3 className="text-stone-700 text-sm font-normal line-clamp-1 group-hover:text-rose-900 transition-colors mt-0.5">
                  {item.name}
                </h3>
                
                {/* Price Display */}
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-medium text-stone-900">
                    ₹{item.price.toLocaleString()}
                  </span>
                  {item.originalPrice > item.price && (
                    <span className="text-xs text-stone-400 line-through">
                      ₹{item.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Wishlist;