
export const calculateTokenIssuanceFee = (totalSupply: string): number => {
  const supply = parseFloat(totalSupply) || 0;
  return supply * 0.0001; // 0.01%
};

export const calculateLpFee = (tokenAmount: string): number => {
  const amount = parseFloat(tokenAmount) || 0;
  return amount * 0.001; // 0.1%
};
