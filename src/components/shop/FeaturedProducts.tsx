// components/shop/FeaturedProducts.tsx
const dummyProducts = [
  { id: 1, name: "Floral Wrap Dress", price: "₹1,999", img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1" },
  { id: 2, name: "Soft Ribbed Top", price: "₹899", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c" },
  { id: 3, name: "Pastel Cardigan", price: "₹2,499", img: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e" },
  { id: 4, name: "Wide Leg Jeans", price: "₹2,299", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246" },
];

const FeaturedProducts = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {dummyProducts.map((product) => (
        <div key={product.id} className="group flex flex-col gap-3 cursor-pointer">
          <div className="w-full aspect-[4/5] overflow-hidden rounded-2xl bg-stone-100">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col px-1">
            <h4 className="text-stone-700 text-sm font-medium">{product.name}</h4>
            <p className="text-stone-500 text-sm mt-1">{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProducts;