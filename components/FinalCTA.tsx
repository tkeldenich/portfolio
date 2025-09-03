"use client";

import React from 'react';
import { Button } from "@/components/ui/button";

export default function FinalCTA() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* CTA Section */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Let's discuss how LLM & Agents can power your growth
          </p>

          {/* CTA Button - Same as in Welcome */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
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
    </section>
  );
}
