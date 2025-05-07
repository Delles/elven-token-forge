
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TokenIssuanceWizardComponent } from '@/components/ui'; // Updated import path

interface TokenIssuanceWizardProps {
  onComplete?: () => void;
}

// This is just a wrapper that will provide navigate to the component
// The actual implementation is in a read-only file
const TokenIssuanceWizard: React.FC<TokenIssuanceWizardProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  
  // Pass navigate to the underlying component that needs it
  return (
    <TokenIssuanceWizardComponent navigate={navigate} onComplete={onComplete} />
  );
};

export default TokenIssuanceWizard;
