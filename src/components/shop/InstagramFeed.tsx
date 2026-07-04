import { Heart, MessageCircle } from "lucide-react";

// Added dummy engagement numbers to make it look like a real, active feed
const instaPosts = [
  { img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f", likes: "1.2k", comments: "48" },
  { img: "https://images.unsplash.com/photo-1551537482-f209eb2a470a", likes: "856", comments: "24" },
  { img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c", likes: "2.4k", comments: "105" },
  { img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5", likes: "943", comments: "32" },
  { img: "https://images.unsplash.com/photo-1515347619152-09bb333b2bf4", likes: "1.8k", comments: "76" },
  { img: "https://images.unsplash.com/photo-1434389678224-118df283d65b", likes: "3.1k", comments: "142" },
];

const InstagramFeed = () => {
  return (
    <div className="w-full relative">
      {/* The scrolling container:
        - overflow-x-auto allows horizontal scrolling
        - snap-x makes it snap perfectly to the next image
        - [&::-webkit-scrollbar]:hidden hides the ugly default scrollbar
      */}
      <div 
        className="flex overflow-x-auto gap-4 md:gap-6 snap-x snap-mandatory scroll-smooth w-full px-4 sm:px-6 lg:px-8 pb-8 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
      >
        {instaPosts.map((post, i) => (
          <div 
            key={i} 
            // Width is set to peek the next image (70% on mobile, 30% on tablet, 22% on desktop)
            className="flex-none w-[70vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw] snap-center sm:snap-start aspect-square relative group overflow-hidden rounded-3xl cursor-pointer bg-stone-100 shadow-sm"
          >
            <img
              src={post.img}
              alt={`Instagram post ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Premium Glassmorphism Overlay on Hover */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-6">
              
              {/* Likes */}
              <div className="flex flex-col items-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <Heart className="w-7 h-7 mb-1 fill-white" />
                <span className="font-medium tracking-wide text-sm">{post.likes}</span>
              </div>

              {/* Comments */}
              <div className="flex flex-col items-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                <MessageCircle className="w-7 h-7 mb-1 fill-white" />
                <span className="font-medium tracking-wide text-sm">{post.comments}</span>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstagramFeed;