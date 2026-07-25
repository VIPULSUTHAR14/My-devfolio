'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const [clickCount, setClickCount] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Scroll smoothly to top of the page on click
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const nextCount = clickCount + 1;

    if (nextCount >= 5) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setClickCount(0);
      router.push('/login');
    } else {
      setClickCount(nextCount);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setClickCount(0);
      }, 2500);
    }
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex justify-between items-center px-8 py-3 bg-[#10131a]/70 backdrop-blur-xl rounded-full w-[90%] max-w-5xl border border-white/10 shadow-[0px_8px_30px_rgba(173,198,255,0.15)]">
      <a
        href="#home"
        onClick={handleLogoClick}
        className="text-2xl font-bold font-mono tracking-tight text-[#adc6ff] hover:opacity-90 transition-opacity cursor-pointer select-none"
        title="Click 5 times to access dashboard login"
      >
        ~/Vipul.Dev
      </a>

      <div className="hidden md:flex items-center gap-8 font-mono text-sm">
        <a className="text-[#c2c6d6] hover:text-white transition-colors cursor-pointer" href="#home">
          Home
        </a>
        <a className="text-[#c2c6d6] hover:text-white transition-colors cursor-pointer" href="#expertise">
          Expertise
        </a>
        <a className="text-[#c2c6d6] hover:text-white transition-colors cursor-pointer" href="#projects">
          Projects
        </a>
        <a className="text-[#c2c6d6] hover:text-white transition-colors cursor-pointer" href="#contact">
          Contact
        </a>
      </div>

      <a
        href="/VipulSuthar.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-2 bg-[#adc6ff] text-[#00285d] rounded-full font-bold font-mono text-sm hover:scale-105 transition-transform duration-300 active:scale-95 shadow-md shadow-[#adc6ff]/20"
      >
        Resume
      </a>
    </nav>
  );
}