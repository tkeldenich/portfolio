"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';

export default function Welcome() {
  return (
    <div className="h-full bg-background text-foreground">
      {/* Hero Section */}
      <div className="h-full flex flex-col items-center justify-center px-4 py-16">
        {/* Profile Image */}
        <div className="mb-8">
          <Image
            src="/images/profile.jpeg"
            alt="Tom Keldenich"
            width={200}
            height={200}
            className="rounded-full"
            priority
          />
        </div>

        {/* Value Proposition */}
        <div className="text-center mb-12 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary/60 to-primary bg-clip-text text-transparent pb-1">
            LLM features to power your growth
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto">
            Transform your business with cutting-edge AI solutions
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button
            size="lg"
            className="text-lg px-8 py-3"
            onClick={() => window.open('https://calendly.com/tomkeldenich/30min', '_blank')}
          >
            Let's Talk
          </Button>
          <p className="text-sm text-muted-foreground">
            Schedule a 30-minute consultation
          </p>
        </div>
      </div>
    </div>
  );
}
