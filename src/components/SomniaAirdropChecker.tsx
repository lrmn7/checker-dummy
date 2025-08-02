import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import WalletInput from "./WalletInput";
import PlasmaLoader from "./PlasmaLoader";
import ResultCard from "./ResultCard";

/**
 * SomniaAirdropChecker Component
 * Main component that orchestrates the entire airdrop checking flow
 */
const SomniaAirdropChecker: React.FC = () => {
  const [wallet, setWallet] = useState("");
  const [isValidWallet, setIsValidWallet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [isEligible, setIsEligible] = useState(false);

  /**
   * Generates a random token amount between 1000 and 100000
   */
  const generateRandomAmount = (): number => {
    return Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;
  };

  /**
   * Handles wallet input changes and validation
   */
  const handleWalletChange = (walletAddress: string, isValid: boolean) => {
    setWallet(walletAddress);
    setIsValidWallet(isValid);
  };

  /**
   * Simulates the eligibility check with a 2-3 second delay
   */
  const handleCheckEligibility = async () => {
    if (!isValidWallet) return;

    setIsLoading(true);

    // Simulate API call with 2-3 second delay
    const delay = 6000 + Math.random() * 1000;
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Logic to determine eligibility (10% chance to be ineligible)
    const eligibilityRoll = Math.random();
    const eligible = eligibilityRoll > 0.1;

    if (eligible) {
      const amount = generateRandomAmount();
      setTokenAmount(amount);
      setIsEligible(true);
    } else {
      setTokenAmount(0);
      setIsEligible(false);
    }

    setIsLoading(false);
    setShowResult(true);
  };

  /**
   * Downloads result card as PNG image
   */
  const handleDownloadResult = async () => {
    const cardElement = document.getElementById("result-card");
    if (!cardElement) return;

    try {
      // Create a canvas to capture the card
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Get card dimensions
      const rect = cardElement.getBoundingClientRect();
      const scale = 2; // Higher resolution
      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;
      ctx.scale(scale, scale);

      // Create a more detailed card for download
      const downloadCanvas = document.createElement("canvas");
      const downloadCtx = downloadCanvas.getContext("2d");
      if (!downloadCtx) return;

      downloadCanvas.width = 600;
      downloadCanvas.height = 400;

      // Background gradient
      const gradient = downloadCtx.createLinearGradient(0, 0, 600, 400);
      gradient.addColorStop(0, "hsl(220, 40%, 15%)");
      gradient.addColorStop(1, "hsl(280, 50%, 20%)");
      downloadCtx.fillStyle = gradient;
      downloadCtx.fillRect(0, 0, 600, 400);

      // Border
      downloadCtx.strokeStyle = "hsl(280, 100%, 70%)";
      downloadCtx.lineWidth = 4;
      downloadCtx.strokeRect(10, 10, 580, 380);

      // Text content
      downloadCtx.fillStyle = "white";
      downloadCtx.font = "bold 32px Arial";
      downloadCtx.textAlign = "center";
      downloadCtx.fillText("🎉 Congrats! 🎉", 300, 80);

      downloadCtx.font = "bold 24px Arial";
      downloadCtx.fillText("You are eligible for", 300, 140);

      // Gradient text for amount
      const amountGradient = downloadCtx.createLinearGradient(0, 160, 600, 200);
      amountGradient.addColorStop(0, "hsl(320, 100%, 70%)");
      amountGradient.addColorStop(0.5, "hsl(280, 100%, 70%)");
      amountGradient.addColorStop(1, "hsl(200, 100%, 60%)");
      downloadCtx.fillStyle = amountGradient;
      downloadCtx.font = "bold 48px Arial";
      downloadCtx.fillText(`${tokenAmount.toLocaleString()} SOM`, 300, 200);

      downloadCtx.fillStyle = "hsl(280, 30%, 70%)";
      downloadCtx.font = "18px Arial";
      downloadCtx.fillText(
        "Somnia tokens will be distributed soon! ✨",
        300,
        240
      );

      downloadCtx.fillStyle = "hsl(280, 50%, 60%)";
      downloadCtx.font = "16px Arial";
      downloadCtx.fillText(
        `Wallet: ${wallet.slice(0, 6)}...${wallet.slice(-4)}`,
        300,
        280
      );

      downloadCtx.fillStyle = "hsl(280, 100%, 70%)";
      downloadCtx.font = "bold 20px Arial";
      downloadCtx.fillText("stay with somnia", 300, 340);

      // Convert to blob and download
      downloadCanvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `somnia-airdrop-${wallet.slice(0, 6)}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      }, "image/png");
    } catch (error) {
      console.error("Error downloading result:", error);
      // Fallback to text download
      const resultText = `🎉 Somnia Airdrop Result 🎉\n\nWallet: ${wallet}\nEligible Amount: ${tokenAmount.toLocaleString()} SOM\n\nStay with Somnia! ✨`;
      const blob = new Blob([resultText], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `somnia-airdrop-${wallet.slice(0, 6)}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  /**
   * Opens Twitter with pre-filled tweet about the airdrop result
   */
  const handleShareToTwitter = () => {
    const tweetText = `Just checked my @Somnia_Network airdrop eligibility and I'm getting ${tokenAmount.toLocaleString()} $SOM tokens! ✨

Check your eligibility now 👉 https://checker.lrmn.link/

#Somnia #Airdrop #Metaverse`;

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;
    window.open(twitterUrl, "_blank");
  };

  /**
   * Resets the checker to initial state
   */
  const handleReset = () => {
    setWallet("");
    setIsValidWallet(false);
    setIsLoading(false);
    setShowResult(false);
    setTokenAmount(0);
    setIsEligible(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient-magic leading-tight">
            Somnia Network
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gradient-plasma">
            Eligibility Checker
          </h2>
          {!showResult && (
            <p className="text-lg font-bold text-gradient-magic leading-tight max-w-md mx-auto">
              Enter your EVM wallet address and check your eligibility for the
              Somnia Airdrop.
            </p>
          )}
        </div>

        {/* Main content area */}
        <div className="space-y-8">
          {!showResult ? (
            <>
              {!isLoading ? (
                // Input and check button
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <WalletInput
                      onWalletChange={handleWalletChange}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="flex justify-center">
                    <Button
                      onClick={handleCheckEligibility}
                      disabled={!isValidWallet || isLoading}
                      className={`
                        btn-anime-primary text-lg px-12 py-4 rounded-xl
                        disabled:opacity-50 disabled:cursor-not-allowed
                        disabled:hover:scale-100 disabled:hover:brightness-100
                      `}
                    >
                      ✨ Check Eligibility
                    </Button>
                  </div>
                </div>
              ) : (
                // Loading state
                <div className="flex justify-center py-12">
                  <PlasmaLoader />
                </div>
              )}
            </>
          ) : (
            // Result state
            <div className="space-y-6 animate-fade-in">
              <ResultCard
                amount={tokenAmount}
                isEligible={isEligible}
                onDownload={handleDownloadResult}
                onShare={handleShareToTwitter}
              />

              {/* Reset button */}
              <div className="flex justify-center">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="text-muted-foreground btn-anime-primary transition-magic"
                >
                  Check Another Address
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Decorative elements */}
        {!isLoading && (
          <div className="flex justify-center space-x-4 opacity-40">
            <div className="w-2 h-2 bg-primary rounded-full float-slow"></div>
            <div className="w-1.5 h-1.5 bg-secondary rounded-full float-medium"></div>
            <div className="w-2 h-2 bg-accent rounded-full float-fast"></div>
            <div className="w-1.5 h-1.5 bg-primary rounded-full float-slow"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SomniaAirdropChecker;