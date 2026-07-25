'use client';

import React from 'react';

export default function Stats() {
  const stats = [
    { label: 'Projects Completed', value: '20+', color: 'text-[#adc6ff]' },
    { label: 'DSA Problems', value: '1000+', color: 'text-[#ddb7ff]' },
    { label: 'Git Commits', value: '500+', color: 'text-[#adc6ff]' },
    { label: 'Years Learning', value: '3+', color: 'text-[#ddb7ff]' },
  ];

  return (
    <section className="py-16 max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 glass-card rounded-3xl p-8 border border-white/10">
        {stats.map((stat, idx) => (
          <div key={idx} className="text-center group">
            <div className={`text-4xl md:text-5xl font-extrabold ${stat.color} mb-2 transition-transform group-hover:scale-110 duration-500`}>
              {stat.value}
            </div>
            <div className="font-mono text-xs text-[#c2c6d6] uppercase tracking-widest">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
