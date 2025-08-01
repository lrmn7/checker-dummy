import React from 'react';
import AnimeBackground from '@/components/AnimeBackground';
import SomniaAirdropChecker from '@/components/SomniaAirdropChecker';
import FooterBar from '@/components/FooterBar';

/**
 * Index Page - Somnia Airdrop Eligibility Checker
 * Full-screen anime metaverse themed single-page application
 */
const Index = () => {
  return (
    <div className="relative min-h-screen">
      {/* Anime metaverse background with parallax effect */}
      <AnimeBackground />
      
      {/* Main airdrop checker content */}
      <main className="relative z-10">
        <SomniaAirdropChecker />
      </main>
      
      {/* Fixed footer bar */}
      <FooterBar />
    </div>
  );
};

export default Index;
