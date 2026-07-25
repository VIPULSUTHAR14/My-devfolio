'use client';

import React from 'react';
import GitHubTerminal from './github';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen pt-36 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
      {/* Left Content Area */}
      <div className="flex-1 space-y-8">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#adc6ff]/10 border border-[#adc6ff]/20 text-[#adc6ff] font-mono text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#adc6ff] animate-pulse"></span>
          Available for Work
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-none">
          Building Digital Products That{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#adc6ff] via-[#90b3ff] to-[#ddb7ff]">
            Scale
          </span>
          .
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-[#c2c6d6] max-w-2xl leading-relaxed">
          Vipul Suthar — Full-Stack Engineer specializing in React, Next.js, and Cloud Architecture. Crafting high-performance web experiences with technical precision.
        </p>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-3">
          {['React', 'Node.js', 'Next.js', 'AWS', 'TypeScript'].map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 glass-card rounded-xl border border-white/10 font-mono text-xs text-[#c2c6d6]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <a
            href="#projects"
            className="px-8 py-4 bg-gradient-to-r from-[#adc6ff] to-[#ddb7ff] text-[#00285d] font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-[#adc6ff]/20"
          >
            <span>View Projects</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </a>
          <a
            href="#contact"
            className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-colors"
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* Right Terminal Area */}
      <div className="flex-1 w-full flex items-center justify-center">
        <GitHubTerminal />
      </div>
    </section>
  );
}