/**
 * Formats a raw phone string for clean, human-readable display across the application.
 * Supports Ethiopian mobile numbers (Ethio Telecom 09... / +251 9... and Safaricom 07... / +251 7...),
 * North American standard format, and generic international numbers.
 */
export const formatPhone = (phone: string | null | undefined, fallback = "—"): string => {
  if (!phone) return fallback;

  const trimmed = phone.trim();
  const digits = trimmed.replace(/\D/g, "");

  if (!digits) return fallback;

  // Ethiopian numbers with country code: +251 9XX XXX XXX or +251 7XX XXX XXX (12 digits)
  if (digits.startsWith("251") && digits.length === 12) {
    const local = digits.slice(3); // 9XXXXXXXX or 7XXXXXXXX
    return `+251 ${local.slice(0, 2)} ${local.slice(2, 5)} ${local.slice(5)}`;
  }

  // Ethiopian numbers local format: 09XX XXX XXX or 07XX XXX XXX (10 digits)
  if (digits.length === 10 && (digits.startsWith("09") || digits.startsWith("07"))) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }

  // Generic 10-digit format (e.g. 011... or US 10-digit)
  if (digits.length === 10 && digits.startsWith("0")) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }

  // Generic international: +<country> <rest grouped in 3s>
  if (trimmed.startsWith("+")) {
    const groups = digits.match(/.{1,3}/g) ?? [];
    return `+${groups.join(" ")}`;
  }

  // North America 10-digit fallback without leading 0
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  // Fallback: group in 3s if long enough
  return digits.match(/.{1,3}/g)?.join(" ") ?? trimmed;
};
