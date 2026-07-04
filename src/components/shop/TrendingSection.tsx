import React from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";

// Premium dummy data with primary and hover images
const trendingProducts = [
  {
    id: 1,
    name: "Active t-shirt and joggers set",
    category: "Casualwear",
    price: "$245",
    imagePrimary: "https://i.pinimg.com/control1/1200x/5d/ec/89/5dec89869d16c208753d0202bfc45034.jpg",
    imageHover: "https://i.pinimg.com/control1/1200x/5d/ec/89/5dec89869d16c208753d0202bfc45034.jpg",
    isNew: true,
  },
  {
    id: 2,
    name: "Silk saree",
    category: "Outerwear",
    price: "$480",
    imagePrimary: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/MARCH/27/1XVNKNxF_74b0dbcbc9684ead9beabd7ed310baf6.jpg",
    imageHover: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/MARCH/27/1XVNKNxF_74b0dbcbc9684ead9beabd7ed310baf6.jpg",
    isNew: false,
  },
  {
    id: 3,
    name: "Pleated Wide-Leg Trouser",
    category: "Bottoms",
    price: "$185",
    imagePrimary: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=800&auto=format&fit=crop",
    imageHover: "https://images.unsplash.com/photo-1509631179647-0c1158a18351?q=80&w=800&auto=format&fit=crop",
    isNew: false,
  },
  {
    id: 4,
    name: "Leather Minimalist Tote",
    category: "Accessories",
    price: "$320",
    imagePrimary: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=800&auto=format&fit=crop",
    imageHover: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop",
    isNew: true,
  },
];

const TrendingSection = () => {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-stone-200 pb-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-2">
            Trending Now
          </h2>
          <p className="text-stone-500 font-light text-sm md:text-base">
            Curated pieces defining this season.
          </p>
        </div>
        <a 
          href="/shop" 
          className="group flex items-center gap-2 text-sm uppercase tracking-widest text-stone-900 font-medium mt-6 md:mt-0"
        >
          <span className="border-b border-transparent group-hover:border-stone-900 transition-colors duration-300 pb-0.5">
            View Collection
          </span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
        </a>
      </div>

      {/* Grid Layout: 2 on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {trendingProducts.map((product) => (
          <div key={product.id} className="group flex flex-col cursor-pointer">
            
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-stone-100 mb-4 isolate">
              
              {/* Badges */}
              {product.isNew && (
                <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-widest font-medium text-stone-900 rounded-full">
                  New
                </div>
              )}

              {/* Primary Image */}
              <img
                src={product.imagePrimary}
                alt={product.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0 z-10"
              />
              
              {/* Hover Image */}
              <img
                src={product.imageHover}
                alt={`${product.name} alternate view`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-[2s] ease-out group-hover:scale-105 will-change-transform"
              />

              {/* Quick Add Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <button className="w-full bg-white/95 backdrop-blur-md text-stone-900 flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs uppercase tracking-widest font-medium hover:bg-stone-900 hover:text-white transition-colors duration-300 shadow-lg shadow-black/5">
                  <ShoppingBag className="w-4 h-4" />
                  Quick Add
                </button>
              </div>
            </div>

            {/* Product Meta */}
            <div className="flex flex-col items-center text-center px-2">
              <span className="text-[10px] md:text-xs text-stone-500 uppercase tracking-widest mb-1.5">
                {product.category}
              </span>
              <h3 className="font-serif text-stone-900 text-sm md:text-base mb-1 transition-colors group-hover:text-stone-500">
                {product.name}
              </h3>
              <span className="text-stone-900 font-light text-sm">
                {product.price}
              </span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;