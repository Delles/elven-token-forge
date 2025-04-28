
export const calculateTokenIssuanceFee = (totalSupply: string): number => {
  const supply = parseFloat(totalSupply) || 0;
  return supply * 0.0001; // 0.01%
};

export const calculateLpFee = (tokenAmount: string, pairingAmount: string): number => {
  const tokenValue = parseFloat(tokenAmount) || 0;
  const pairingValue = parseFloat(pairingAmount) || 0;
  
  // Calculate total value of liquidity provided
  const totalLiquidity = Math.sqrt(tokenValue * pairingValue);
  return totalLiquidity * 0.001; // 0.1% of LP tokens
};

export const calculateExpectedLpTokens = (tokenAmount: string, pairingAmount: string): number => {
  const tokenValue = parseFloat(tokenAmount) || 0;
  const pairingValue = parseFloat(pairingAmount) || 0;
  
  // Initial LP tokens are calculated as the geometric mean of the amounts
  return Math.sqrt(tokenValue * pairingValue);
};
