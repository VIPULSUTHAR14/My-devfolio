"use client";

import React, { useState, useEffect } from "react";

const lines = [
    "lucas@macbook ~ % npx create-react-app portfolio",
    "Creating a new React app in /Users/lucas/portfolio...",
    "Installing packages. This might take a couple of minutes.",
    "Success! Created portfolio at /Users/lucas/portfolio. Happy hacking!",
];

const GitHubTerminal = () => {
    // Tracks which lines are fully displayed, and the current text of the active line
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [currentLineText, setCurrentLineText] = useState("");
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        // If we've typed all lines, stop the effect
        if (lineIndex >= lines.length) return;

        const currentLine = lines[lineIndex];

        if (charIndex < currentLine.length) {
            // Type next character
            const timeout = setTimeout(() => {
                setCurrentLineText((prev) => prev + currentLine[charIndex]);
                setCharIndex((prev) => prev + 1);
            }, 35); // Typing speed (lower is faster)
            return () => clearTimeout(timeout);
        } else {
            // Line is finished. Pause slightly, then move to next line
            const timeout = setTimeout(() => {
                setDisplayedLines((prev) => [...prev, currentLine]);
                setCurrentLineText("");
                setCharIndex(0);
                setLineIndex((prev) => prev + 1);
            }, 600); // Delay between lines
            return () => clearTimeout(timeout);
        }
    }, [charIndex, lineIndex]);

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            {/* Strict 500px x 500px GitHub-style Window */}
            <div className="w-[600px] h-[600px] bg-[#0d1117] rounded-lg border border-[#30363d] shadow-2xl flex flex-col font-mono text-base overflow-hidden">

                {/* Window Header */}
                <div className="bg-[#161b22] px-4 py-3 border-b border-[#30363d] flex items-center justify-between shrink-0">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <div className="text-gray-400 text-sm font-semibold">terminal — bash</div>
                    <div className="w-12" /> {/* Spacer to balance header */}
                </div>

                {/* Terminal Content Body */}
                <div className="p-8 flex-1 flex flex-col justify-start space-y-4 overflow-y-auto text-left leading-relaxed">
                    {/* Render previously completed lines */}
                    {displayedLines.map((line, index) => (
                        <div key={index} className={index === 0 ? "text-white" : "text-gray-300"}>
                            {line}
                        </div>
                    ))}

                    {/* Render currently typing line with blinking cursor */}
                    {lineIndex < lines.length && (
                        <div className={lineIndex === 0 ? "text-white" : "text-gray-300"}>
                            {currentLineText}
                            <span className="inline-block w-2.5 h-5 bg-gray-400 ml-1 animate-pulse" />
                        </div>
                    )}

                    {/* Fallback cursor when everything is done typing */}
                    {lineIndex >= lines.length && (
                        <div className="text-white">
                            lucas@macbook ~ % <span className="inline-block w-2.5 h-5 bg-gray-400 ml-1 animate-pulse" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GitHubTerminal;