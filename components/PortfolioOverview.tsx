"use client";

import React from 'react';
import Welcome from './Welcome';
import ClientLogos from './ClientLogos';
import ProjectsCarousel from './ProjectsCarousel';
import ClientTestimonials from './ClientTestimonials';
import FinalCTA from './FinalCTA';

export default function PortfolioOverview() {
  return (
    <div className="bg-background text-foreground">
      {/* Welcome Section */}
      <section className="h-[91vh] w-full">
        <Welcome />
      </section>

      {/* Client Logos Section */}
      <ClientLogos />

      {/* AI Showcase Carousel Section */}
      <section className="h-[91vh] w-full py-16">
        <ProjectsCarousel />
      </section>

      {/* Client Testimonials Section */}
      <section className="md:h-[91vh] w-full pt-24 pb-8 md:py-24">
        <ClientTestimonials />
      </section>

      {/* Final CTA Section */}
      <section className="h-[55vh] w-full py-16">
        <FinalCTA />
      </section>
    </div>
  );
}
