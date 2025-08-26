"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Database, Zap, CheckCircle } from 'lucide-react';
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

// Helper component to display formatted details
const DetailItem = ({ label, value }: { label: string; value: string | number | boolean }) => (
    <div className="flex justify-between items-center py-2 border-b border-border/50">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm font-mono text-foreground">{String(value)}</span>
    </div>
);


const Explainability: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [streamingText, setStreamingText] = useState<string>('');
    const [isStreaming, setIsStreaming] = useState<boolean>(false);
    const [hasMessageBeenSent, setHasMessageBeenSent] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const prefillMessage: string = "what is the budget for defense in 2016?";
    const dummyResponse: string = `The defense budget for fiscal year 2016 was set at $612 billion in discretionary funds. This figure represents a $26 billion increase, or 4.5 percent, from the 2015 enacted level. The budget includes $561 billion in base discretionary funding for national defense, with $534 billion allocated specifically to the Department of Defense (DOD). Additionally, it includes $51 billion designated for Overseas Contingency Operations (OCO), which was $13 billion lower than the 2015 enacted level.

The budget aimed to sustain and advance U.S. global leadership while ensuring the nation's long-term fiscal health. It addressed the need to modernize military capabilities while maintaining readiness across all service branches.`;

    // A more realistic data structure simulating a real RAG process output
    const processDetails = {
        retrieval: {
            duration_ms: 251.48,
            details: {
                search_type: "semantic_similarity",
                top_k: 20,
                vector_dimensions: 1536,
                results_found: 32,
                top_score: 0.8917,
            },
        },
        generation: {
            duration_ms: 986.95,
            details: {
                model: "gpt-4o",
                streaming: true,
                input_tokens: 2043,
                output_tokens: 152,
            },
        },
    };

    const totalProcessingTime = processDetails.retrieval.duration_ms + processDetails.generation.duration_ms;
    const totalTokensProcessed = processDetails.generation.details.input_tokens + processDetails.generation.details.output_tokens;


    const scrollToBottom = (): void => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, streamingText]);

    const handleSend = async (): Promise<void> => {
        if (isLoading || isStreaming || hasMessageBeenSent) return;

        const userMessage: ChatMessage = { type: 'user', content: prefillMessage, timestamp: new Date().toLocaleTimeString() };
        setMessages((prev: ChatMessage[]) => [...prev, userMessage]);

        setIsLoading(true);
        await new Promise<void>(resolve => setTimeout(resolve, 1200));
        setIsLoading(false);
        setIsStreaming(true);

        const botMessage: ChatMessage = { type: 'bot', content: '', timestamp: new Date().toLocaleTimeString() };
        setMessages((prev: ChatMessage[]) => [...prev, botMessage]);

        let currentText: string = '';
        const words: string[] = dummyResponse.split(' ');
        for (let i = 0; i < words.length; i++) {
            currentText += (i === 0 ? '' : ' ') + words[i];
            setStreamingText(currentText);
            await new Promise<void>(resolve => setTimeout(resolve, 23 + Math.random()));
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


    return (
        <Dialog>
            <div className="h-full bg-background text-foreground flex flex-col items-center justify-center p-4">
                <div className="text-center py-4">
                    <h1 className="text-2xl font-semibold">RAG system with Explainability</h1>
                </div>

                <div className="w-full max-w-3xl">
                    <Card className="h-full bg-background border">
                        <CardContent className="p-3 h-full flex flex-col min-h-[65vh] max-h-[65vh]">
                            <div className="flex-1 overflow-y-auto mb-3 space-y-2 pr-2">
                                {messages.length === 0 && (
                                    <div className="flex items-center justify-center h-full">
                                        <h2 className="text-xl font-medium text-muted-foreground mb-2">
                                            Click the send button to get an answer
                                        </h2>
                                    </div>
                                )}
                                {messages.map((message: ChatMessage, index: number) => (
                                    <div
                                        key={index}
                                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`flex items-start gap-2 max-w-2xl ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                                            <Avatar className="w-8 h-8">
                                                <AvatarFallback>
                                                    {message.type === 'user' ? <User size={16} /> : <Bot size={16} />}
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
                                                {message.type === 'bot' && message.content && (
                                                    <CardFooter className="text-xs text-muted-foreground pt-3">
                                                        <div className="flex justify-end items-center space-x-2 w-full">
                                                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                                                                See how AI generated this response
                                                            </div>
                                                            <DialogTrigger asChild>
                                                                <Button className="text-base">
                                                                    Explainability
                                                                </Button>
                                                            </DialogTrigger>
                                                        </div>
                                                    </CardFooter>
                                                )}
                                            </Card>
                                        </div>
                                    </div>
                                ))}

                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="flex items-start gap-2 max-w-2xl">
                                            <Avatar className="w-8 h-8 bg-secondary border">
                                                <AvatarFallback className="text-secondary-foreground">
                                                    <Bot size={16} />
                                                </AvatarFallback>
                                            </Avatar>
                                            <Card className="bg-background border">
                                                <CardContent>
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

            <DialogContent className="w-full md:min-w-[56rem] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>AI Response Analysis</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="generation" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="generation">Generation Process</TabsTrigger>
                        <TabsTrigger value="evaluation">LLM as Judge</TabsTrigger>
                    </TabsList>
                    <TabsContent value="generation">
                        <div className="space-y-4 min-h-[45vh] max-h-[45vh] overflow-y-auto">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                <div className="bg-muted p-2 rounded text-center">
                                    <div className="text-base font-semibold">{(totalProcessingTime / 1000).toFixed(2)}s</div>
                                    <div className="text-sm text-muted-foreground">Processing Time</div>
                                </div>
                                <div className="bg-muted p-2 rounded text-center">
                                    <div className="text-base font-semibold">{processDetails.retrieval.details.results_found}</div>
                                    <div className="text-sm text-muted-foreground">Sources Found</div>
                                </div>
                                <div className="bg-muted p-2 rounded text-center">
                                    <div className="text-base font-semibold">{totalTokensProcessed}</div>
                                    <div className="text-sm text-muted-foreground">Tokens Processed</div>
                                </div>
                                <div className="bg-muted p-2 rounded text-center">
                                    <div className="text-base font-semibold">{(processDetails.retrieval.details.top_score * 100).toFixed(0)}%</div>
                                    <div className="text-sm text-muted-foreground">Top Relevance Score</div>
                                </div>
                            </div>

                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="text-base hover:no-underline">
                                        <div className="flex items-center gap-3 w-full">
                                            <Database size={18} className="text-primary" />
                                            <span className="font-medium">Document Retrieval</span>
                                            <div className="flex-1" />
                                            <span className="text-sm text-muted-foreground w-16 text-right">
                                                {Math.round(processDetails.retrieval.duration_ms)}ms
                                            </span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-sm px-4">
                                        <DetailItem label="Search Type" value={processDetails.retrieval.details.search_type} />
                                        <DetailItem label="Top K" value={processDetails.retrieval.details.top_k} />
                                        <DetailItem label="Vector Dimensions" value={processDetails.retrieval.details.vector_dimensions} />
                                        <DetailItem label="Results Found" value={processDetails.retrieval.details.results_found} />
                                        <DetailItem label="Top Score" value={processDetails.retrieval.details.top_score.toFixed(4)} />
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="item-3">
                                    <AccordionTrigger className="text-base hover:no-underline">
                                        <div className="flex items-center gap-3 w-full">
                                            <Zap size={18} className="text-primary" />
                                            <span className="font-medium">Response Generation</span>
                                            <div className="flex-1" />
                                            <span className="text-sm text-muted-foreground w-16 text-right">
                                                {Math.round(processDetails.generation.duration_ms)}ms
                                            </span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-sm px-4">
                                        <DetailItem label="Model" value={processDetails.generation.details.model} />
                                        <DetailItem label="Streaming" value={processDetails.generation.details.streaming} />
                                        <DetailItem label="Input Tokens" value={processDetails.generation.details.input_tokens} />
                                        <DetailItem label="Output Tokens" value={processDetails.generation.details.output_tokens} />
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>

                            <div className="space-y-1 pt-2">
                                <h3 className="text-base font-medium">Sources Used:</h3>
                                <div className="space-y-1">
                                    <div className="text-base bg-muted p-2 rounded">
                                        📄 BUDGET-2016-BUD.pdf (Page 49) - Primary source
                                    </div>
                                    <div className="text-base bg-muted p-2 rounded">
                                        📄 DOD-FISCAL-2016.pdf (Page 12) - Supporting data
                                    </div>
                                    <div className="text-base bg-muted p-2 rounded">
                                        📄 DEFENSE-SPENDING-ANALYSIS.pdf (Page 8) - Context
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="evaluation">
                        <div className="space-y-4 min-h-[45vh] max-h-[45vh] overflow-y-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-center">
                                <div className="bg-muted p-3 rounded">
                                    <div className="text-base font-semibold text-foreground">High</div>
                                    <div className="text-sm text-muted-foreground">Precision</div>
                                </div>
                                <div className="bg-muted p-3 rounded">
                                    <div className="text-base font-semibold text-foreground">Very Low</div>
                                    <div className="text-sm text-muted-foreground">Hallucination Rate</div>
                                </div>
                                <div className="bg-muted p-3 rounded">
                                    <div className="text-base font-semibold text-foreground">High</div>
                                    <div className="text-sm text-muted-foreground">Clarity</div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-base font-medium">Extracted Claims:</h3>
                                <Accordion type="multiple" className="w-full space-y-3">
                                    <AccordionItem value="claim-1" className="border bg-muted/50 rounded-lg">
                                        <AccordionTrigger className="hover:no-underline p-3 text-left">
                                            <div className="flex items-center gap-3 w-full">
                                                <CheckCircle size={18} className="text-foreground flex-shrink-0" />
                                                <div className="flex flex-col md:flex-row md:items-center gap-x-2">
                                                    <span className="text-base font-semibold">Claim 1:</span>
                                                    <span className="text-base">&ldquo;The defense budget for 2016 was $612 billion&rdquo;</span>
                                                </div>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="p-3 pt-0">
                                            <div className="mt-2 p-3 bg-background/70 rounded text-sm space-y-2">
                                                <div className="font-medium text-muted-foreground">Raw Source Text:</div>
                                                <pre className="font-mono whitespace-pre-wrap text-sm">Defense ......................................................... 612 621 643 665 670 667 662 665 679 693 708 722 3,307 6,774</pre>
                                            </div>
                                            <div className="mt-2 p-3 bg-background/70 rounded text-sm space-y-2">
                                                <div className="font-medium text-muted-foreground">Source Explanation:</div>
                                                <p>The source is from Table S–4 in the U.S. federal budget, which lists annual defense outlays (spending) in billions of dollars. The sequence &ldquo;612 621 643...&rdquo; shows spending for 2016, 2017, 2018, and subsequent years. The first value, &ldquo;612&rdquo;, represents $612 billion for 2016.</p>
                                            </div>
                                            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm border-t pt-3">
                                                <div><span className="font-medium text-muted-foreground">Document:</span> {`BUDGET-2018-TABLES.pdf`}</div>
                                                <div><span className="font-medium text-muted-foreground">Page:</span> {`14`}</div>
                                                <div><span className="font-medium text-muted-foreground">Year:</span> {`2016`}</div>
                                                <div><span className="font-medium text-muted-foreground">Chunk:</span> {`#S-4`}</div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="claim-2" className="border bg-muted/50 rounded-lg">
                                        <AccordionTrigger className="hover:no-underline p-3 text-left">
                                            <div className="flex items-center gap-3 w-full">
                                                <CheckCircle size={18} className="text-foreground flex-shrink-0" />
                                                <div className="flex flex-col md:flex-row md:items-center gap-x-2">
                                                    <span className="text-base font-semibold">Claim 2:</span>
                                                    <span className="text-base">&ldquo;This represents a $26 billion increase from the 2015 enacted level&rdquo;</span>
                                                </div>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="p-3 pt-0">
                                            <div className="mt-2 p-3 bg-background/70 rounded text-sm space-y-2">
                                                <div className="font-medium text-muted-foreground">Raw Source Text:</div>
                                                <em className="italic">&ldquo;a $26 billion or 4.5-percent increase from the 2015 enacted level&rdquo;</em>
                                            </div>
                                            <div className="mt-2 p-3 bg-background/70 rounded text-sm space-y-2">
                                                <div className="font-medium text-muted-foreground">Source Explanation:</div>
                                                <p>The source text explicitly states the increase amount ($26 billion) and percentage (4.5%) compared to the 2015 enacted level, directly supporting this claim.</p>
                                            </div>
                                            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm border-t pt-3">
                                                <div><span className="font-medium text-muted-foreground">Document:</span> {`BUDGET-2016-BUD.pdf`}</div>
                                                <div><span className="font-medium text-muted-foreground">Page:</span> {`49`}</div>
                                                <div><span className="font-medium text-muted-foreground">Year:</span> {`2016`}</div>
                                                <div><span className="font-medium text-muted-foreground">Chunk:</span> {`#23`}</div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="claim-3" className="border bg-muted/50 rounded-lg">
                                        <AccordionTrigger className="hover:no-underline p-3 text-left">
                                            <div className="flex items-center gap-3 w-full">
                                                <CheckCircle size={18} className="text-foreground flex-shrink-0" />
                                                <div className="flex flex-col md:flex-row md:items-center gap-x-2">
                                                    <span className="text-base font-semibold w-fit whitespace-nowrap">Claim 3:</span>
                                                    <span className="text-base">&ldquo;The budget includes $51 billion for Overseas Contingency Operations (OCO)&rdquo;</span>
                                                </div>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="p-3 pt-0">
                                            <div className="mt-2 p-3 bg-background/70 rounded text-sm space-y-2">
                                                <div className="font-medium text-muted-foreground">Raw Source Text:</div>
                                                <em className="italic">&hellip;the 2016 budget provides $50.9 billion for Overseas Contingency Operations (OCO) to address extraordinary operational needs.&rdquo;</em>
                                            </div>
                                            <div className="mt-2 p-3 bg-background/70 rounded text-sm space-y-2">
                                                <div className="font-medium text-muted-foreground">Source Explanation:</div>
                                                <p>The source text directly states that the 2016 budget provides $50.9 billion for OCO, which aligns with and supports the extracted claim of $51 billion.</p>
                                            </div>
                                            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm border-t pt-3">
                                                <div><span className="font-medium text-muted-foreground">Document:</span> {`DOD-FISCAL-2016.pdf`}</div>
                                                <div><span className="font-medium text-muted-foreground">Page:</span> {`8`}</div>
                                                <div><span className="font-medium text-muted-foreground">Year:</span> {`2016`}</div>
                                                <div><span className="font-medium text-muted-foreground">Chunk:</span> {`#41`}</div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default Explainability;