"use client";

import React, { useState } from 'react';
import Explainability from '@/components/Explainability';
import DeepResearchAgent from '@/components/DeepResearchAgent';
import TopMenu from '@/components/TopMenu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const [activeTab, setActiveTab] = useState("deep-research");

  return (
    <div className="h-screen bg-background text-foreground flex flex-col">
      <TopMenu name="Tom Keldenich" imageUrl="/images/profile.jpeg" />
      <main className="flex-1 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <div className="flex justify-center p-4">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="explainability">RAG Explainability</TabsTrigger>
              <TabsTrigger value="deep-research">Deep Research Agent</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="explainability" className="h-full">
            <Explainability />
          </TabsContent>
          <TabsContent value="deep-research" className="h-full">
            <DeepResearchAgent />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}