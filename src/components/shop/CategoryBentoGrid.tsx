import React from "react";

const categories = [
  {
    id: 1,
    title: "The Evening Edit",
    subtitle: "Elegance redefined for your most memorable nights.",
    image: "https://i.pinimg.com/1200x/46/79/c7/4679c7b4a64bb85ebb07dba7f6420e6e.jpg",
    // Spans 2 columns and 2 rows on large screens
    className: "md:col-span-2 md:row-span-2 min-h-[400px] md:min-h-[600px]",
    isHero: true,
  },
  {
    id: 2,
    title: "Silks & Satins",
    subtitle: "Fluid silhouettes",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
    className: "col-span-1 row-span-1 min-h-[250px] md:min-h-[300px]",
  },
  {
    id: 3,
    title: "FineCollection",
    subtitle: "Subtle statements",
    image: "https://i.pinimg.com/1200x/b0/f8/64/b0f864266d7e4d774472f904e1a342ee.jpg",
    className: "col-span-1 row-span-1 min-h-[250px] md:min-h-[300px]",
  },
  {
    id: 4,
    title: "Running Collection",
    subtitle: "Timeless craft",
    image: "https://i.pinimg.com/control1/1200x/d0/81/96/d08196f62b8c719689d8f65bb8ab9a30.jpg",
    className: "col-span-1 row-span-1 min-h-[250px] md:min-h-[300px]",
  },
  {
    id: 5,
    title: "Modern Tailoring",
    subtitle: "Structured perfection",
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=800&auto=format&fit=crop",
    className: "col-span-1 row-span-1 min-h-[250px] md:min-h-[300px]",
  },
];

const CategoryBentoGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full auto-rows-min">
      {categories.map((category) => (
        <a
          key={category.id}
          href={`/shop/${category.title.toLowerCase().replace(/ /g, "-")}`}
          className={`relative group overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer isolate ${category.className}`}
        >
          {/* Background Image with Ken Burns Effect */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={category.image}
              alt={category.title}
              loading="lazy"
              className="w-full h-full object-cover will-change-transform transition-transform duration-[1.5s] ease-out group-hover:scale-110"
            />
          </div>

          {/* Luxury Gradient Overlay - Darkens slightly on hover for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" />

          {/* Content Container */}
          <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10">
            <div className="transform transition-transform duration-700 ease-out translate-y-4 group-hover:translate-y-0">
              
              <h3 
                className={`font-serif text-white mb-2 tracking-wide ${
                  category.isHero ? "text-3xl md:text-5xl" : "text-xl md:text-2xl"
                }`}
              >
                {category.title}
              </h3>
              
              <p 
                className={`text-white/80 font-light tracking-wider opacity-0 transition-opacity duration-700 delay-100 group-hover:opacity-100 ${
                  category.isHero ? "text-base md:text-lg mb-4 max-w-md" : "text-xs md:text-sm mb-2"
                }`}
              >
                {category.subtitle}
              </p>

              {/* Animated Shop Link */}
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="text-white text-xs uppercase tracking-[0.2em] font-medium opacity-0 transform -translate-x-4 transition-all duration-700 delay-200 group-hover:opacity-100 group-hover:translate-x-0">
                  Discover
                </span>
                <svg 
                  className="w-4 h-4 text-white opacity-0 transform -translate-x-4 transition-all duration-700 delay-300 group-hover:opacity-100 group-hover:translate-x-0" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>

            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default CategoryBentoGrid;