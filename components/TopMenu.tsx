"use client";

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Brain, Search } from 'lucide-react';

interface TopMenuProps {
    name: string;
    imageUrl?: string;
    activeTab: 'explainability' | 'deepresearch';
    onTabChange: (tab: 'explainability' | 'deepresearch') => void;
}

const TopMenu: React.FC<TopMenuProps> = ({ name, imageUrl, activeTab, onTabChange }) => {
    const initials = name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();

    return (
        <header className="flex items-center justify-between p-4 border-b bg-card sticky top-0 z-10">
            <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                    {imageUrl && <AvatarImage src={imageUrl} alt={name} />}
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <span className="text-base font-bold text-foreground">{name}</span>
            </div>
            
            <div className="flex items-center gap-2">
                <Button
                    variant={activeTab === 'explainability' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onTabChange('explainability')}
                    className="flex items-center gap-2"
                >
                    <Brain size={16} />
                    Explainability
                </Button>
                <Button
                    variant={activeTab === 'deepresearch' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onTabChange('deepresearch')}
                    className="flex items-center gap-2"
                >
                    <Search size={16} />
                    Deep Research
                </Button>
            </div>
        </header>
    );
};

export default TopMenu;
