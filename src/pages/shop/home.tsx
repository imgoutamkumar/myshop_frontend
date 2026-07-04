import React, { Suspense } from "react";
// 1. Keep above-the-fold imports standard so they load instantly
import CustomCarousel from "@/components/shop/CustomCarousel";
import FreeShippingPromoBanner from "@/components/shop/FreeShippingPromoBanner";
import { ScrollReveal } from "@/customComponent/ScrollReveal";
import TrendingSection from "@/components/shop/TrendingSection";

// 2. Lazy-load below-the-fold components
const CategoryBentoGrid = React.lazy(() => import("@/components/shop/CategoryBentoGrid"));
const FeaturedProducts = React.lazy(() => import("@/components/shop/FeaturedProducts"));
const TrustBadges = React.lazy(() => import("@/components/shop/TrustBadges"));

// Simple skeleton loader for smooth transitions
const Loader = () => <div className="w-full h-64 bg-stone-200 animate-pulse rounded-3xl" />;

const Home = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-stone-50 text-stone-800 font-sans font-light">
      
      <FreeShippingPromoBanner />
      {/* Assuming Navbar goes somewhere around here */}
      {/* <Navbar /> */}
      <CustomCarousel />

      <main className="flex flex-col w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24 gap-10 md:gap-8">
        
        {/* Shop by Category */}
        <ScrollReveal>
          <section>
            <h2 className="text-3xl font-serif text-center mb-10 text-rose-900">
              Shop Your Vibe
            </h2>
            {/* 3. Wrap lazy components in Suspense */}
            <Suspense fallback={<Loader />}>
              <CategoryBentoGrid />
            </Suspense>
          </section>
        </ScrollReveal>

        {/* Trending Items */}
        <ScrollReveal>
          <section>
            <div className="flex justify-between items-end mb-10">
              <h2 className="text-3xl font-serif text-rose-900">
                Trending Now
              </h2>
              <a href="/shop" className="text-sm border-b border-rose-300 pb-1 hover:text-rose-500 transition-colors">
                View All
              </a>
            </div>
            <Suspense fallback={<Loader />}>
              <FeaturedProducts />
            </Suspense>
          </section>
        </ScrollReveal>

        {/* Editorial Brand Story Section */}
        <ScrollReveal>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="aspect-[4/5] md:aspect-square overflow-hidden rounded-3xl bg-stone-200">
              <img 
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d" 
                alt="Brand Lifestyle" 
                className="w-full h-full object-cover"
                loading="lazy"    // <-- NEW: Defers loading until near viewport
                decoding="async"  // <-- NEW: Prevents image decoding from blocking the main thread
              />
            </div>
            <div className="flex flex-col justify-center px-4 md:px-0">
              <h2 className="text-3xl md:text-4xl font-serif text-rose-900 mb-6 leading-tight">
                Designed for the modern romantic.
              </h2>
              <p className="text-stone-600 mb-8 leading-relaxed font-light text-lg">
                Every piece in our collection is crafted with intention. From the softest sustainable fabrics to the delicate finishing touches, we create clothes that make you feel like the main character of your own story.
              </p>
              <div>
                <a href="/about" className="inline-block border border-rose-900 text-rose-900 hover:bg-rose-900 hover:text-white transition-colors duration-300 px-8 py-3 rounded-full text-sm tracking-widest uppercase">
                  Our Story
                </a>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Trust Badges */}
        <ScrollReveal>
          <Suspense fallback={<Loader />}>
            <TrustBadges />
          </Suspense>
        </ScrollReveal>

        {/* Social Proof */}
        <ScrollReveal>
          <section>
            <h2 className="text-3xl font-serif text-center mb-10 text-rose-900">
              Spotted on You
            </h2>
            <Suspense fallback={<Loader />}>
              <TrendingSection />
            </Suspense>
          </section>
        </ScrollReveal>

      </main>

      {/* Newsletter Section */}
      <ScrollReveal>
        <section className="w-full bg-rose-50 py-20 px-4 sm:px-6 mt-auto">
          <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
            <h2 className="text-3xl font-serif text-rose-900 mb-4">Join the Club</h2>
            <p className="text-stone-600 mb-8 font-light">
              Sign up for love notes, early access to new collections, and 10% off your first order.
            </p>
            <form className="w-full flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-6 py-4 rounded-full border border-rose-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-rose-300 transition-all font-light placeholder:text-stone-400"
                required
              />
              <button 
                type="submit" 
                className="px-8 py-4 rounded-full bg-rose-900 text-white font-medium hover:bg-rose-800 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
};

export default Home;