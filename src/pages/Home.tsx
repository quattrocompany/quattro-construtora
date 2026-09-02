// src/pages/Home.tsx
import React from 'react';
import { Hero_Home } from '../components/Hero_Home';
import { Approach_Home } from '../components/Approach_Home';
import { AboutMosaic_Home } from '../components/AboutMosaic_Home';
import { Metrics_Home } from '../components/Metrics_Home';
import { Contact_Home } from '../components/Contact_Home';

export const Home: React.FC = () => {
  return (
    <div className="w-full bg-[#f8f9f6] text-zinc-900 font-sans selection:bg-amber-500 selection:text-zinc-950 overflow-x-hidden">
      <Hero_Home />
      <Approach_Home />
      <AboutMosaic_Home />
      <Metrics_Home />
      <Contact_Home />
    </div>
  );
};