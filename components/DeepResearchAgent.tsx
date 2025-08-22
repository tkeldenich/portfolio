"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Search, FileText, BarChart, CheckCircle, Clock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface ChatMessage {
    type: 'user' | 'bot';
    content: string;
    timestamp: string;
}

interface ResearchPhase {
    id: string;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    status: 'pending' | 'active' | 'completed';
    description: string;
}

// Helper component to display formatted details
const DetailItem = ({ label, value }: { label: string; value: string | number | boolean }) => (
    <div className="flex justify-between items-center py-2 border-b border-border/50">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm font-mono text-foreground">{String(value)}</span>
    </div>
);

const DeepResearchAgent: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [streamingText, setStreamingText] = useState<string>('');
    const [isStreaming, setIsStreaming] = useState<boolean>(false);
    const [hasMessageBeenSent, setHasMessageBeenSent] = useState<boolean>(false);
    const [currentPhase, setCurrentPhase] = useState<number>(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const prefillMessage: string = "What are the latest developments in quantum computing and their potential impact on cybersecurity?";
    
    const researchPhases: ResearchPhase[] = [
        {
            id: 'planning',
            name: 'Planning',
            icon: Clock,
            status: 'pending',
            description: 'Analyzing research question and creating search strategy'
        },
        {
            id: 'searching',
            name: 'Searching',
            icon: Search,
            status: 'pending',
            description: 'Gathering information from multiple sources'
        },
        {
            id: 'analyzing',
            name: 'Analyzing',
            icon: BarChart,
            status: 'pending',
            description: 'Processing and synthesizing collected data'
        },
        {
            id: 'reporting',
            name: 'Reporting',
            icon: FileText,
            status: 'pending',
            description: 'Generating comprehensive research report'
        }
    ];

    const dummyResponse: string = `# Quantum Computing Developments and Cybersecurity Impact

## Executive Summary

Recent advances in quantum computing represent both unprecedented opportunities and significant cybersecurity challenges. Major breakthroughs in quantum error correction, fault-tolerant quantum systems, and quantum algorithms are accelerating the timeline for practical quantum advantage, particularly in cryptographic applications.

## Key Findings

### 1. Quantum Computing Milestones (2024-2025)
- **IBM's 1000+ qubit processors**: IBM's Condor and Heron processors have demonstrated significant improvements in quantum error rates and coherence times
- **Google's quantum error correction breakthrough**: Achieved below-threshold error correction with their Willow chip, marking a critical milestone toward fault-tolerant quantum computing
- **Microsoft's topological qubits**: Progress in developing more stable qubits using topological quantum computing approaches

### 2. Cryptographic Vulnerabilities
Current encryption methods face imminent threats:
- **RSA encryption**: Vulnerable to Shor's algorithm on sufficiently large quantum computers
- **Elliptic Curve Cryptography (ECC)**: Similarly at risk from quantum attacks
- **Timeline estimates**: NIST projects cryptographically relevant quantum computers within 10-15 years

### 3. Post-Quantum Cryptography (PQC) Response
The cybersecurity community is actively preparing:
- **NIST standardization**: Four post-quantum cryptographic algorithms standardized in 2024
- **Industry adoption**: Major tech companies implementing PQC in their systems
- **Hybrid approaches**: Combining classical and post-quantum methods for enhanced security

## Detailed Analysis

### Quantum Advantage in Cryptanalysis
Quantum computers excel at specific mathematical problems that underpin current cryptographic systems. The quantum Fourier transform, central to Shor's algorithm, can efficiently factor large integers and solve discrete logarithm problems - the foundation of RSA and ECC security.

### Current Quantum Computing Limitations
Despite progress, significant challenges remain:
- **Error rates**: Current quantum computers still have high error rates
- **Coherence time**: Quantum states are fragile and short-lived
- **Scalability**: Building systems with millions of qubits remains challenging

### Cybersecurity Implications
Organizations must prepare for the "Y2Q" (Years to Quantum) moment:
- **Data harvesting**: Adversaries may be collecting encrypted data for future quantum decryption
- **Infrastructure updates**: Critical systems need migration to quantum-resistant algorithms
- **Regulatory compliance**: New standards and regulations emerging globally

## Implications for Organizations

### Immediate Actions Required
1. **Crypto-agility**: Implement systems that can quickly switch cryptographic algorithms
2. **Risk assessment**: Identify and prioritize quantum-vulnerable systems
3. **PQC migration planning**: Develop roadmaps for post-quantum cryptography adoption

### Long-term Strategic Considerations
- **Quantum-safe architecture**: Design new systems with quantum threats in mind
- **Supply chain security**: Ensure vendors are quantum-ready
- **Workforce development**: Train cybersecurity teams on quantum threats and defenses

## Conclusion

The quantum computing revolution is accelerating, with significant implications for cybersecurity. While practical quantum computers capable of breaking current encryption are still years away, the time to prepare is now. Organizations that proactively adopt post-quantum cryptography and develop quantum-aware security strategies will be best positioned to navigate this technological transition safely.

The intersection of quantum computing and cybersecurity represents one of the most significant technological challenges of our time, requiring coordinated efforts across industry, government, and academia to ensure a secure quantum future.`;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, streamingText]);

    const simulateResearchPhases = async () => {
        const phases = [...researchPhases];
        
        for (let i = 0; i < phases.length; i++) {
            // Update current phase to active
            setCurrentPhase(i);
            
            // Simulate phase duration
            await new Promise(resolve => setTimeout(resolve, 1500));
        }
        
        // All phases completed
        setCurrentPhase(phases.length);
    };

    const streamText = async (text: string) => {
        setIsStreaming(true);
        setStreamingText('');
        
        const words = text.split(' ');
        for (let i = 0; i < words.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 50));
            setStreamingText(prev => prev + (i === 0 ? '' : ' ') + words[i]);
        }
        
        setIsStreaming(false);
        
        // Add the complete message to messages
        const botMessage: ChatMessage = {
            type: 'bot',
            content: text,
            timestamp: new Date().toLocaleTimeString()
        };
        
        setMessages(prev => [...prev, botMessage]);
        setStreamingText('');
    };

    const handleSendMessage = async () => {
        if (hasMessageBeenSent) return;
        
        setHasMessageBeenSent(true);
        setIsLoading(true);
        
        // Add user message
        const userMessage: ChatMessage = {
            type: 'user',
            content: prefillMessage,
            timestamp: new Date().toLocaleTimeString()
        };
        
        setMessages([userMessage]);
        
        // Start research phases simulation
        await simulateResearchPhases();
        
        // Start streaming the response
        setIsLoading(false);
        await streamText(dummyResponse);
    };

    const getPhaseStatus = (index: number): 'pending' | 'active' | 'completed' => {
        if (index < currentPhase) return 'completed';
        if (index === currentPhase && currentPhase < researchPhases.length) return 'active';
        return 'pending';
    };

    const ResearchBreakdownDialog = () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button 
                    variant="outline" 
                    size="sm" 
                    className="ml-2"
                    disabled={!hasMessageBeenSent || isLoading || isStreaming}
                >
                    <Info className="w-4 h-4 mr-1" />
                    Research Details
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Search className="w-5 h-5" />
                        Deep Research Analysis
                    </DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="methodology" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="methodology">Methodology</TabsTrigger>
                        <TabsTrigger value="sources">Sources</TabsTrigger>
                        <TabsTrigger value="timeline">Timeline</TabsTrigger>
                        <TabsTrigger value="metrics">Metrics</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="methodology" className="space-y-4">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Research Methodology</h3>
                            <div className="space-y-3">
                                {researchPhases.map((phase, index) => {
                                    const Icon = phase.icon;
                                    const status = getPhaseStatus(index);
                                    return (
                                        <div key={phase.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                                            <div className={`p-2 rounded-full ${
                                                status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                                status === 'active' ? 'bg-blue-500/20 text-blue-400' :
                                                'bg-muted text-muted-foreground'
                                            }`}>
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-medium">{phase.name}</h4>
                                                    <Badge variant={
                                                        status === 'completed' ? 'default' :
                                                        status === 'active' ? 'secondary' : 'outline'
                                                    }>
                                                        {status}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {phase.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </TabsContent>
                    
                    <TabsContent value="sources" className="space-y-4">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Sources & Citations</h3>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="source-1">
                                    <AccordionTrigger className="text-left">
                                        <div className="flex items-center justify-between w-full mr-4">
                                            <div>
                                                <div className="font-medium">IBM Quantum Network Research</div>
                                                <div className="text-sm text-muted-foreground">
                                                    IBM Research - Quantum Computing Division
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="secondary">High Relevance</Badge>
                                                <span className="text-sm text-muted-foreground">95%</span>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="p-3 pt-0">
                                        <div className="mt-2 p-3 bg-background/70 rounded text-sm space-y-2">
                                            <div className="font-medium text-muted-foreground">Key Excerpt:</div>
                                            <em className="italic">&quot;Our latest 1000+ qubit processors demonstrate significant improvements in quantum error rates, achieving coherence times exceeding 100 microseconds...&quot;</em>
                                        </div>
                                        <div className="mt-2 p-3 bg-background/70 rounded text-sm space-y-2">
                                            <div className="font-medium text-muted-foreground">Research Context:</div>
                                            <p>This source provides critical insights into IBM&apos;s quantum hardware advances, particularly their progress in error correction and qubit stability.</p>
                                        </div>
                                        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm border-t pt-3">
                                            <div><span className="font-medium text-muted-foreground">URL:</span> ibm.com/quantum</div>
                                            <div><span className="font-medium text-muted-foreground">Date:</span> 2024-12-15</div>
                                            <div><span className="font-medium text-muted-foreground">Type:</span> Research Paper</div>
                                            <div><span className="font-medium text-muted-foreground">Citations:</span> 247</div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                
                                <AccordionItem value="source-2">
                                    <AccordionTrigger className="text-left">
                                        <div className="flex items-center justify-between w-full mr-4">
                                            <div>
                                                <div className="font-medium">NIST Post-Quantum Cryptography Standards</div>
                                                <div className="text-sm text-muted-foreground">
                                                    National Institute of Standards and Technology
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="secondary">High Relevance</Badge>
                                                <span className="text-sm text-muted-foreground">92%</span>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="p-3 pt-0">
                                        <div className="mt-2 p-3 bg-background/70 rounded text-sm space-y-2">
                                            <div className="font-medium text-muted-foreground">Key Excerpt:</div>
                                            <em className="italic">&quot;The standardized post-quantum cryptographic algorithms provide security against both classical and quantum computer attacks...&quot;</em>
                                        </div>
                                        <div className="mt-2 p-3 bg-background/70 rounded text-sm space-y-2">
                                            <div className="font-medium text-muted-foreground">Research Context:</div>
                                            <p>Official NIST documentation on post-quantum cryptography standards, essential for understanding the cybersecurity response to quantum threats.</p>
                                        </div>
                                        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm border-t pt-3">
                                            <div><span className="font-medium text-muted-foreground">URL:</span> nist.gov/pqc</div>
                                            <div><span className="font-medium text-muted-foreground">Date:</span> 2024-08-13</div>
                                            <div><span className="font-medium text-muted-foreground">Type:</span> Standard</div>
                                            <div><span className="font-medium text-muted-foreground">Citations:</span> 1,523</div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                
                                <AccordionItem value="source-3">
                                    <AccordionTrigger className="text-left">
                                        <div className="flex items-center justify-between w-full mr-4">
                                            <div>
                                                <div className="font-medium">Google Quantum AI Research</div>
                                                <div className="text-sm text-muted-foreground">
                                                    Nature Quantum Information
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="secondary">Medium Relevance</Badge>
                                                <span className="text-sm text-muted-foreground">87%</span>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="p-3 pt-0">
                                        <div className="mt-2 p-3 bg-background/70 rounded text-sm space-y-2">
                                            <div className="font-medium text-muted-foreground">Key Excerpt:</div>
                                            <em className="italic">&quot;Willow chip demonstrates below-threshold quantum error correction, a critical milestone for fault-tolerant quantum computing...&quot;</em>
                                        </div>
                                        <div className="mt-2 p-3 bg-background/70 rounded text-sm space-y-2">
                                            <div className="font-medium text-muted-foreground">Research Context:</div>
                                            <p>Google&apos;s breakthrough in quantum error correction represents a significant step toward practical quantum computing applications.</p>
                                        </div>
                                        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm border-t pt-3">
                                            <div><span className="font-medium text-muted-foreground">URL:</span> nature.com/articles</div>
                                            <div><span className="font-medium text-muted-foreground">Date:</span> 2024-12-09</div>
                                            <div><span className="font-medium text-muted-foreground">Type:</span> Journal Article</div>
                                            <div><span className="font-medium text-muted-foreground">Citations:</span> 89</div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </TabsContent>
                    
                    <TabsContent value="timeline" className="space-y-4">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Research Timeline</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div className="flex-1">
                                        <div className="font-medium">Planning Phase</div>
                                        <div className="text-sm text-muted-foreground">Duration: 2.3 seconds</div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                            Query analysis, search strategy formulation
                                        </div>
                                    </div>
                                    <Badge variant="outline">Completed</Badge>
                                </div>
                                
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div className="flex-1">
                                        <div className="font-medium">Web Search Phase</div>
                                        <div className="text-sm text-muted-foreground">Duration: 4.7 seconds</div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                            15 sources searched, 8 relevant sources identified
                                        </div>
                                    </div>
                                    <Badge variant="outline">Completed</Badge>
                                </div>
                                
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div className="flex-1">
                                        <div className="font-medium">Analysis Phase</div>
                                        <div className="text-sm text-muted-foreground">Duration: 6.1 seconds</div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                            Content synthesis, fact verification, citation processing
                                        </div>
                                    </div>
                                    <Badge variant="outline">Completed</Badge>
                                </div>
                                
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div className="flex-1">
                                        <div className="font-medium">Report Generation</div>
                                        <div className="text-sm text-muted-foreground">Duration: 3.2 seconds</div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                            Structured report compilation, quality review
                                        </div>
                                    </div>
                                    <Badge variant="outline">Completed</Badge>
                                </div>
                            </div>
                            
                            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">Total Research Time</span>
                                    <span className="font-mono text-lg">16.3 seconds</span>
                                </div>
                                <div className="text-sm text-muted-foreground mt-1">
                                    Processed 8 sources • Generated 2,847 words • 98.7% accuracy
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    
                    <TabsContent value="metrics" className="space-y-4">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Quality Metrics</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Source Reliability</span>
                                            <span className="text-2xl font-bold text-green-500">94%</span>
                                        </div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                            Based on domain authority and citation count
                                        </div>
                                    </CardContent>
                                </Card>
                                
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Content Accuracy</span>
                                            <span className="text-2xl font-bold text-green-500">98.7%</span>
                                        </div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                            Fact-checking against verified sources
                                        </div>
                                    </CardContent>
                                </Card>
                                
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Coverage Depth</span>
                                            <span className="text-2xl font-bold text-blue-500">92%</span>
                                        </div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                            Topic comprehensiveness score
                                        </div>
                                    </CardContent>
                                </Card>
                                
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Citation Quality</span>
                                            <span className="text-2xl font-bold text-green-500">96%</span>
                                        </div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                            Peer-reviewed and authoritative sources
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            
                            <div className="space-y-3">
                                <h4 className="font-medium">Detailed Breakdown</h4>
                                <div className="space-y-2">
                                    <DetailItem label="Sources Analyzed" value={15} />
                                    <DetailItem label="Relevant Sources Used" value={8} />
                                    <DetailItem label="Academic Papers" value={5} />
                                    <DetailItem label="Industry Reports" value={2} />
                                    <DetailItem label="Government Publications" value={1} />
                                    <DetailItem label="Average Publication Date" value="2024-10-15" />
                                    <DetailItem label="Cross-references Verified" value={23} />
                                    <DetailItem label="Fact-check Confidence" value="High" />
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );

    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto p-4">
            <Card className="flex-1 flex flex-col">
                <CardContent className="flex-1 p-6 overflow-auto">
                    <div className="space-y-4">
                        {/* Research Phases Progress */}
                        {hasMessageBeenSent && (
                            <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                                <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                                    <Search className="w-4 h-4" />
                                    Research Progress
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {researchPhases.map((phase, index) => {
                                        const Icon = phase.icon;
                                        const status = getPhaseStatus(index);
                                        return (
                                            <div key={phase.id} className="flex items-center gap-2">
                                                <div className={`p-1.5 rounded-full ${
                                                    status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                                    status === 'active' ? 'bg-blue-500/20 text-blue-400 animate-pulse' :
                                                    'bg-muted text-muted-foreground'
                                                }`}>
                                                    {status === 'completed' ? (
                                                        <CheckCircle className="w-3 h-3" />
                                                    ) : (
                                                        <Icon className="w-3 h-3" />
                                                    )}
                                                </div>
                                                <span className={`text-xs font-medium ${
                                                    status === 'completed' ? 'text-green-400' :
                                                    status === 'active' ? 'text-blue-400' :
                                                    'text-muted-foreground'
                                                }`}>
                                                    {phase.name}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Messages */}
                        {messages.map((message, index) => (
                            <div key={index} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {message.type === 'bot' && (
                                    <Avatar className="w-8 h-8 bg-primary">
                                        <AvatarFallback>
                                            <Bot className="w-4 h-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={`max-w-[80%] rounded-lg p-3 ${
                                    message.type === 'user' 
                                        ? 'bg-primary text-primary-foreground ml-12' 
                                        : 'bg-muted'
                                }`}>
                                    <div className="prose prose-sm dark:prose-invert max-w-none">
                                        {message.type === 'bot' ? (
                                            <div dangerouslySetInnerHTML={{ 
                                                __html: message.content
                                                    .replace(/^# /gm, '<h1 class="text-lg font-bold mb-2">')
                                                    .replace(/^## /gm, '<h2 class="text-base font-semibold mb-2 mt-4">')
                                                    .replace(/^### /gm, '<h3 class="text-sm font-medium mb-1 mt-3">')
                                                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                                                    .replace(/\n\n/g, '</p><p class="mb-2">')
                                                    .replace(/^(?!<h|<p)(.+)$/gm, '<p class="mb-2">$1</p>')
                                                    .replace(/- \*\*(.*?)\*\*:/g, '<li><strong>$1</strong>:')
                                                    .replace(/^- /gm, '<li>')
                                                    .replace(/(<li>.*?(?=<li>|$))/gs, '<ul class="list-disc list-inside mb-2 space-y-1">$1</ul>')
                                                    .replace(/<\/li>/g, '</li>')
                                            }} />
                                        ) : (
                                            message.content
                                        )}
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-2 flex items-center justify-between">
                                        <span>{message.timestamp}</span>
                                        {message.type === 'bot' && (
                                            <ResearchBreakdownDialog />
                                        )}
                                    </div>
                                </div>
                                {message.type === 'user' && (
                                    <Avatar className="w-8 h-8 bg-secondary">
                                        <AvatarFallback>
                                            <User className="w-4 h-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}

                        {/* Streaming message */}
                        {isStreaming && (
                            <div className="flex gap-3 justify-start">
                                <Avatar className="w-8 h-8 bg-primary">
                                    <AvatarFallback>
                                        <Bot className="w-4 h-4" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                                    <div className="prose prose-sm dark:prose-invert max-w-none">
                                        <div dangerouslySetInnerHTML={{ 
                                            __html: streamingText
                                                .replace(/^# /gm, '<h1 class="text-lg font-bold mb-2">')
                                                .replace(/^## /gm, '<h2 class="text-base font-semibold mb-2 mt-4">')
                                                .replace(/^### /gm, '<h3 class="text-sm font-medium mb-1 mt-3">')
                                                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                                                .replace(/\n\n/g, '</p><p class="mb-2">')
                                                .replace(/^(?!<h|<p)(.+)$/gm, '<p class="mb-2">$1</p>')
                                                .replace(/- \*\*(.*?)\*\*:/g, '<li><strong>$1</strong>:')
                                                .replace(/^- /gm, '<li>')
                                                .replace(/(<li>.*?(?=<li>|$))/gs, '<ul class="list-disc list-inside mb-2 space-y-1">$1</ul>')
                                                .replace(/<\/li>/g, '</li>')
                                        }} />
                                        <span className="animate-pulse">|</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Loading indicator */}
                        {isLoading && (
                            <div className="flex gap-3 justify-start">
                                <Avatar className="w-8 h-8 bg-primary">
                                    <AvatarFallback>
                                        <Bot className="w-4 h-4" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="rounded-lg p-3 bg-muted">
                                    <div className="flex items-center gap-2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                                        <span className="text-sm text-muted-foreground">
                                            {currentPhase < researchPhases.length 
                                                ? `${researchPhases[currentPhase]?.name}...` 
                                                : 'Generating report...'
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                </CardContent>
                
                <CardFooter className="p-4 border-t">
                    <div className="flex w-full gap-2">
                        <Input
                            value={prefillMessage}
                            readOnly
                            placeholder="Ask a research question..."
                            className="flex-1"
                        />
                        <Button 
                            onClick={handleSendMessage}
                            disabled={hasMessageBeenSent || isLoading}
                            size="icon"
                        >
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default DeepResearchAgent;






