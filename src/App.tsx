import React from 'react';
import { SpotlightJourney } from './components/SpotlightJourney';

export default function App() {
  return (
    <main className="w-full min-h-screen bg-[#F7F7F2] font-manrope antialiased text-[#1A1A1A]">
      <h1 className="sr-only">Teklozy — 10-Level Gamified Career Journey</h1>
      <SpotlightJourney />
    </main>
  );
}
