// src/pages/Home.tsx
import React from 'react';
import { Hero_Home } from '../components/Hero_Home';
import { Approach_Home } from '../components/Approach_Home';
import { AboutMosaic_Home } from '../components/AboutMosaic_Home';
import { Sectors_Home } from '../components/Sectors_Home';
import { Metrics_Home } from '../components/Metrics_Home';
import { Contact_Home } from '../components/Contact_Home';

export const Home: React.FC = () => {
  return (
    <div className="w-full text-zinc-900 bg-[#f8f9f6] font-['Inter',sans-serif]">
      <Hero_Home />
      <Approach_Home />
      <AboutMosaic_Home />
      <Sectors_Home />
      <Metrics_Home />
      <Contact_Home />
    </div>
  );
};