
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LiquidityProvisionWizardComponent } from '@/components/ui'; // Updated import path

interface LiquidityProvisionWizardProps {
  onComplete?: () => void;
}

// This is just a wrapper that will provide navigate to the component
// The actual implementation is in a read-only file
const LiquidityProvisionWizard: React.FC<LiquidityProvisionWizardProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  
  // Pass navigate to the underlying component that needs it
  return (
    <LiquidityProvisionWizardComponent navigate={navigate} onComplete={onComplete} />
  );
};

export default LiquidityProvisionWizard;
