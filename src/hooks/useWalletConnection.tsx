// src/hooks/useWalletConnection.tsx
import { useState, useCallback, useEffect } from "react";

// Store the dummy connection state here at the module level
let _isConnected = false; // Start as connected by default for development
const _address =
    "erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls8a5w6u";

// Keep track of components that need to re-render when _isConnected changes
const subscribers = new Set<() => void>();

const notifySubscribers = () => {
    subscribers.forEach((callback) => callback());
};

export const useWalletConnection = () => {
    const [isConnected, setIsConnected] = useState(_isConnected);

    useEffect(() => {
        // This function will be called when _isConnected changes externally
        const handleConnectionChange = () => {
            setIsConnected(_isConnected);
        };
        subscribers.add(handleConnectionChange);
        return () => {
            subscribers.delete(handleConnectionChange);
        };
    }, []);

    const mockConnect = useCallback(() => {
        if (!_isConnected) {
            _isConnected = true;
            notifySubscribers(); // Notify all subscribers (including this hook instance in other components)
        }
    }, []);

    const mockDisconnect = useCallback(() => {
        if (_isConnected) {
            _isConnected = false;
            notifySubscribers();
        }
    }, []);

    return {
        isConnected,
        address: _address,
        mockConnect,
        mockDisconnect,
    };
};
