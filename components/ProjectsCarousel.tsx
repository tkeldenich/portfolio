"use client"

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
import { Badge } from "@/components/ui/badge";
import { Brain, Search } from "lucide-react";
import Explainability from './Explainability';
import DeepResearchAgent from './DeepResearchAgent';

const ProjectsCarousel: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const showcaseItems = [
    {
      title: "RAG with Explainability",
      description: "Interactive demonstration of Retrieval-Augmented Generation with full process transparency",
      icon: <Brain className="w-5 h-5" />,
      component: <Explainability />,
      color: "bg-blue-500",
    },
    {
      title: "Deep Research Agent",
      description: "Multi-agent research system that coordinates specialized agents for comprehensive analysis",
      icon: <Search className="w-5 h-5" />,
      component: <DeepResearchAgent />,
      color: "bg-purple-500",
    },
  ];

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
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
          Interactive Demo
        </h2>
      </div>

      {/* Carousel */}
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: false,
        }}
      >
        <CarouselContent>
          {showcaseItems.map((item, index) => (
            <CarouselItem key={index} className="basis-full">
                <Card className="border-0 shadow-none bg-transparent">
                  <CardContent className="p-0">
                    {/* Component Header */}
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        <div>
                          <Badge variant="secondary" className="text-sm">
                            {item.title}
                          </Badge>
                        </div>
                      </div>
                      {/* <p className="text-muted-foreground max-w-2xl mx-auto">
                        {item.description}
                      </p> */}
                    </div>

                    {/* Component */}
                    <div>
                      {item.component}
                    </div>
                  </CardContent>
                </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom Navigation */}
        <div className="flex items-center justify-center gap-4">
          <CarouselPrevious className="relative static translate-y-0 left-0" />
          <div className="flex gap-2">
            {Array.from({ length: count }, (_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index + 1 === current
                    ? 'bg-primary scale-110'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <CarouselNext className="relative static translate-y-0 left-0" />
        </div>
      </Carousel>
    </div>
  );
};

export default ProjectsCarousel;
