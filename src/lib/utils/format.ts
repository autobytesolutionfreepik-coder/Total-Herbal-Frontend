/**
 * Format a Decimal string from the backend into a currency string.
 * NEVER render raw decimal strings — always go through this.
 */
export function formatCurrency(
  value: string | number,
  currency = "USD",
  locale = "en-US"
): string {
  const num = typeof value === "string" ? Number(value) : value;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(num);
}

export function formatDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
): string {
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
}

export function formatRelativeDate(date: string | Date): string {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + "…";
}
