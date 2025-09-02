"use client";

import React, { useState } from 'react';
import Explainability from '@/components/Explainability';
import DeepResearchAgent from '@/components/DeepResearchAgent';
import Welcome from '@/components/Welcome';
import TopMenu from '@/components/TopMenu';

export default function Home() {
  const [activeSection, setActiveSection] = useState("welcome");

  return (
    <div className="h-screen bg-background text-foreground flex flex-col">
      <TopMenu
        name="Tom Keldenich"
        imageUrl="/images/profile.jpeg"
        activeSection={activeSection}
        onNavigate={setActiveSection}
      />
      <main className="flex-1 overflow-auto">
        {activeSection === 'welcome' && <Welcome />}
        {activeSection === 'explainability' && <Explainability />}
        {activeSection === 'deep-research' && <DeepResearchAgent />}
      </main>
    </div>
  );
}