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
    //role: "Project Manager",
    //company: "Tech Solutions Inc.",
    image: "/images/clients/profile/alden.png",
    message: "Tom -- this is fantastic work -- well done ..!!!",
    rating: 5
  },
  {
    id: 2,
    name: "Xavier Perrotton",
    //role: "Lead Developer",
    //company: "Valeo",
    image: "/images/clients/profile/xavier.jpeg",
    message: "Hello Tom. It was a real pleasure to be able to collaborate together, thank you for your contributions to Valeo! Best wishes for the future, lots of success in your new projects!",
    rating: 5
  },
  {
    id: 3,
    name: "Stéphane Doinel",
    //role: "Product Manager",
    //company: "Innovation Labs",
    image: "/images/clients/profile/stephane.png",
    message: "It was really nice working with you these last few weeks, I think we made good progress on the different projects with good deployment prospects",
    rating: 5
  }
];

export default function ClientTestimonials() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What They Said About Our Collaboration
          </h2>
        </div>

        {/* Top Gray Horizontal Line */}
        <div className="w-full h-1 bg-gray-400 mb-12"></div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto">
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              align: "center",
              loop: true,
            }}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id} className="basis-1/2">
                  <div className="p-4">
                    <Card className="h-full border border-muted bg-card/50 backdrop-blur-sm">
                      <CardContent className="p-6 flex flex-col h-full">
                        {/* Quote Icon */}
                        <div className="mb-4">
                          <Quote className="w-8 h-8 text-primary/60" />
                        </div>

                        {/* Testimonial Text */}
                        <div className="flex-1 mb-6">
                          <p className="text-foreground/90 leading-relaxed italic">
                            "{testimonial.message}"
                          </p>
                        </div>

                        {/* Client Info */}
                        <div className="flex items-center gap-4 mt-auto">
                          <Avatar className="w-15 h-15">
                            <AvatarImage
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="object-cover blur-sm"
                            />
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                              {testimonial.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-bold text-foreground blur-sm">
                              {testimonial.name}
                            </h4>
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mt-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-yellow-400 text-yellow-400"
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
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Bottom Gray Horizontal Line */}
        <div className="w-full h-1 bg-gray-400 mt-12"></div>
      </div>
    </section>
  );
}
