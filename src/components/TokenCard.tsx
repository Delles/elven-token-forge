
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface TokenCardProps {
  token: {
    symbol: string;
    name: string;
    balance: string;
  };
  isSelected: boolean;
  onClick: () => void;
}

const TokenCard: React.FC<TokenCardProps> = ({ token, isSelected, onClick }) => {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 relative group overflow-visible", 
        isSelected ? "ring-2 ring-[#9b87f5] shadow-lg bg-[#F1F0FB]" : "hover:shadow-md"
      )}
      onClick={onClick}
    >
      {isSelected && (
        <div className="absolute -top-2 -right-2 bg-[#9b87f5] rounded-full p-1 shadow-md z-10">
          <Star className="h-4 w-4 text-white" />
        </div>
      )}
      <CardContent className="p-4">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="font-bold text-2xl">{token.symbol}</div>
          <div className="text-sm text-gray-500">{token.name}</div>
          <div className="mt-2">{token.balance}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenCard;
