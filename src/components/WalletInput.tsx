import React, { useState } from 'react';
import { Input } from '@/components/ui/input';

interface WalletInputProps {
  onWalletChange: (wallet: string, isValid: boolean) => void;
  disabled?: boolean;
}

/**
 * WalletInput Component
 * Handles Ethereum wallet address input with real-time validation
 * Validates using regex: /^0x[a-fA-F0-9]{40}$/
 */
const WalletInput: React.FC<WalletInputProps> = ({ onWalletChange, disabled = false }) => {
  const [wallet, setWallet] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  // Ethereum address validation regex
  const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;

  const validateWallet = (address: string): boolean => {
    return ethereumAddressRegex.test(address);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWallet(value);
    
    const isValid = validateWallet(value);
    
    // Show error only if user has typed something and it's invalid
    if (value && !isValid) {
      setError('Please enter a valid EVM address');
    } else {
      setError('');
    }
    
    onWalletChange(value, isValid);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  return (
    <div className="w-full max-w-md space-y-2">
      <div className="relative">
        <Input
          type="text"
          placeholder="0x4470015801CA72eccA3E94b1C0125Ed4fF91772c"
          value={wallet}
          onChange={handleInputChange}
          onBlur={handleBlur}
          disabled={disabled}
          className={`
            w-full px-4 py-3 text-lg rounded-xl border-2 transition-magic
            bg-input/80 backdrop-blur-sm text-foreground
            placeholder:text-muted-foreground
            focus:border-primary focus:shadow-magic focus:outline-none
            ${error && touched ? 'border-destructive' : 'border-border'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        />
        
        {/* Glowing border effect when focused and valid */}
        {wallet && validateWallet(wallet) && (
          <div className="absolute inset-0 rounded-xl border-2 border-primary animate-pulse opacity-50 pointer-events-none" />
        )}
      </div>
      
      {/* Error message */}
      {error && touched && (
        <p className="text-destructive text-sm font-medium animate-fade-in">
          ⚠️ {error}
        </p>
      )}
      
      {/* Valid indicator */}
      {wallet && validateWallet(wallet) && (
        <p className="text-secondary text-sm font-medium animate-fade-in">
          ✨ Valid Ethereum address detected
        </p>
      )}
    </div>
  );
};

export default WalletInput;