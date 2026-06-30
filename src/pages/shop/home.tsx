import CustomCarousel from "@/components/shop/CustomCarousel";
import FreeShippingPromoBanner from "@/components/shop/FreeShippingPromoBanner";
import CategoryBentoGrid from "@/components/shop/CategoryBentoGrid";
import FeaturedProducts from "@/components/shop/FeaturedProducts";
import TrustBadges from "@/components/shop/TrustBadges";
import InstagramFeed from "@/components/shop/InstagramFeed";

const Home = () => {
  return (
    // 'bg-stone-50' gives a warm, cozy off-white background
    <div className="flex flex-col w-full min-h-screen bg-stone-50 text-stone-800 font-sans font-light">
      
      {/* Top of the funnel */}
     
      <CustomCarousel />
 <FreeShippingPromoBanner />
      {/* Main Content Container with premium whitespace (py-16) */}
      <main className="flex flex-col w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-24">
        
        {/* Shop by Category - soft rounded corners inside this component */}
        <section>
          <h2 className="text-3xl font-serif text-center mb-10 text-rose-900">
            Shop Your Vibe
          </h2>
          <CategoryBentoGrid />
        </section>

        {/* Trending Items - horizontal scroll inside */}
        <section>
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-3xl font-serif text-rose-900">
              Trending Now
            </h2>
            <a href="/shop" className="text-sm border-b border-rose-300 pb-1 hover:text-rose-500 transition-colors">
              View All
            </a>
          </div>
          <FeaturedProducts />
        </section>

        {/* Trust Badges - soft pink backgrounds for icons */}
        <TrustBadges />

        {/* Social Proof */}
        <section>
          <h2 className="text-3xl font-serif text-center mb-10 text-rose-900">
            Spotted on You
          </h2>
          <InstagramFeed />
        </section>

      </main>
    </div>
  );
};

export default Home;