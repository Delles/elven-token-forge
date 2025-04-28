
import React from 'react';
import { cn } from '@/lib/utils';
import WalletConnect from './WalletConnect';

const NavBar = ({ className }: { className?: string }) => {
  return (
    <div className={cn("w-full py-4 px-6 flex justify-between items-center", className)}>
      <div className="flex items-center gap-2">
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-elven-gradient">
          Elven Token Forge
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <WalletConnect />
      </div>
    </div>
  );
};

export default NavBar;
