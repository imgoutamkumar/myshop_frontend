// components/shop/InstagramFeed.tsx
const instaImages = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
  "https://images.unsplash.com/photo-1551537482-f209eb2a470a",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
  "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
];

const InstagramFeed = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {instaImages.map((img, i) => (
        <div key={i} className="aspect-square relative group overflow-hidden rounded-2xl cursor-pointer">
          <img
            src={img}
            alt={`Instagram post ${i + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Subtle overlay on hover mimicking Instagram */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              ❤️
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InstagramFeed;