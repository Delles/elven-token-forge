
import { useState } from 'react';

// This is a simplified mock hook for development purposes only
export const useWalletConnection = () => {
  // Hard-code isConnected to true for development purposes
  // This simulates an always-connected state
  const [isConnected] = useState(true);
  const [address] = useState('erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls8a5w6u');
  
  return {
    isConnected,
    address
  };
};
