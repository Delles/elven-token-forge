
import React from 'react';
import WalletConnectComponent from '../WalletConnect'; // This imports the actual component from the root components folder

// This is just a re-export of the WalletConnect component for consistency
export const WalletConnect: React.FC = () => {
  return <WalletConnectComponent />;
};
