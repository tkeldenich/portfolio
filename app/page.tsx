"use client";

import React, { useState } from 'react';
import Explainability from '@/components/Explainability';
import DeepResearch from '@/components/DeepResearch';
import TopMenu from '@/components/TopMenu'; // Import the new menu component

export default function Home() {
  const [activeTab, setActiveTab] = useState<'explainability' | 'deepresearch'>('explainability');

  const handleTabChange = (tab: 'explainability' | 'deepresearch') => {
    setActiveTab(tab);
  };

  return (
    <div className="h-screen bg-background text-foreground flex flex-col">
      <TopMenu 
        name="Tom Keldenich" 
        imageUrl="/images/profile.jpeg"
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <main className="flex-1 overflow-auto">
        {activeTab === 'explainability' ? <Explainability /> : <DeepResearch />}
      </main>
    </div>
  );

