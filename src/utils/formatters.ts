export function formatCurrency(
  amount: number,
  _currencyCode: string = 'USD',
  currencySymbol: string = '$'
): string {
  return `${currencySymbol}${amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

export function calculateDiscountPercent(originalPrice: number, currentPrice: number): number {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}
