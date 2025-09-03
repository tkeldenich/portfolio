"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Welcome() {
  return (
    <div className="h-full text-foreground">
      {/* Hero Section */}
      <div className="h-full flex flex-col items-center justify-center px-4 py-16">
        {/* Profile Avatar */}
        <div className="mb-8">
          <Avatar className="w-50 h-50">
            <AvatarImage
              src="/images/profile.webp"
              alt="Tom Keldenich"
            />
            <AvatarFallback className="bg-primary/10 text-primary font-bold text-3xl">
              TK
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Value Proposition */}
        <div className="text-center mb-12 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
            LLM & Agents to Power Your Growth
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
            Let&apos;s Talk
          </Button>
          <p className="text-sm text-muted-foreground">
            Schedule a 30-minute consultation
          </p>
        </div>
      </div>
    </div>
  );
}
