
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWalletConnection } from '@/hooks/useWalletConnection';
import { toast } from '@/components/ui/sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const { isConnected } = useWalletConnection();

  useEffect(() => {
    if (!isConnected) {
      toast.error("Please connect your wallet to access this page", {
        description: "You need to be connected to access token operations"
      });
      navigate('/');
    }
  }, [isConnected, navigate]);

  if (!isConnected) {
    return null; // Don't render anything while redirecting
  }

  return <>{children}</>;
};

export default ProtectedRoute;
