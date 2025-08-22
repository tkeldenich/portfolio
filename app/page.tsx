"use client";

import React, { useState } from 'react';
import Explainability from '@/components/Explainability';
import DeepResearch from '@/components/DeepResearch';
import TopMenu from '@/components/TopMenu'; // Import the new menu component

export default function Home() {
  return (
    <div className="h-screen bg-background text-foreground flex flex-col">
      <TopMenu name="Tom Keldenich" imageUrl="/images/profile.jpeg" />
      <main className="flex-1 overflow-auto">
        <Explainability />
      </main>
    </div>
  );
