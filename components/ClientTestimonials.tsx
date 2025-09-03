"use client";

import React, { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alden Do Rosario",
    role: "CEO",
    //company: "Tech Solutions Inc.",
    image: "/images/clients/profile/alden.webp",
    message: "Tom -- this is fantastic work -- well done ..!!!",
    rating: 5
  },
  {
    id: 2,
    name: "Xavier Perrotton",
    role: "AI & Data Director",
    //company: "Valeo",
    image: "/images/clients/profile/xavier.webp",
    message: "Hello Tom. It was a real pleasure to be able to collaborate together, thank you for your contributions to Valeo! Best wishes for the future, lots of success in your new projects!",
    rating: 5
  },
  {
    id: 3,
    name: "Stéphane Doinel",
    role: "Product Manager",
    //company: "Innovation Labs",
    image: "/images/clients/profile/stephane.webp",
    message: "It was really nice working with you these last few weeks, I think we made good progress on the different projects with good deployment prospects",
    rating: 5
  }
];

export default function ClientTestimonials() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Intersection Observer to detect when section is in view
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '50px', // Start slightly before it comes into view
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Detect screen size for desktop
  React.useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024); // 1024px is typical desktop breakpoint
    };

    checkIsDesktop(); // Check initial size
    window.addEventListener('resize', checkIsDesktop);

    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  // Auto-rotation functionality - only starts when section is in view and not on desktop
  React.useEffect(() => {
    if (!api || isHovered || !isInView || isDesktop) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [api, isHovered, isInView, isDesktop]);

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <section ref={sectionRef} className="py-8 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            What They Said About Our Collaboration
          </h2>
        </div>

        {/* Top Gray Horizontal Line */}
        <div className="w-full h-0.5 md:h-1 bg-gray-400 mb-8 md:mb-12"></div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto px-8 md:px-12 lg:px-16">
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              align: "center",
              loop: true,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 basis-full md:basis-1/2">
                  <div className="p-2 md:p-4">
                    <Card className="h-full border border-muted bg-card/50 backdrop-blur-sm">
                      <CardContent className="p-4 md:p-6 flex flex-col h-full">
                        {/* Quote Icon */}
                        <div className="mb-3 md:mb-4">
                          <Quote className="w-6 h-6 md:w-8 md:h-8 text-primary/60" />
                        </div>

                        {/* Testimonial Text */}
                        <div className="flex-1 mb-4 md:mb-6">
                          <p className="text-sm md:text-base text-foreground/90 leading-relaxed italic">
                            "{testimonial.message}"
                          </p>
                        </div>

                        {/* Client Info */}
                        <div className="flex items-center gap-3 md:gap-4 mt-auto">
                          <Avatar className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                            <AvatarImage
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="object-cover blur-sm"
                            />
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs md:text-sm">
                              {testimonial.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-foreground text-sm md:text-base truncate blur-sm">
                              {testimonial.name}
                            </h4>
                            <p className="text-xs md:text-sm text-muted-foreground truncate">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mt-3 md:mt-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation */}
            <CarouselPrevious className="hidden md:flex -left-16 lg:-left-20 z-20 bg-background/90 backdrop-blur-sm border-2 border-primary/20 hover:bg-background hover:border-primary/40" />
            <CarouselNext className="hidden md:flex -right-16 lg:-right-20 z-20 bg-background/90 backdrop-blur-sm border-2 border-primary/20 hover:bg-background hover:border-primary/40" />
          </Carousel>
        </div>

        {/* Bottom Gray Horizontal Line */}
        <div className="w-full h-0.5 md:h-1 bg-gray-400 mt-8 md:mt-12"></div>
      </div>
    </section>
  );
}
