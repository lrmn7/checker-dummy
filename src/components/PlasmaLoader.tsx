import React from 'react';

/**
 * PlasmaLoader Component
 * Custom anime-style loading animation with rotating plasma orb and color-cycling energy
 */
const PlasmaLoader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Main plasma orb */}
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="w-16 h-16 rounded-full bg-gradient-plasma plasma-orb opacity-80" />
        
        {/* Inner core */}
        <div className="absolute inset-2 rounded-full bg-gradient-magic shadow-magic animate-pulse" />
        
        {/* Center dot */}
        <div className="absolute inset-6 rounded-full bg-white shadow-energy" />
        
        {/* Orbiting particles */}
        <div className="absolute inset-0 animate-spin">
          <div className="absolute -top-1 left-1/2 w-2 h-2 bg-secondary rounded-full shadow-energy transform -translate-x-1/2" />
          <div className="absolute top-1/2 -right-1 w-1.5 h-1.5 bg-accent rounded-full shadow-magic transform -translate-y-1/2" />
          <div className="absolute -bottom-1 left-1/2 w-2 h-2 bg-primary rounded-full shadow-plasma transform -translate-x-1/2" />
          <div className="absolute top-1/2 -left-1 w-1.5 h-1.5 bg-secondary rounded-full shadow-energy transform -translate-y-1/2" />
        </div>
      </div>
      
      {/* Loading text with gradient animation */}
      <div className="text-center space-y-2">
        <p className="text-lg font-semibold text-gradient-magic animate-pulse">
          Checking eligibility...
        </p>
      </div>
      
      {/* Floating energy particles around the loader */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1 h-1 bg-primary rounded-full shadow-magic float-fast opacity-60" />
        <div className="absolute bottom-0 right-1/4 w-1 h-1 bg-secondary rounded-full shadow-energy float-medium opacity-70" />
        <div className="absolute top-1/2 left-0 w-1 h-1 bg-accent rounded-full shadow-plasma float-slow opacity-50" />
        <div className="absolute top-1/2 right-0 w-1 h-1 bg-primary rounded-full shadow-magic float-fast opacity-60" />
      </div>
    </div>
  );
};

export default PlasmaLoader;