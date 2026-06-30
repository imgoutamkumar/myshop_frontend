// components/shop/CategoryBentoGrid.tsx
const CategoryBentoGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 h-[600px]">
      {/* Main Large Card */}
      <div className="md:col-span-2 relative group overflow-hidden rounded-3xl cursor-pointer">
        <img
          src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446"
          alt="Cozy Dresses"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex flex-col justify-end p-8">
          <h3 className="text-3xl font-serif text-white mb-2">Summer Breezes</h3>
          <p className="text-white/90 font-light">Flowy dresses for warm days</p>
        </div>
      </div>

      {/* Side Stacked Cards */}
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="h-full relative group overflow-hidden rounded-3xl cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1434389678224-118df283d65b"
            alt="Chic Knits"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <span className="bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full text-stone-800 font-medium tracking-wide text-sm">
              Cozy Knits
            </span>
          </div>
        </div>

        <div className="h-full relative group overflow-hidden rounded-3xl cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7"
            alt="Accessories"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <span className="bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full text-stone-800 font-medium tracking-wide text-sm">
              Accessories
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBentoGrid;