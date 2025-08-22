"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Search, Brain, FileText, CheckCircle, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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

interface ResearchStage {
    name: string;
    status: 'pending' | 'active' | 'completed';
    duration?: number;
    icon: React.ReactNode;
}

// Helper component to display formatted details
const DetailItem = ({ label, value }: { label: string; value: string | number | boolean }) => (
    <div className="flex justify-between items-center py-2 border-b border-border/50">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm font-mono text-foreground">{String(value)}</span>
    </div>
);

const DeepResearch: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [streamingText, setStreamingText] = useState<string>('');
    const [isStreaming, setIsStreaming] = useState<boolean>(false);
    const [hasMessageBeenSent, setHasMessageBeenSent] = useState<boolean>(false);
    const [currentStage, setCurrentStage] = useState<number>(0);
    const [researchStages, setResearchStages] = useState<ResearchStage[]>([
        { name: 'Planning', status: 'pending', icon: <Brain size={16} /> },
        { name: 'Search & Data Gathering', status: 'pending', icon: <Search size={16} /> },
        { name: 'Analysis & Synthesis', status: 'pending', icon: <Zap size={16} /> },
        { name: 'Final Report Generation', status: 'pending', icon: <FileText size={16} /> },
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const prefillMessage: string = "Analyze the impact of AI on healthcare research methodologies";
    const dummyResponse: string = `# Impact of AI on Healthcare Research Methodologies

## Executive Summary
Artificial Intelligence is fundamentally transforming healthcare research methodologies, introducing unprecedented capabilities in data analysis, pattern recognition, and predictive modeling. This comprehensive analysis examines the multifaceted impact across clinical trials, drug discovery, diagnostic research, and personalized medicine.

## Key Findings

### 1. Accelerated Drug Discovery
AI has reduced drug discovery timelines from 10-15 years to 3-5 years through:
- **Molecular modeling**: AI algorithms predict drug-target interactions with 85% accuracy
- **Compound screening**: Machine learning identifies promising candidates 100x faster than traditional methods
- **Clinical trial optimization**: AI-driven patient stratification improves trial success rates by 40%

### 2. Enhanced Diagnostic Capabilities
Machine learning models now achieve:
- **Medical imaging**: 94% accuracy in cancer detection (surpassing human radiologists)
- **Pathology analysis**: Automated tissue analysis reduces diagnostic time by 60%
- **Biomarker discovery**: AI identifies novel biomarkers for early disease detection

### 3. Personalized Medicine Revolution
AI enables precision healthcare through:
- **Genomic analysis**: Processing of whole genome sequences in hours vs. weeks
- **Treatment optimization**: Personalized therapy recommendations based on patient data
- **Risk prediction**: Early identification of high-risk patients with 90% accuracy

## Methodology Transformations

### Traditional vs. AI-Enhanced Research
- **Data processing**: From manual analysis to automated pattern recognition
- **Sample sizes**: AI enables insights from smaller, more targeted datasets
- **Hypothesis generation**: Machine learning suggests novel research directions
- **Reproducibility**: Standardized AI models improve research consistency

## Challenges and Limitations
- **Data quality**: AI models require high-quality, diverse datasets
- **Regulatory approval**: New frameworks needed for AI-driven research validation
- **Ethical considerations**: Bias mitigation and transparency requirements
- **Integration complexity**: Combining AI tools with existing research infrastructure

## Future Implications
The integration of AI in healthcare research will continue to accelerate, with projected impacts including:
- 50% reduction in time-to-market for new treatments by 2030
- $150 billion in healthcare cost savings through improved efficiency
- Democratization of advanced research capabilities for smaller institutions

This transformation represents a paradigm shift toward data-driven, predictive healthcare research that promises to improve patient outcomes while reducing costs and development timelines.`;

    // Simulated research process details
    const researchDetails = {
        planning: {
            duration_ms: 2340,
            queries_generated: 15,
            research_areas: 4,
            methodology: "systematic_review_with_meta_analysis"
        },
        search: {
            duration_ms: 4560,
            sources_searched: 8,
            papers_found: 247,
            relevant_papers: 89,
            databases: ["PubMed", "IEEE Xplore", "Nature", "Science Direct"]
        },
        analysis: {
            duration_ms: 6780,
            synthesis_models: 3,
            key_themes: 12,
            evidence_strength: "high",
            confidence_score: 0.92
        },
        report: {
            duration_ms: 3420,
            sections_generated: 7,
            citations: 89,
            word_count: 2847,
            readability_score: 8.2
        }
    };

    const totalProcessingTime = Object.values(researchDetails).reduce((sum, stage) => sum + stage.duration_ms, 0);

    const scrollToBottom = (): void => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, streamingText]);

    const updateStageStatus = (stageIndex: number, status: 'pending' | 'active' | 'completed', duration?: number) => {
        setResearchStages(prev => prev.map((stage, index) => 
            index === stageIndex ? { ...stage, status, duration } : stage
        ));
    };

    const simulateResearchStages = async () => {
        const stageDurations = [2340, 4560, 6780, 3420]; // milliseconds for each stage
        
        for (let i = 0; i < researchStages.length; i++) {
            updateStageStatus(i, 'active');
            setCurrentStage(i);
            await new Promise<void>(resolve => setTimeout(resolve, stageDurations[i] / 10)); // Speed up for demo
            updateStageStatus(i, 'completed', stageDurations[i]);
        }
    };

    const handleSend = async (): Promise<void> => {
        if (isLoading || isStreaming || hasMessageBeenSent) return;

        const userMessage: ChatMessage = { type: 'user', content: prefillMessage, timestamp: new Date().toLocaleTimeString() };
        setMessages((prev: ChatMessage[]) => [...prev, userMessage]);

        setIsLoading(true);
        
        // Start research stages simulation
        simulateResearchStages();
        
        await new Promise<void>(resolve => setTimeout(resolve, 1800));
        setIsLoading(false);
        setIsStreaming(true);

        const botMessage: ChatMessage = { type: 'bot', content: '', timestamp: new Date().toLocaleTimeString() };
        setMessages((prev: ChatMessage[]) => [...prev, botMessage]);

        // Simulate streaming response
        let currentText: string = '';
        const words: string[] = dummyResponse.split(' ');
        for (let i = 0; i < words.length; i++) {
            currentText += (i === 0 ? '' : ' ') + words[i];
            setStreamingText(currentText);
            await new Promise<void>(resolve => setTimeout(resolve, 15 + Math.random() * 10));
        }

        setMessages((prev: ChatMessage[]) =>
            prev.map((msg, index) =>
                index === prev.length - 1 ? { ...msg, content: currentText } : msg
            )
        );

        setStreamingText('');
        setIsStreaming(false);
        setHasMessageBeenSent(true);
    };

    const ResearchProgressIndicator = () => (
        <div className="mb-4 p-3 bg-muted/50 rounded-lg">
            <div className="text-sm font-medium mb-2">Research Progress</div>
            <div className="space-y-2">
                {researchStages.map((stage, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            stage.status === 'completed' ? 'bg-green-500' :
                            stage.status === 'active' ? 'bg-blue-500 animate-pulse' :
                            'bg-muted-foreground/30'
                        }`}>
                            {stage.status === 'completed' ? (
                                <CheckCircle size={10} className="text-white" />
                            ) : stage.status === 'active' ? (
                                <Clock size={10} className="text-white" />
                            ) : (
                                stage.icon
                            )}
                        </div>
                        <span className={`text-sm ${
                            stage.status === 'completed' ? 'text-green-600' :
                            stage.status === 'active' ? 'text-blue-600' :
                            'text-muted-foreground'
                        }`}>
                            {stage.name}
                            {stage.duration && ` (${(stage.duration / 1000).toFixed(1)}s)`}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <Dialog>
            <div className="h-full bg-background text-foreground flex flex-col items-center justify-center p-4">
                <div className="text-center py-4">
                    <h1 className="text-2xl font-semibold">Deep Research Agent</h1>
                </div>

                <div className="w-full max-w-3xl">
                    <Card className="h-full bg-background border">
                        <CardContent className="p-3 h-full flex flex-col min-h-[65vh] max-h-[65vh]">
                            <div className="flex-1 overflow-y-auto mb-3 space-y-2 pr-2">
                                {messages.length === 0 && (
                                    <div className="flex items-center justify-center h-full">
                                        <h2 className="text-xl font-medium text-muted-foreground mb-2">
                                            Click the send button to start deep research
                                        </h2>
                                    </div>
                                )}
                                {messages.map((message: ChatMessage, index: number) => (
                                    <div
                                        key={index}
                                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`flex items-start gap-2 max-w-2xl ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                                            <Avatar className={`w-8 h-8 ${message.type === 'user' ? 'bg-primary' : 'bg-secondary border'}`}>
                                                <AvatarFallback className={message.type === 'user' ? 'text-primary-foreground' : 'text-secondary-foreground'}>
                                                    {message.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                                                </AvatarFallback>
                                            </Avatar>
                                            <Card className={`${message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-background border'}`}>
                                                <CardContent className="p-3">
                                                    <div className="text-sm whitespace-pre-wrap">
                                                        {message.content || streamingText}
                                                    </div>
                                                </CardContent>
                                                {message.type === 'bot' && message.content && (
                                                    <CardFooter className="p-3 pt-0">
                                                        <div className="flex gap-2 w-full">
                                                            <DialogTrigger asChild>
                                                                <Button variant="outline" size="sm" className="text-xs">
                                                                    <Search size={14} className="mr-1" />
                                                                    Research Details
                                                                </Button>
                                                            </DialogTrigger>
                                                        </div>
                                                    </CardFooter>
                                                )}
                                            </Card>
                                        </div>
                                    </div>
                                ))}

                                {(isLoading || isStreaming) && <ResearchProgressIndicator />}

                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="flex items-start gap-2 max-w-2xl">
                                            <Avatar className="w-8 h-8 bg-secondary border">
                                                <AvatarFallback className="text-secondary-foreground">
                                                    <Bot size={16} />
                                                </AvatarFallback>
                                            </Avatar>
                                            <Card className="bg-background border">
                                                <CardContent className="p-3">
                                                    <div className="flex items-center gap-1">
                                                        <div className="w-2 h-2 bg-foreground rounded-full animate-pulse" />
                                                        <div className="w-2 h-2 bg-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                                                        <div className="w-2 h-2 bg-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>

                            <div className="flex gap-2">
                                <Input
                                    value={prefillMessage}
                                    readOnly
                                    className="flex-1"
                                    placeholder="Enter your research question..."
                                />
                                <Button
                                    onClick={handleSend}
                                    disabled={isLoading || isStreaming || hasMessageBeenSent}
                                    size="icon"
                                >
                                    <Send size={16} />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Search size={20} />
                        Deep Research Analysis
                    </DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview">Research Plan</TabsTrigger>
                        <TabsTrigger value="sources">Sources & Data</TabsTrigger>
                        <TabsTrigger value="analysis">Analysis Process</TabsTrigger>
                        <TabsTrigger value="methodology">Methodology</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <h3 className="font-semibold">Research Overview</h3>
                                <DetailItem label="Total Processing Time" value={`${(totalProcessingTime / 1000).toFixed(1)}s`} />
                                <DetailItem label="Research Areas Covered" value={researchDetails.planning.research_areas} />
                                <DetailItem label="Methodology" value="Systematic Review + Meta-Analysis" />
                                <DetailItem label="Confidence Score" value={`${(researchDetails.analysis.confidence_score * 100).toFixed(1)}%`} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold">Research Stages</h3>
                                {researchStages.map((stage, index) => (
                                    <div key={index} className="flex items-center justify-between py-1">
                                        <div className="flex items-center gap-2">
                                            {stage.icon}
                                            <span className="text-sm">{stage.name}</span>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded ${
                                            stage.status === 'completed' ? 'bg-green-100 text-green-800' :
                                            stage.status === 'active' ? 'bg-blue-100 text-blue-800' :
                                            'bg-gray-100 text-gray-600'
                                        }`}>
                                            {stage.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="sources" className="space-y-4">
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold mb-2">Search Results Summary</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <DetailItem label="Sources Searched" value={researchDetails.search.sources_searched} />
                                    <DetailItem label="Papers Found" value={researchDetails.search.papers_found} />
                                    <DetailItem label="Relevant Papers" value={researchDetails.search.relevant_papers} />
                                    <DetailItem label="Search Duration" value={`${(researchDetails.search.duration_ms / 1000).toFixed(1)}s`} />
                                </div>
                            </div>
                            
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="databases">
                                    <AccordionTrigger>
                                        <div className="flex items-center gap-2">
                                            <Search size={16} />
                                            <span>Databases Searched ({researchDetails.search.databases.length})</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-2">
                                        {researchDetails.search.databases.map((db, index) => (
                                            <div key={index} className="p-2 bg-muted/50 rounded">
                                                <div className="font-medium">{db}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {Math.floor(researchDetails.search.papers_found / researchDetails.search.databases.length)} papers found
                                                </div>
                                            </div>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                                
                                <AccordionItem value="key-papers">
                                    <AccordionTrigger>
                                        <div className="flex items-center gap-2">
                                            <FileText size={16} />
                                            <span>Key Research Papers (Top 5)</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-3">
                                        {[
                                            { title: "Machine Learning in Drug Discovery: A Comprehensive Review", authors: "Chen, L. et al.", year: 2023, citations: 247, relevance: 0.94 },
                                            { title: "AI-Driven Personalized Medicine: Current State and Future Prospects", authors: "Rodriguez, M. et al.", year: 2023, citations: 189, relevance: 0.91 },
                                            { title: "Deep Learning Applications in Medical Imaging: A Systematic Analysis", authors: "Kumar, S. et al.", year: 2022, citations: 312, relevance: 0.89 },
                                            { title: "Artificial Intelligence in Clinical Trial Design and Optimization", authors: "Thompson, R. et al.", year: 2023, citations: 156, relevance: 0.87 },
                                            { title: "Ethical Considerations in AI-Powered Healthcare Research", authors: "Williams, A. et al.", year: 2022, citations: 203, relevance: 0.85 }
                                        ].map((paper, index) => (
                                            <div key={index} className="p-3 border rounded-lg">
                                                <div className="font-medium text-sm">{paper.title}</div>
                                                <div className="text-xs text-muted-foreground mt-1">
                                                    {paper.authors} ({paper.year})
                                                </div>
                                                <div className="flex justify-between items-center mt-2 text-xs">
                                                    <span>Citations: {paper.citations}</span>
                                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                        Relevance: {(paper.relevance * 100).toFixed(0)}%
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </TabsContent>

                    <TabsContent value="analysis" className="space-y-4">
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold mb-2">Analysis Summary</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <DetailItem label="Synthesis Models Used" value={researchDetails.analysis.synthesis_models} />
                                    <DetailItem label="Key Themes Identified" value={researchDetails.analysis.key_themes} />
                                    <DetailItem label="Evidence Strength" value={researchDetails.analysis.evidence_strength} />
                                    <DetailItem label="Analysis Duration" value={`${(researchDetails.analysis.duration_ms / 1000).toFixed(1)}s`} />
                                </div>
                            </div>

                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="key-findings">
                                    <AccordionTrigger>
                                        <div className="flex items-center gap-2">
                                            <Zap size={16} />
                                            <span>Key Research Findings</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-3">
                                        {[
                                            { theme: "Drug Discovery Acceleration", impact: "High", evidence: "Strong", description: "AI reduces drug discovery timelines by 60-70%" },
                                            { theme: "Diagnostic Accuracy Improvement", impact: "High", evidence: "Strong", description: "ML models achieve 94% accuracy in medical imaging" },
                                            { theme: "Personalized Treatment Optimization", impact: "Medium", evidence: "Moderate", description: "AI enables precision medicine approaches" },
                                            { theme: "Research Methodology Transformation", impact: "High", evidence: "Strong", description: "Fundamental shift toward data-driven research" }
                                        ].map((finding, index) => (
                                            <div key={index} className="p-3 border rounded-lg">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="font-medium text-sm">{finding.theme}</div>
                                                    <div className="flex gap-2">
                                                        <span className={`text-xs px-2 py-1 rounded ${
                                                            finding.impact === 'High' ? 'bg-red-100 text-red-800' :
                                                            finding.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-green-100 text-green-800'
                                                        }`}>
                                                            {finding.impact} Impact
                                                        </span>
                                                        <span className={`text-xs px-2 py-1 rounded ${
                                                            finding.evidence === 'Strong' ? 'bg-green-100 text-green-800' :
                                                            'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                            {finding.evidence} Evidence
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-xs text-muted-foreground">{finding.description}</div>
                                            </div>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="synthesis-process">
                                    <AccordionTrigger>
                                        <div className="flex items-center gap-2">
                                            <Brain size={16} />
                                            <span>Synthesis Process Details</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-2">
                                        <div className="p-3 bg-muted/50 rounded">
                                            <div className="font-medium text-sm mb-2">Multi-Stage Analysis Pipeline</div>
                                            <div className="space-y-2 text-sm">
                                                <div>1. <strong>Content Extraction:</strong> Automated extraction of key findings from 89 relevant papers</div>
                                                <div>2. <strong>Theme Clustering:</strong> ML-based identification of 12 major research themes</div>
                                                <div>3. <strong>Evidence Synthesis:</strong> Cross-validation of findings across multiple sources</div>
                                                <div>4. <strong>Impact Assessment:</strong> Quantitative analysis of research impact and significance</div>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </TabsContent>

                    <TabsContent value="methodology" className="space-y-4">
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold mb-2">Research Methodology</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <DetailItem label="Approach" value="Systematic Review + Meta-Analysis" />
                                    <DetailItem label="Search Strategy" value="Multi-database semantic search" />
                                    <DetailItem label="Quality Assessment" value="Automated + Manual review" />
                                    <DetailItem label="Report Generation" value={`${(researchDetails.report.duration_ms / 1000).toFixed(1)}s`} />
                                </div>
                            </div>

                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="search-strategy">
                                    <AccordionTrigger>
                                        <div className="flex items-center gap-2">
                                            <Search size={16} />
                                            <span>Search Strategy & Criteria</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-2">
                                        <div className="p-3 bg-muted/50 rounded text-sm">
                                            <div className="font-medium mb-2">Inclusion Criteria:</div>
                                            <ul className="list-disc list-inside space-y-1">
                                                <li>Peer-reviewed articles published 2020-2024</li>
                                                <li>Focus on AI applications in healthcare research</li>
                                                <li>Empirical studies with quantitative results</li>
                                                <li>English language publications</li>
                                            </ul>
                                        </div>
                                        <div className="p-3 bg-muted/50 rounded text-sm">
                                            <div className="font-medium mb-2">Search Terms:</div>
                                            <div className="font-mono text-xs bg-background p-2 rounded">
                                                ("artificial intelligence" OR "machine learning" OR "deep learning") AND 
                                                ("healthcare research" OR "medical research" OR "clinical research") AND 
                                                ("methodology" OR "methods" OR "approach")
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="quality-assessment">
                                    <AccordionTrigger>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle size={16} />
                                            <span>Quality Assessment Framework</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-2">
                                        <div className="p-3 bg-muted/50 rounded text-sm">
                                            <div className="font-medium mb-2">Assessment Criteria:</div>
                                            <div className="space-y-2">
                                                <div><strong>Study Design:</strong> Randomized controlled trials, cohort studies, systematic reviews</div>
                                                <div><strong>Sample Size:</strong> Minimum 100 participants for clinical studies</div>
                                                <div><strong>Statistical Power:</strong> Power analysis and effect size reporting</div>
                                                <div><strong>Bias Assessment:</strong> Risk of bias evaluation using standardized tools</div>
                                                <div><strong>Reproducibility:</strong> Code/data availability and replication studies</div>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="limitations">
                                    <AccordionTrigger>
                                        <div className="flex items-center gap-2">
                                            <FileText size={16} />
                                            <span>Study Limitations & Future Directions</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-2">
                                        <div className="p-3 bg-muted/50 rounded text-sm">
                                            <div className="font-medium mb-2">Limitations:</div>
                                            <ul className="list-disc list-inside space-y-1">
                                                <li>Rapid evolution of AI technology may limit long-term relevance</li>
                                                <li>Publication bias toward positive results in AI research</li>
                                                <li>Limited standardization in AI methodology reporting</li>
                                                <li>Heterogeneity in outcome measures across studies</li>
                                            </ul>
                                        </div>
                                        <div className="p-3 bg-muted/50 rounded text-sm">
                                            <div className="font-medium mb-2">Future Research Directions:</div>
                                            <ul className="list-disc list-inside space-y-1">
                                                <li>Longitudinal studies on AI implementation outcomes</li>
                                                <li>Standardized evaluation frameworks for AI in healthcare</li>
                                                <li>Ethical and regulatory framework development</li>
                                                <li>Cost-effectiveness analyses of AI-driven research methods</li>
                                            </ul>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default DeepResearch;
