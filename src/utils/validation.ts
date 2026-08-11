/**
 * Reusable client-side input validation rules — era-web-frontend.
 */

/**
 * Validates a human-readable name field (e.g. Full Name, Company Name, etc.)
 */
export function validateRequiredName(name: string, label: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) {
    return `${label} is required`;
  }
  if (trimmed.length < 2) {
    return `${label} must be at least 2 characters`;
  }
  return null;
}

/**
 * Validates a username (alphanumeric, dots, underscores, min 3 chars)
 */
export function validateUsername(username: string): string | null {
  const trimmed = username.trim();
  if (!trimmed) {
    return "Username is required";
  }
  if (trimmed.length < 3) {
    return "Username must be at least 3 characters";
  }
  if (!/^[a-zA-Z0-9_\.]+$/.test(trimmed)) {
    return "Username can only contain letters, numbers, underscores, and dots";
  }
  return null;
}

/**
 * Validates an email address format.
 * Returns null if empty (optional field) or if valid.
 */
export function validateEmail(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return "Email format is invalid (e.g. name@example.com)";
  }
  return null;
}

/**
 * Validates an email address format — Required version.
 */
export function validateRequiredEmail(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return "Email format is invalid (e.g. name@example.com)";
  }
  return null;
}

/**
 * Validates a phone number.
 * Allows digits and exactly zero or one "+" sign at the very beginning.
 * No spaces, letters, parentheses, or multiple '+' allowed.
 * Enforces local/international length constraints.
 */
export function validatePhone(phone: string): string | null {
  const trimmed = phone.trim();
  if (!trimmed) return null; // Optional

  if (trimmed.length > 13) {
    return "Phone number cannot exceed 13 characters";
  }

  // Only digits and an optional single leading '+'
  if (!/^\+?\d+$/.test(trimmed)) {
    return "Phone number can only contain digits and a single leading '+'";
  }

  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 13) {
    return "Phone number must be between 7 and 13 characters";
  }

  return null;
}

/**
 * Sanitizes a phone input value in real-time.
 * Strips any character that is not a digit.
 * Allows a single "+" only at the very beginning.
 * Maximum 13 characters allowed.
 */
export function sanitizePhone(value: string): string {
  let cleaned = "";
  if (value.startsWith("+")) {
    cleaned = "+" + value.slice(1).replace(/\D/g, "");
  } else {
    cleaned = value.replace(/\D/g, "");
  }
  return cleaned.slice(0, 13);
}

/**
 * Validates password strength (min 6 characters).
 */
export function validatePassword(
  password: string,
  isRequired: boolean,
): string | null {
  if (isRequired && !password) {
    return "Password is required";
  }
  if (password && password.length < 6) {
    return "Password must be at least 6 characters";
  }
  return null;
}

/**
 * Validates that two passwords match.
 */
export function validateConfirmPassword(
  password: string,
  confirmPassword: string,
): string | null {
  if (!confirmPassword) return null;
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  return null;
}
