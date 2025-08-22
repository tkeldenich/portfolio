"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Search, Brain, FileText, CheckCircle, Clock, Users, Zap, Target, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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

interface ResearchTask {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    progress: number;
    findings: string[];
    sources: number;
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
    const [researchTasks, setResearchTasks] = useState<ResearchTask[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const prefillMessage: string = "What are the latest developments in quantum computing?";
    
    const dummyResponse: string = `Based on my comprehensive multi-agent research analysis, here are the latest developments in quantum computing:

**Quantum Hardware Breakthroughs:**
- IBM's 1000+ qubit Condor processor represents a major milestone in quantum scaling
- Google's error correction advances with their Willow chip showing significant progress
- IonQ's trapped-ion systems achieving 99.8% fidelity rates

**Algorithmic Innovations:**
- Quantum approximate optimization algorithms (QAOA) showing practical applications
- Variational quantum eigensolvers (VQE) advancing drug discovery research
- New quantum machine learning algorithms demonstrating quantum advantage

**Industry Applications:**
- Financial institutions implementing quantum risk analysis
- Pharmaceutical companies using quantum simulation for drug discovery
- Logistics companies exploring quantum optimization for supply chains

**Academic Progress:**
- MIT's breakthrough in quantum error correction codes
- Stanford's advances in quantum networking protocols
- Oxford's progress in room-temperature quantum computing

This research was conducted using a multi-agent system with 5 specialized researchers working in parallel, analyzing over 200 sources and synthesizing findings into this comprehensive report.`;

    // Research workflow data
    const researchPhases = [
        {
            id: 'planning',
            title: 'Clarification & Planning',
            description: 'Research brief generation and supervisor initialization',
            icon: Target,
            status: 'completed'
        },
        {
            id: 'execution',
            title: 'Research Execution',
            description: 'Parallel multi-agent research tasks',
            icon: Users,
            status: 'in-progress'
        },
        {
            id: 'synthesis',
            title: 'Synthesis & Reporting',
            description: 'Compression and final report generation',
            icon: FileText,
            status: 'pending'
        }
    ];

    const initialResearchTasks: ResearchTask[] = [
        {
            id: 'hardware',
            title: 'Quantum Hardware Advancements',
            description: 'Latest developments in quantum processors, qubits, and physical implementations',
            status: 'completed',
            progress: 100,
            findings: [
                'IBM Condor 1000+ qubit processor milestone',
                'Google Willow chip error correction advances',
                'IonQ trapped-ion 99.8% fidelity achievements'
            ],
            sources: 23
        },
        {
            id: 'algorithms',
            title: 'Algorithmic Breakthroughs',
            description: 'New quantum algorithms and computational methods',
            status: 'completed',
            progress: 100,
            findings: [
                'QAOA practical applications in optimization',
                'VQE advances in molecular simulation',
                'Quantum ML algorithms showing advantage'
            ],
            sources: 18
        },
        {
            id: 'applications',
            title: 'Industry Applications',
            description: 'Commercial and industrial quantum computing implementations',
            status: 'in-progress',
            progress: 75,
            findings: [
                'Financial quantum risk analysis adoption',
                'Pharmaceutical quantum drug discovery',
                'Logistics quantum optimization trials'
            ],
            sources: 31
        },
        {
            id: 'academic',
            title: 'Academic Research Progress',
            description: 'University and research institution breakthroughs',
            status: 'in-progress',
            progress: 60,
            findings: [
                'MIT quantum error correction advances',
                'Stanford quantum networking protocols',
                'Oxford room-temperature quantum progress'
            ],
            sources: 27
        },
        {
            id: 'future',
            title: 'Future Challenges & Roadmap',
            description: 'Upcoming challenges and development roadmap',
            status: 'pending',
            progress: 25,
            findings: [
                'Scalability challenges in quantum systems',
                'Error correction threshold requirements',
                'Commercial viability timeline projections'
            ],
            sources: 15
        }
    ];

    // Process details for the research workflow
    const processDetails = {
        clarification: {
            duration_ms: 1247.32,
            details: {
                user_query_analysis: "complex_research_topic",
                clarification_needed: false,
                research_scope: "comprehensive",
                focus_areas: 5,
            },
        },
        planning: {
            duration_ms: 2156.78,
            details: {
                research_brief_generated: true,
                supervisor_initialized: true,
                parallel_tasks: 5,
                estimated_duration: "15-20 minutes",
            },
        },
        execution: {
            duration_ms: 18432.45,
            details: {
                active_researchers: 5,
                total_searches: 127,
                sources_analyzed: 234,
                iterations_completed: 8,
            },
        },
        synthesis: {
            duration_ms: 3421.67,
            details: {
                findings_compressed: true,
                duplicates_removed: 47,
                citations_formatted: 89,
                final_report_generated: true,
            },
        },
    };

    const totalProcessingTime = Object.values(processDetails).reduce((sum, phase) => sum + phase.duration_ms, 0);

    const scrollToBottom = (): void => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, streamingText]);

    useEffect(() => {
        setResearchTasks(initialResearchTasks);
    }, []);

    const handleSend = async (): Promise<void> => {
        if (isLoading || isStreaming || hasMessageBeenSent) return;

        const userMessage: ChatMessage = { 
            type: 'user', 
            content: prefillMessage, 
            timestamp: new Date().toLocaleTimeString() 
        };
        setMessages((prev: ChatMessage[]) => [...prev, userMessage]);

        setIsLoading(true);
        setCurrentPhase(0);
        
        // Simulate research phases
        await new Promise<void>(resolve => setTimeout(resolve, 1500));
        setCurrentPhase(1);
        
        await new Promise<void>(resolve => setTimeout(resolve, 2000));
        setCurrentPhase(2);
        
        await new Promise<void>(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
        setIsStreaming(true);

        const botMessage: ChatMessage = { 
            type: 'bot', 
            content: '', 
            timestamp: new Date().toLocaleTimeString() 
        };
        setMessages((prev: ChatMessage[]) => [...prev, botMessage]);

        // Simulate streaming response
        let currentText = '';
        const words = dummyResponse.split(' ');
        
        for (let i = 0; i < words.length; i++) {
            currentText += (i > 0 ? ' ' : '') + words[i];
            setStreamingText(currentText);
            await new Promise<void>(resolve => setTimeout(resolve, 50));
        }

        setMessages((prev: ChatMessage[]) => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].content = currentText;
            return newMessages;
        });

        setStreamingText('');
        setIsStreaming(false);
        setHasMessageBeenSent(true);
    };

    const ResearchProcessDialog = () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button 
                    variant="outline" 
                    size="sm" 
                    className="ml-2 text-xs"
                    disabled={!hasMessageBeenSent}
                >
                    <Brain className="w-3 h-3 mr-1" />
                    View Research Process
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Search className="w-5 h-5" />
                        Deep Research Agent Process
                    </DialogTitle>
                </DialogHeader>
                
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="planning">Planning</TabsTrigger>
                        <TabsTrigger value="execution">Execution</TabsTrigger>
                        <TabsTrigger value="synthesis">Synthesis</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Multi-Agent Research Workflow</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {researchPhases.map((phase, index) => {
                                        const Icon = phase.icon;
                                        return (
                                            <Card key={phase.id} className="relative">
                                                <CardContent className="p-4">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div className={`p-2 rounded-full ${
                                                            phase.status === 'completed' ? 'bg-green-100 text-green-600' :
                                                            phase.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                                                            'bg-gray-100 text-gray-600'
                                                        }`}>
                                                            <Icon className="w-4 h-4" />
                                                        </div>
                                                        <Badge variant={
                                                            phase.status === 'completed' ? 'default' :
                                                            phase.status === 'in-progress' ? 'secondary' :
                                                            'outline'
                                                        }>
                                                            {phase.status}
                                                        </Badge>
                                                    </div>
                                                    <h3 className="font-semibold text-sm mb-1">{phase.title}</h3>
                                                    <p className="text-xs text-muted-foreground">{phase.description}</p>
                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                </div>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                                    <DetailItem label="Total Processing Time" value={`${(totalProcessingTime / 1000).toFixed(1)}s`} />
                                    <DetailItem label="Active Researchers" value={processDetails.execution.details.active_researchers} />
                                    <DetailItem label="Sources Analyzed" value={processDetails.execution.details.sources_analyzed} />
                                    <DetailItem label="Final Citations" value={processDetails.synthesis.details.citations_formatted} />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="planning" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Target className="w-5 h-5" />
                                    Phase 1: Clarification & Planning
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-sm">User Query Analysis</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <DetailItem label="Query Type" value={processDetails.clarification.details.user_query_analysis} />
                                            <DetailItem label="Clarification Needed" value={processDetails.clarification.details.clarification_needed} />
                                            <DetailItem label="Research Scope" value={processDetails.clarification.details.research_scope} />
                                            <DetailItem label="Focus Areas" value={processDetails.clarification.details.focus_areas} />
                                        </CardContent>
                                    </Card>
                                    
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-sm">Research Brief Generation</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <DetailItem label="Brief Generated" value={processDetails.planning.details.research_brief_generated} />
                                            <DetailItem label="Supervisor Initialized" value={processDetails.planning.details.supervisor_initialized} />
                                            <DetailItem label="Parallel Tasks" value={processDetails.planning.details.parallel_tasks} />
                                            <DetailItem label="Estimated Duration" value={processDetails.planning.details.estimated_duration} />
                                        </CardContent>
                                    </Card>
                                </div>
                                
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-sm">Supervisor Strategic Planning</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle className="text-xs flex items-center gap-2">
                                                        <Brain className="w-3 h-3" />
                                                        Think Tool Reflection
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="text-xs">
                                                    <div className="bg-muted p-3 rounded-lg space-y-2">
                                                        <p className="font-medium text-blue-600">🤔 Strategic Analysis:</p>
                                                        <p className="text-muted-foreground italic">"The quantum computing query requires comprehensive coverage across multiple domains. I should deploy specialized researchers for hardware, algorithms, applications, academic progress, and future challenges to ensure thorough analysis."</p>
                                                        
                                                        <p className="font-medium text-blue-600 mt-3">🎯 Delegation Strategy:</p>
                                                        <p className="text-muted-foreground italic">"Each researcher should focus on recent developments (12-18 months) with emphasis on peer-reviewed sources and industry announcements. Parallel execution will optimize research time while ensuring comprehensive coverage."</p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            
                                            <div className="bg-muted p-4 rounded-lg text-sm">
                                                <p className="font-medium mb-2">Generated Research Brief:</p>
                                                <p className="mb-4">Conduct comprehensive analysis of latest quantum computing developments across hardware, algorithms, applications, and academic research.</p>
                                                
                                                <p className="font-medium mb-2">Research Strategy:</p>
                                                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                                    <li>Deploy 5 specialized sub-researchers for parallel investigation</li>
                                                    <li>Focus on developments from the last 12-18 months</li>
                                                    <li>Prioritize peer-reviewed sources and industry announcements</li>
                                                    <li>Synthesize findings into structured comprehensive report</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="execution" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Users className="w-5 h-5" />
                                    Phase 2: Research Execution
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <DetailItem label="Active Researchers" value={processDetails.execution.details.active_researchers} />
                                    <DetailItem label="Total Searches" value={processDetails.execution.details.total_searches} />
                                    <DetailItem label="Sources Analyzed" value={processDetails.execution.details.sources_analyzed} />
                                    <DetailItem label="Iterations" value={processDetails.execution.details.iterations_completed} />
                                </div>

                                <Accordion type="single" collapsible className="w-full">
                                    {researchTasks.map((task) => (
                                        <AccordionItem key={task.id} value={task.id}>
                                            <AccordionTrigger className="hover:no-underline">
                                                <div className="flex items-center justify-between w-full mr-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-3 h-3 rounded-full ${
                                                            task.status === 'completed' ? 'bg-green-500' :
                                                            task.status === 'in-progress' ? 'bg-blue-500' :
                                                            'bg-gray-300'
                                                        }`} />
                                                        <span className="font-medium text-left">{task.title}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline" className="text-xs">
                                                            {task.sources} sources
                                                        </Badge>
                                                        <span className="text-sm text-muted-foreground">
                                                            {task.progress}%
                                                        </span>
                                                    </div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pt-4">
                                                <div className="space-y-4">
                                                    <p className="text-sm text-muted-foreground">{task.description}</p>
                                                    
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div 
                                                            className={`h-2 rounded-full transition-all duration-300 ${
                                                                task.status === 'completed' ? 'bg-green-500' :
                                                                task.status === 'in-progress' ? 'bg-blue-500' :
                                                                'bg-gray-400'
                                                            }`}
                                                            style={{ width: `${task.progress}%` }}
                                                        />
                                                    </div>
                                                    
                                                    <div>
                                                        <h4 className="font-medium text-sm mb-2">Key Findings:</h4>
                                                        <ul className="space-y-1">
                                                            {task.findings.map((finding, index) => (
                                                                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                                                                    <CheckCircle className="w-3 h-3 mt-0.5 text-green-500 flex-shrink-0" />
                                                                    {finding}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="synthesis" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <FileText className="w-5 h-5" />
                                    Phase 3: Synthesis & Reporting
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <DetailItem label="Findings Compressed" value={processDetails.synthesis.details.findings_compressed} />
                                    <DetailItem label="Duplicates Removed" value={processDetails.synthesis.details.duplicates_removed} />
                                    <DetailItem label="Citations Formatted" value={processDetails.synthesis.details.citations_formatted} />
                                    <DetailItem label="Report Generated" value={processDetails.synthesis.details.final_report_generated} />
                                </div>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-sm">Research Compression Process</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                                <span className="text-sm">Raw findings collected from 5 researchers</span>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                                <span className="text-sm">Duplicate information identified and removed</span>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                                <span className="text-sm">Sources verified and citations formatted</span>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                                <span className="text-sm">Final report synthesized with structured sections</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-sm">Final Report Structure</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="bg-muted p-4 rounded-lg text-sm space-y-2">
                                            <div className="font-medium">📋 Executive Summary</div>
                                            <div className="font-medium">🔧 Quantum Hardware Breakthroughs</div>
                                            <div className="font-medium">⚡ Algorithmic Innovations</div>
                                            <div className="font-medium">🏢 Industry Applications</div>
                                            <div className="font-medium">🎓 Academic Progress</div>
                                            <div className="font-medium">🔮 Future Challenges & Roadmap</div>
                                            <div className="font-medium">📚 References & Citations</div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );

    return (
        <div className="flex flex-col h-full bg-background">
            <div className="flex-1 overflow-auto p-4">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-4 mb-4">
                        {messages.map((message, index) => (
                            <div key={index} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {message.type === 'bot' && (
                                    <Avatar className="w-8 h-8 mt-1">
                                        <AvatarFallback className="bg-primary text-primary-foreground">
                                            <Bot className="w-4 h-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={`max-w-[80%] ${message.type === 'user' ? 'order-1' : ''}`}>
                                    <Card className={message.type === 'user' ? 'bg-primary text-primary-foreground' : ''}>
                                        <CardContent className="p-3">
                                            <div className="whitespace-pre-wrap text-sm">
                                                {message.content}
                                            </div>
                                        </CardContent>
                                        {message.type === 'bot' && (
                                            <CardFooter className="p-3 pt-0 flex items-center justify-between">
                                                <span className="text-xs text-muted-foreground">
                                                    {message.timestamp}
                                                </span>
                                                <ResearchProcessDialog />
                                            </CardFooter>
                                        )}
                                    </Card>
                                </div>
                                {message.type === 'user' && (
                                    <Avatar className="w-8 h-8 mt-1">
                                        <AvatarFallback>
                                            <User className="w-4 h-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}

                        {isStreaming && streamingText && (
                            <div className="flex gap-3 justify-start">
                                <Avatar className="w-8 h-8 mt-1">
                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                        <Bot className="w-4 h-4" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="max-w-[80%]">
                                    <Card>
                                        <CardContent className="p-3">
                                            <div className="whitespace-pre-wrap text-sm">
                                                {streamingText}
                                                <span className="animate-pulse">|</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        )}

                        {isLoading && (
                            <div className="flex gap-3 justify-start">
                                <Avatar className="w-8 h-8 mt-1">
                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                        <Bot className="w-4 h-4" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="max-w-[80%]">
                                    <Card>
                                        <CardContent className="p-3">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    {currentPhase >= 0 && (
                                                        <div className="flex items-center gap-1">
                                                            <Target className="w-3 h-3" />
                                                            <span className="text-xs">Planning</span>
                                                            {currentPhase > 0 && <CheckCircle className="w-3 h-3 text-green-500" />}
                                                        </div>
                                                    )}
                                                    {currentPhase >= 1 && (
                                                        <div className="flex items-center gap-1">
                                                            <Users className="w-3 h-3" />
                                                            <span className="text-xs">Researching</span>
                                                            {currentPhase > 1 && <CheckCircle className="w-3 h-3 text-green-500" />}
                                                        </div>
                                                    )}
                                                    {currentPhase >= 2 && (
                                                        <div className="flex items-center gap-1">
                                                            <FileText className="w-3 h-3" />
                                                            <span className="text-xs">Synthesizing</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex space-x-1">
                                                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                </div>
            </div>

            <div className="border-t bg-card p-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex gap-2">
                        <Input
                            value={hasMessageBeenSent ? '' : prefillMessage}
                            placeholder={hasMessageBeenSent ? "This is a demo - only one message allowed" : "Ask about quantum computing developments..."}
                            className="flex-1"
                            disabled={hasMessageBeenSent}
                            readOnly
                        />
                        <Button 
                            onClick={handleSend} 
                            disabled={isLoading || isStreaming || hasMessageBeenSent}
                            size="icon"
                        >
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>
                    {!hasMessageBeenSent && (
                        <p className="text-xs text-muted-foreground mt-2 text-center">
                            Click send to see the Deep Research Agent in action
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeepResearchAgent;

