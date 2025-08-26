"use client";

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/mode-toggle";

interface TopMenuProps {
    name: string;
    imageUrl?: string;
}

const TopMenu: React.FC<TopMenuProps> = ({ name, imageUrl }) => {
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
            <div className="flex items-center gap-3">
                <ModeToggle />
            </div>
        </header>
    );
};

export default TopMenu;