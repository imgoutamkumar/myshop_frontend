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

const heroSlides = [
  {
    id: 1,
    title: "The Spring Collection",
    subtitle: "Embrace the season with soft pastels and flowy silhouettes designed for your comfort.",
    image: "https://i.pinimg.com/1200x/e1/f6/d6/e1f6d65cfa014ee925bb77bef40d69ee.jpg", 
    cta: "Shop Spring",
  },
  {
    id: 2,
    title: "Cozy Every Day",
    subtitle: "Discover our new range of plush knits and relaxed fits. Perfect for lounging or brunching.",
    image: "https://i.pinimg.com/1200x/9e/2a/ca/9e2aca62259eb8c4ba15a4fb4e9b81ec.jpg", 
    cta: "Explore Knits",
  },
  {
    id: 3,
    title: "Evening Elegance",
    subtitle: "Turn heads with our latest evening wear. Effortlessly chic and endlessly romantic.",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1600&auto=format&fit=crop", 
    cta: "View Dresses",
  }
]

const CustomCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 overflow-hidden">
      <Carousel
        plugins={[plugin.current]}
        className="w-full relative group"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          align: "start",
          loop: true,
          skipSnaps: false,
        }}
      >
        <CarouselContent className="-ml-0">
          {heroSlides.map((slide, index) => (
            <CarouselItem key={slide.id} className="pl-0">
              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="p-0">
                  
                  {/* MOVED: rounded-2xl and overflow-hidden are now directly on this wrapper */}
                  <div className="relative w-full h-[65vh] min-h-[480px] max-h-[750px] lg:h-[75vh] flex items-center rounded-2xl overflow-hidden">
                    
                    <img
                      src={slide.image}
                      alt={slide.title}
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/40 to-transparent sm:from-stone-900/70 sm:via-stone-900/30" />

                    <div className="relative z-10 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24 w-full sm:w-[85%] md:w-2/3 lg:w-1/2 text-white">
                      
                      <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif mb-4 leading-[1.15] tracking-tight drop-shadow-sm">
                        {slide.title}
                      </h2>
                      
                      <p className="text-base sm:text-lg md:text-xl font-light text-stone-100 mb-8 max-w-md md:max-w-lg leading-relaxed drop-shadow-sm">
                        {slide.subtitle}
                      </p>
                      
                      <div>
                        <button className="bg-white text-stone-900 px-8 py-3.5 rounded-full text-sm md:text-base font-medium tracking-widest uppercase hover:bg-stone-100 hover:text-rose-900 transition-colors duration-300 shadow-md">
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

        <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <CarouselPrevious className="left-6 lg:left-12 bg-white/20 hover:bg-white text-white hover:text-stone-900 border-none w-12 h-12 backdrop-blur-md transition-colors duration-300" />
          <CarouselNext className="right-6 lg:right-12 bg-white/20 hover:bg-white text-white hover:text-stone-900 border-none w-12 h-12 backdrop-blur-md transition-colors duration-300" />
        </div>
        
      </Carousel>
    </div>
  )
}

export default CustomCarousel