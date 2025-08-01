import React from 'react';

const FooterBar: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-10 bg-transparent">
      <div className="container mx-auto px-4 py-3">
        <div className="text-center text-sm font-medium text-gradient-magic space-y-1">
          <p>Stay With Somnia</p>
          <p className="text-xs opacity-70 text-gradient-magic">
            This is a fun-only demo. Not an official airdrop checker.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterBar;
