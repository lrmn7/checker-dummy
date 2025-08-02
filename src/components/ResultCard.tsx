import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FaDownload, FaXTwitter } from "react-icons/fa6";

interface ResultCardProps {
  amount: number;
  isEligible: boolean;
  onDownload: () => void;
  onShare: () => void;
}

/**
 * ResultCard Component
 * Displays the airdrop eligibility result based on the 'isEligible' prop.
 */
const ResultCard: React.FC<ResultCardProps> = ({
  amount,
  isEligible,
  onDownload,
  onShare,
}) => {
  return (
    <Card
      id="result-card"
      className="w-full max-w-md mx-auto bg-gradient-card/30 backdrop-blur-md border-2 border-primary/20 shadow-card"
    >
      <div className="p-8 text-center space-y-6">
        {isEligible ? (
          // Display for an ELIGIBLE wallet
          <>
            {/* Header with emoji and congratulations */}
            <div className="space-y-2">
              <div className="text-4xl">🎉</div>
              <h2 className="text-2xl font-bold text-gradient-magic">Congrats!</h2>
            </div>

            {/* Eligibility message and amount */}
            <div className="space-y-3">
              <p className="text-lg text-foreground/90">You are eligible for</p>
              <div className="text-4xl font-bold">
                <span className="text-foreground/90">
                  {amount.toLocaleString()}
                </span>{" "}
                <span className="text-gradient-plasma"> $SOM</span>
              </div>
              <p className="text-sm text-gray-600">
                Somnia tokens will be distributed soon! ✨
              </p>
            </div>
          </>
        ) : (
          // Display for a NOT ELIGIBLE wallet
          <>
            {/* Header with emoji and message */}
            <div className="space-y-2">
              <div className="text-4xl">😞</div>
              <h2 className="text-2xl font-bold text-red-400">Oops!</h2>
            </div>

            {/* Ineligibility message */}
            <div className="space-y-3">
            <p className="text-lg text-foreground/80">
              Unfortunately, you're <strong>NOT ELIGIBLE</strong>.
            </p>
            <p className="text-sm text-gray-600">
              Stay tuned for upcoming events!
            </p>
            </div>
          </>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            onClick={onShare}
            className="btn-anime-primary flex-1 text-sm"
          >
            <FaXTwitter className="mr-1" /> Share
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="flex justify-center space-x-2 pt-2">
          <div className="w-2 h-2 bg-primary rounded-full opacity-60"></div>
          <div className="w-2 h-2 bg-secondary rounded-full opacity-60"></div>
          <div className="w-2 h-2 bg-accent rounded-full opacity-60"></div>
        </div>
      </div>
    </Card>
  );
};

export default ResultCard;