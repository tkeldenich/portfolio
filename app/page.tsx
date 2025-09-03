"use client";

import React from 'react';
import PortfolioOverview from '@/components/PortfolioOverview';
import TopMenu from '@/components/TopMenu';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <TopMenu
        name="Tom Keldenich"
        imageUrl="/images/profile.webp"
      />
      <main className="flex-1 overflow-auto">
        <PortfolioOverview />
      </main>
      <Footer />
    </div>
  );
}