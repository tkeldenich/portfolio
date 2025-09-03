"use client";

import React from 'react';
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

        {/* Row of Logos */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-4 mb-12">
          {clientLogos.map((client, index) => (
            <div
              key={index}
              className="flex items-center justify-center"
            >
              <Image
                src={client.src}
                alt={client.alt}
                width={225}
                height={112}
                className="object-contain filter grayscale"
                style={{ maxWidth: '225px', maxHeight: '112px' }}
              />
            </div>
          ))}
        </div>

        {/* Bottom Gray Horizontal Line */}
        <div className="w-full h-1 bg-gray-400"></div>
      </div>
    </section>
  );
}
