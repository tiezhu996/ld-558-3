export function formatNumber(value: number, digits = 0): string {
  return value.toLocaleString('zh-CN', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  });
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export function toMonth(date: string): string {
  return date.slice(0, 7);
}

