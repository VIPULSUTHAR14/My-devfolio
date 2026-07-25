'use client';

import React, { useState, useEffect } from "react";

const lines = [
    "Vipul@portfolio ~ % ./fetch_bio.sh",
    "Loading profile...",
    "Name: Vipul Suthar",
    "Role: Full-Stack Engineer",
    "Focus: Building scalable React apps and robust Node.js backends.",
    "Status: Open to work. Ready to deploy."
];

const GitHubTerminal = () => {
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [currentLineText, setCurrentLineText] = useState("");
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        if (lineIndex >= lines.length) return;

        const currentLine = lines[lineIndex];

        if (charIndex < currentLine.length) {
            const timeout = setTimeout(() => {
                setCurrentLineText((prev) => prev + currentLine[charIndex]);
                setCharIndex((prev) => prev + 1);
            }, 35);
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setDisplayedLines((prev) => [...prev, currentLine]);
                setCurrentLineText("");
                setCharIndex(0);
                setLineIndex((prev) => prev + 1);
            }, 600);
            return () => clearTimeout(timeout);
        }
    }, [charIndex, lineIndex]);

    return (
        <div className="w-full max-w-lg h-[440px] bg-[#10131a]/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl flex flex-col font-mono text-sm overflow-hidden">
            {/* Window Header */}
            <div className="bg-[#191b23] px-4 py-3 border-b border-white/10 flex items-center justify-between shrink-0">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="text-gray-400 text-xs font-semibold">terminal — bash</div>
                <div className="w-12" />
            </div>

            {/* Terminal Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-start space-y-3 overflow-y-auto text-left leading-relaxed">
                {displayedLines.map((line, index) => (
                    <div key={index} className={index === 0 ? "text-[#adc6ff]" : "text-gray-300"}>
                        {line}
                    </div>
                ))}

                {lineIndex < lines.length && (
                    <div className={lineIndex === 0 ? "text-[#adc6ff]" : "text-gray-300"}>
                        {currentLineText}
                        <span className="inline-block w-2 h-4 bg-[#adc6ff] ml-1 animate-pulse" />
                    </div>
                )}

                {lineIndex >= lines.length && (
                    <div className="text-[#adc6ff]">
                        Vipul@victus 15 ~ % <span className="inline-block w-2 h-4 bg-[#adc6ff] ml-1 animate-pulse" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default GitHubTerminal;