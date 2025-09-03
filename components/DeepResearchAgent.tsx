"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Search, Brain, Users, Clock, Lightbulb, Target, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Timeline, TimelineItem, TimelineDot, TimelineContent, TimelineHeading, TimelineLine } from '@/components/ui/timeline';

interface ChatMessage {
    type: 'user' | 'bot';
    content: string;
    timestamp: string;
}

interface WorkflowStep {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    status: 'pending' | 'active' | 'completed';
    duration?: string;
    details?: string[];
    progressMessage?: string;
}

// Helper functions for context-aware progress messages
const getInitialMessage = (stepId: string): string => {
    const messages: Record<string, string> = {
        "clarification": "Assessing query complexity and identifying quantum computing focus areas...",
        "planning": "Designing comprehensive research strategy for quantum computing developments...",
        "delegation": "Coordinating specialized research agents for parallel investigation...",
        "research": "Deploying research agents to gather latest quantum computing breakthroughs...",
        "synthesis": "Consolidating findings from multiple research streams...",

    };
    return messages[stepId] || "Initializing step...";
};

const getProgressMessages = (stepId: string): string[] => {
    const messageSets: Record<string, string[]> = {
        "clarification": [
            "Evaluating query: 'latest developments in quantum computing'...",
            "Identifying key areas: hardware, algorithms, applications, challenges...",
            "Determining research scope and depth requirements...",
            "Prioritizing most relevant quantum computing advancements..."
        ],
        "planning": [
            "Creating research framework for quantum computing analysis...",
            "Defining search parameters for recent breakthroughs (2023-2025)...",
            "Mapping out investigation areas: IBM, Google, IonQ, academic research...",
            "Establishing quality criteria for breakthrough identification..."
        ],
        "delegation": [
            "Spawning Hardware Research Agent for quantum processor developments...",
            "Creating Algorithm Research Agent for quantum computing methods...",
            "Deploying Industry Research Agent for commercial applications...",
            "Activating Academic Research Agent for theoretical advancements...",
            "Coordinating Challenge Analysis Agent for scalability issues..."
        ],
        "research": [
            "Hardware Agent: Analyzing IBM Eagle 127-qubit processor specifications...",
            "Algorithm Agent: Investigating VQE applications in molecular simulation...",
            "Industry Agent: Tracking IonQ's 32-qubit trapped-ion system progress...",
            "Academic Agent: Reviewing recent quantum supremacy demonstrations...",
            "Cross-referencing findings with arXiv preprints and conference papers..."
        ],
        "synthesis": [
            "Merging hardware breakthroughs from different quantum platforms...",
            "Correlating algorithmic progress with practical applications...",
            "Identifying industry trends and investment patterns...",
            "Evaluating timeline predictions for fault-tolerant quantum computing...",
            "Eliminating redundant findings and prioritizing key developments..."
        ],

    };
    return messageSets[stepId] || ["Processing...", "Analyzing...", "Finalizing..."];
};

const getCompletionMessage = (stepId: string): string => {
    const messages: Record<string, string> = {
        "clarification": "Query analysis complete - focusing on hardware, algorithms, and industry developments",
        "planning": "Research strategy established - targeting 2023-2025 quantum computing breakthroughs",
        "delegation": "5 specialized research agents deployed for parallel quantum computing investigation",
        "research": "Comprehensive data collection complete - gathered latest findings from all major quantum platforms",
        "synthesis": "Knowledge consolidation complete - identified 12 key quantum computing developments",

    };
    return messages[stepId] || "Step completed successfully";
};

const DeepResearchAgent: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [streamingText, setStreamingText] = useState<string>('');
    const [isStreaming, setIsStreaming] = useState<boolean>(false);
    const [hasMessageBeenSent, setHasMessageBeenSent] = useState<boolean>(false);
    const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([]);
    const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
    const [animatedSteps, setAnimatedSteps] = useState<Set<string>>(new Set());
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    const prefillMessage: string = "What are the latest developments in quantum computing?";

    const dummyResponse: string = `# Comprehensive Analysis: Latest Developments in Quantum Computing

## Executive Summary
Based on our multi-agent research across hardware, algorithms, industry developments, and academic breakthroughs, quantum computing has reached critical milestones in 2024-2025. This analysis covers 12 major developments identified across five specialized research streams.

## Hardware Advancements & Breakthroughs

### IBM Quantum Systems Evolution
- **Eagle Processor Series**: Successfully deployed 127-qubit processors with Eagle r3 demonstrating 99.4% 2-qubit gate fidelity
- **Quantum Volume Achievement**: Reached quantum volume of 1,024, enabling complex algorithm simulations
- **Cryogenic Control Advances**: New dilution refrigerator technology achieving 4.2mK temperatures with improved thermal stability

### Google Quantum AI Progress
- **Willow Processor**: 105-qubit device with enhanced error correction capabilities
- **Quantum Supremacy Validation**: Confirmed Sycamore processor's 2019 supremacy claims through independent verification
- **Error Correction Milestones**: Demonstrated logical qubits with 800× improvement in error rates

### IonQ & Alternative Platforms
- **Ion Trap Technology**: 32-qubit Forte system with 99.5% fidelity and 1,000x improvement in gate times
- **Photonic Quantum Computing**: Xanadu's 216-qubit X16 processor showing progress in boson sampling
- **Neutral Atom Systems**: ColdQuanta's 256-qubit system achieving 99.9% single-qubit fidelity

## Algorithmic & Software Innovations

### Variational Quantum Algorithms
- **VQE Applications**: Successfully applied to molecular simulations for pharmaceuticals, including exact ground state calculations for small molecules
- **QAOA Optimization**: Demonstrated quadratic speedup for portfolio optimization and routing problems
- **Quantum Machine Learning**: New hybrid classical-quantum algorithms showing promise in pattern recognition

### Error Correction & Fault Tolerance
- **Surface Code Implementations**: Google's logical qubit demonstrations with reduced error rates
- **Concatenated Codes**: IBM's implementation of Steane codes achieving fault-tolerant operations
- **Error Mitigation Techniques**: Advanced readout error correction and dynamical decoupling methods

## Industry Ecosystem & Commercial Applications

### Cloud Quantum Computing
- **IBM Quantum Network**: 300+ organizations accessing quantum cloud services with Qiskit Runtime
- **Azure Quantum**: Integration with IonQ and Quantinuum systems for enterprise applications
- **Google Cloud Quantum**: Early access program for quantum machine learning workloads

### Startup Innovation Landscape
- **Quantinuum**: 32-qubit H1 processor with integrated error correction
- **Rigetti Computing**: 84-qubit Aspen-M-2 system with improved gate fidelities
- **Oxford Quantum Circuits**: 32-qubit IronBridge system with enhanced thermal management

## Research & Academic Breakthroughs

### Theoretical Advances
- **Quantum Advantage Demonstrations**: Clear separations achieved in random circuit sampling
- **Quantum Chemistry**: Accurate simulations of complex molecules including catalysts and materials
- **Cryptography Research**: Post-quantum cryptography implementations on current quantum devices

### International Research Efforts
- **European Quantum Flagship**: €1B+ investment across 89 projects, focusing on quantum communication and sensing
- **Chinese Quantum Developments**: Jiuzhang 2.0 photonic quantum computer with 113 detected photons
- **Canadian Quantum Strategy**: $360M investment in quantum materials and algorithm development

## Technical Challenges & Mitigation Strategies

### Error Correction Challenges
- **Coherence Time Limitations**: Current systems maintain quantum states for milliseconds
- **Gate Error Rates**: Despite improvements, 99.9%+ fidelity still required for large-scale applications
- **Scalability Barriers**: Engineering challenges in scaling to millions of qubits

### Infrastructure & Cost Considerations
- **Cryogenic Requirements**: Maintaining ultra-low temperatures across large-scale systems
- **Material Science**: Developing new quantum-compatible materials with reduced noise
- **Power Consumption**: Managing the extreme energy requirements of quantum operations

## Market Analysis & Investment Trends

### Funding Landscape
- **Venture Capital**: $3.2B+ invested in quantum startups in 2024
- **Government Programs**: US, EU, and Asian governments committing $10B+ to quantum research
- **Corporate R&D**: Tech giants investing $2B+ annually in quantum capabilities

### Commercial Opportunities
- **Financial Modeling**: Quantum Monte Carlo for portfolio risk analysis
- **Drug Discovery**: Molecular simulation for accelerated pharmaceutical development
- **Logistics Optimization**: Route optimization for supply chain management

## Future Roadmap & Timeline Predictions

### Near-term (1-3 years)
- **NISQ Applications**: Continued growth in optimization and simulation applications
- **Hybrid Computing**: Increased adoption of quantum-classical hybrid algorithms
- **Cloud Access**: Democratization through improved cloud quantum services

### Medium-term (3-7 years)
- **Fault-tolerant Computing**: First practical demonstrations of error-corrected quantum computers
- **Algorithm Scaling**: Development of algorithms suitable for early fault-tolerant systems
- **Industry Integration**: Quantum computing integrated into existing data center infrastructure

### Long-term (7-15 years)
- **Universal Quantum Computing**: Full-scale quantum computers for broad computational problems
- **Quantum Materials**: Discovery of new materials enabled by quantum simulation
- **Quantum Communication**: Global quantum networks for secure communication

## Recommendations

### For Researchers
- Focus on algorithm development that can leverage near-term quantum hardware
- Invest in quantum error correction and fault-tolerant computing research
- Develop hybrid classical-quantum approaches for practical applications

### For Industry
- Begin quantum readiness assessments for computational workflows
- Invest in quantum talent development and training programs
- Explore partnerships with quantum hardware and software providers

### For Policymakers
- Continue support for fundamental quantum research and infrastructure development
- Develop standards for quantum computing security and interoperability
- Foster international collaboration in quantum technology development

---

*This analysis was generated through coordinated research by 5 specialized agents covering hardware, algorithms, industry developments, academic research, and market trends. All findings are based on peer-reviewed publications and verified industry announcements from 2023-2025.*`;

    // Initialize workflow steps
    const initialWorkflowSteps: WorkflowStep[] = [
        {
            id: "clarification",
            title: "Clarification",
            description: "System might ask for specific aspects (hardware, algorithms, applications)",
            icon: <Lightbulb size={20} className="text-foreground" />,
            status: "pending",
            duration: "4.9s"
        },
        {
            id: "planning",
            title: "Planning",
            description: "Creates research brief focusing on recent breakthroughs and key developments",
            icon: <Target size={20} className="text-foreground" />,
            status: "pending",
            duration: "9.1s"
        },
        {
            id: "delegation",
            title: "Delegation",
            description: "Supervisor creates 3-5 parallel research tasks",
            icon: <Users size={20} className="text-foreground" />,
            status: "pending",
            duration: "6.8s",
        },
        {
            id: "research",
            title: "Research",
            description: "Each sub-researcher conducts focused searches using configured tools",
            icon: <Search size={20} className="text-foreground" />,
            status: "pending",
            duration: "8.5s"
        },
        {
            id: "synthesis",
            title: "Synthesis",
            description: "Individual findings are compressed and deduplicated",
            icon: <BarChart3 size={20} className="text-foreground" />,
            status: "pending",
            duration: "5.8s"
        },

    ];

    // Initialize workflow steps on component mount
    useEffect(() => {
        setWorkflowSteps(initialWorkflowSteps);
    }, []);

    // Track animated steps when currentStepIndex changes
    useEffect(() => {
        if (currentStepIndex >= 0 && currentStepIndex < workflowSteps.length) {
            const currentStepId = workflowSteps[currentStepIndex].id;
            setAnimatedSteps(prev => new Set([...prev, currentStepId]));
        }
    }, [currentStepIndex, workflowSteps]);

    const scrollToBottom = (): void => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        // Only scroll if there are messages or streaming text is present
        if (messages.length > 0 || streamingText.trim().length > 0) {
            scrollToBottom();
        }
    }, [messages, streamingText]);

    const handleSend = async (): Promise<void> => {
        if (isLoading || isStreaming || hasMessageBeenSent) return;

        const userMessage: ChatMessage = { type: 'user', content: prefillMessage, timestamp: new Date().toLocaleTimeString() };
        setMessages((prev: ChatMessage[]) => [...prev, userMessage]);

        setIsLoading(true);

        // Reset workflow steps to initial state
        setWorkflowSteps(initialWorkflowSteps.map(step => ({ ...step, status: 'pending' })));
        setCurrentStepIndex(-1);
        setAnimatedSteps(new Set());

        // Process each workflow step progressively
        for (let i = 0; i < initialWorkflowSteps.length; i++) {
            setCurrentStepIndex(i);

            // Update step status to active and set initial progress message
            setWorkflowSteps(prev => prev.map((step, idx) =>
                idx === i ? { ...step, status: 'active', progressMessage: getInitialMessage(step.id) } : step
            ));

            // Simulate progress updates during the step with context-aware messages
            const duration = parseFloat(initialWorkflowSteps[i].duration?.replace('s', '') || '1') * 1000;
            const progressUpdates = getProgressMessages(initialWorkflowSteps[i].id);

            // Update progress messages at intervals
            const updateInterval = duration / (progressUpdates.length);
            for (let j = 0; j < progressUpdates.length; j++) {
                setTimeout(() => {
                    setWorkflowSteps(prev => prev.map((step, idx) =>
                        idx === i && step.status === 'active' ? { ...step, progressMessage: progressUpdates[j] } : step
                    ));
                }, j * updateInterval);
            }

            // Wait for the step duration
            await new Promise<void>(resolve => setTimeout(resolve, duration));

            // Mark step as completed with final message
            setWorkflowSteps(prev => prev.map((step, idx) =>
                idx === i ? {
                    ...step,
                    status: 'completed',
                    progressMessage: getCompletionMessage(step.id)
                } : step
            ));
        }

        setIsLoading(false);

        const botMessage: ChatMessage = { type: 'bot', content: dummyResponse, timestamp: new Date().toLocaleTimeString() };
        setMessages((prev: ChatMessage[]) => [...prev, botMessage]);
        setHasMessageBeenSent(true);
    };

    // Component to display workflow steps using Timeline components
    const WorkflowStepsDisplay = () => {
        // Only show steps up to the current step index (sequential reveal)
        const visibleSteps = workflowSteps.slice(0, currentStepIndex + 1);

        if (visibleSteps.length === 0) return null;

        return (
            <div className="my-4 ml-12 max-w-2xl">
                <Timeline positions="left">
                    {visibleSteps.map((step, index) => {
                        // Map workflow step status to timeline item status (only 'done' or 'default')
                        const itemStatus = step.status === 'completed' ? 'done' : 'default';
                        // Map workflow step status to timeline dot status
                        const dotStatus = step.status === 'pending' ? 'default'
                                         : step.status === 'active' ? 'custom'
                                         : 'done';

                        // Only animate steps that haven't been animated before
                        const shouldAnimate = !animatedSteps.has(step.id);
                        const animationClass = shouldAnimate ? "animate-in fade-in-0 slide-in-from-bottom-2 duration-500" : "";

                        return (
                            <TimelineItem
                                key={step.id}
                                status={itemStatus}
                                className={animationClass}
                            >
                                <TimelineDot
                                    status={dotStatus}
                                    customIcon={step.status === 'active' ? <Clock className="size-4 animate-pulse text-primary" /> : step.icon}
                                    className={step.status === 'active' ? 'border-transparent' : ''}
                                />
                                {index < visibleSteps.length - 1 && <TimelineLine done={step.status === 'completed'} />}
                                <TimelineHeading className="text-foreground flex items-center gap-2">
                                    {step.title}
                                </TimelineHeading>
                                <TimelineContent className="text-muted-foreground">
                                    <div className="text-sm">
                                        {step.progressMessage || step.description}
                                        {step.details && step.details.length > 0 && step.status === 'completed' && (
                                            <ul className="mt-2 ml-4 list-disc list-inside text-xs">
                                                {step.details.map((detail, idx) => (
                                                    <li key={idx}>{detail}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </TimelineContent>
                            </TimelineItem>
                        );
                    })}
                </Timeline>
            </div>
        );
    };

    return (
        <div className="h-full bg-background text-foreground flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-3xl">
                    <Card className="h-full bg-background border">
                        <CardContent className="p-3 h-full flex flex-col h-[65vh]">
                            <div ref={messagesContainerRef} className={`flex-1 mb-3 space-y-2 pr-2 ${messages.length === 0 ? 'overflow-y-hidden' : 'overflow-y-auto'}`}>
                                {messages.length === 0 && (
                                    <div className="flex items-center justify-center h-full">
                                        <div className="text-center">
                                            <h2 className="text-xl font-medium text-muted-foreground">
                                            Click the send button to get an answer
                                            {/* Click send to explore quantum computing developments */}
                                            </h2>
                                        </div>
                                    </div>
                                )}

                                {messages.map((message: ChatMessage, index: number) => (
                                    <div key={index}>
                                        <div
                                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`flex items-start gap-2 max-w-2xl ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                                                <Avatar className="w-8 h-8">
                                                    <AvatarFallback>
                                                        {message.type === 'user' ? <User size={16} /> : <Brain size={16} />}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <Card className={`${message.type === 'user' ? 'bg-secondary border' : 'bg-background border'}`}>
                                                    <CardContent>
                                                        <div className={`text-base whitespace-pre-wrap`}>
                                                            {message.type === 'bot' && index === messages.length - 1 && isStreaming
                                                                ? streamingText
                                                                : message.content}
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </div>

                                        {/* Show workflow steps after user message */}
                                        {message.type === 'user' && <WorkflowStepsDisplay />}
                                    </div>
                                ))}



                                <div ref={messagesEndRef} />
                            </div>

                            <div className="flex gap-2 items-center ml-10 mr-1">
                                <div className="flex-1 relative">
                                    <Input
                                        value={isLoading || isStreaming || hasMessageBeenSent ? '' : prefillMessage}
                                        readOnly
                                        disabled
                                        className="bg-input text-base text-foreground placeholder-muted-foreground border rounded-lg px-3 py-2 h-10 cursor-not-allowed"
                                    />
                                </div>
                                <Button
                                    onClick={handleSend}
                                    disabled={isLoading || isStreaming || hasMessageBeenSent}
                                    className="bg-primary hover:bg-primary/90 disabled:bg-primary/30 text-primary-foreground rounded-lg w-10 h-10 flex items-center justify-center cursor-pointer"
                                >
                                    <Send size={16} />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
    );
};

export default DeepResearchAgent;
