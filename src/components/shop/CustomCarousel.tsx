"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

// Dummy data for our premium hero slides
const heroSlides = [
  {
    id: 1,
    title: "The Spring Collection",
    subtitle: "Embrace the season with soft pastels and flowy silhouettes designed for your comfort.",
    image: "https://images.unsplash.com/photo-1515347619152-09bb333b2bf4", // Soft, bright, girly aesthetic
    cta: "Shop Spring",
  },
  {
    id: 2,
    title: "Cozy Every Day",
    subtitle: "Discover our new range of plush knits and relaxed fits. Perfect for lounging or brunching.",
    image: "https://images.unsplash.com/photo-1434389678224-118df283d65b", // Warm, cozy knits
    cta: "Explore Knits",
  },
  {
    id: 3,
    title: "Evening Elegance",
    subtitle: "Turn heads with our latest evening wear. Effortlessly chic and endlessly romantic.",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c", // Elegant dress
    cta: "View Dresses",
  }
]

const CustomCarousel = () => {
  // Autoplay plugin reference - stops playing when the user interacts with it
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
      <Carousel
        plugins={[plugin.current]}
        className="w-full relative group"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id}>
              {/* Overriding default Card styles for a clean, borderless look */}
              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="p-0">
                  <div className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden">
                    {/* Background Image with slight zoom effect on load/hover */}
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                    
                    {/* Soft gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-stone-900/60 via-stone-900/30 to-transparent" />

                    {/* Text Content */}
                    <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24 w-full md:w-2/3 lg:w-1/2 text-white">
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4 leading-tight">
                        {slide.title}
                      </h2>
                      <p className="text-lg md:text-xl font-light text-stone-100 mb-8 max-w-md">
                        {slide.subtitle}
                      </p>
                      <div>
                        <button className="bg-white/90 hover:bg-white text-rose-900 px-8 py-3 rounded-full font-medium tracking-wide transition-all duration-300 shadow-sm hover:shadow-md">
                          {slide.cta}
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Customizing the Previous/Next Buttons for a premium look */}
        <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <CarouselPrevious className="left-8 bg-white/50 hover:bg-white hover:text-rose-600 border-none w-12 h-12 shadow-sm text-stone-800" />
          <CarouselNext className="right-8 bg-white/50 hover:bg-white hover:text-rose-600 border-none w-12 h-12 shadow-sm text-stone-800" />
        </div>
      </Carousel>
    </div>
  )
}

export default CustomCarousel