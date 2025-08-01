import React from 'react';
import animeBackground from '@/assets/anime-metaverse-bg.jpg';

/**
 * AnimeBackground Component
 * Fullscreen Studio Ghibli-inspired parallax background
 * with blur effect and floating animated elements
 */
const AnimeBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main background image */}
      <div 
        className="absolute inset-0 parallax-bg"
        style={{
          backgroundImage: `url(${animeBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-md" />

      {/* Floating particles and magic orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-4 h-4 bg-gradient-magic rounded-full shadow-magic float-slow opacity-60" />
        <div className="absolute top-32 right-20 w-6 h-6 bg-gradient-plasma rounded-full shadow-plasma float-medium opacity-70" />
        <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-gradient-energy rounded-full shadow-energy float-fast opacity-50" />
        <div className="absolute top-1/2 right-1/3 w-5 h-5 bg-gradient-magic rounded-full shadow-magic float-slow opacity-40" />
        <div className="absolute bottom-60 right-10 w-4 h-4 bg-gradient-plasma rounded-full shadow-plasma float-medium opacity-80" />
        
        {/* Extra orbs for mobile */}
        <div className="md:hidden absolute top-40 right-5 w-3 h-3 bg-gradient-energy rounded-full shadow-energy float-fast opacity-60" />
        <div className="md:hidden absolute bottom-32 left-5 w-2 h-2 bg-gradient-magic rounded-full shadow-magic float-medium opacity-50" />

        {/* Subtle overlay for extra depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background/30" />
      </div>
    </div>
  );
};

export default AnimeBackground;
