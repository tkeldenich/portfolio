"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const clientLogos = [
  {
    name: 'Banque de France',
    src: '/images/clients/banquedefrance.webp',
    alt: 'Banque de France logo'
  },
  {
    name: 'Valeo',
    src: '/images/clients/valeo.webp',
    alt: 'Valeo logo'
  },
  {
    name: 'Total Energies',
    src: '/images/clients/totalenergies.webp',
    alt: 'Total Energies logo'
  },
  {
    name: 'CustomGPT.ai',
    src: '/images/clients/customgptai.webp',
    alt: 'CustomGPT.ai logo'
  }
];

export default function ClientLogos() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === clientLogos.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground">
            Trusted By Top Brands Worldwide
          </h2>
        </div>

        {/* Top Gray Horizontal Line */}
        <div className="w-full h-1 bg-gray-400 mb-12"></div>

        {/* Desktop Grid Layout */}
        <div className="hidden md:flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-12 xl:gap-16 mb-12">
          {clientLogos.map((client, index) => (
            <div
              key={index}
              className="flex items-center justify-center min-w-0 flex-shrink-0"
            >
              <Image
                src={client.src}
                alt={client.alt}
                width={180}
                height={90}
                className="object-contain filter grayscale md:w-36 md:h-18 lg:w-44 lg:h-22 xl:w-56 xl:h-28"
              />
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden mb-12">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {clientLogos.map((client, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full flex justify-center items-center px-4"
                >
                  <Image
                    src={client.src}
                    alt={client.alt}
                    width={180}
                    height={90}
                    className="object-contain filter grayscale w-64 h-32 max-w-[320px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Gray Horizontal Line */}
        <div className="w-full h-1 bg-gray-400"></div>
      </div>
    </section>
  );
}
