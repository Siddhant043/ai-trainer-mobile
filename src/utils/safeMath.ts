/**
 * Utility functions to prevent NaN values in calculations
 */

export const safeNumber = (value: any, fallback: number = 0): number => {
  if (typeof value !== "number" || isNaN(value) || !isFinite(value)) {
    return fallback;
  }
  return value;
};

export const safeDimensions = (dimensions: any) => {
  return {
    width: safeNumber(dimensions?.width, 375),
    height: safeNumber(dimensions?.height, 812),
  };
};

export const safeProgress = (progress: any): number => {
  const safe = safeNumber(progress, 0);
  return Math.max(0, Math.min(1, safe));
};

export const safeCalculation = (
  value: any,
  operation: (val: number) => number,
  fallback: number = 0
): number => {
  const safe = safeNumber(value, fallback);
  const result = operation(safe);
  return safeNumber(result, fallback);
};

// Global NaN protection for all numeric operations
export const protectFromNaN = (value: any): number => {
  if (value === null || value === undefined) return 0;
  if (typeof value === "string") {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  }
  if (typeof value === "number") {
    return isNaN(value) || !isFinite(value) ? 0 : value;
  }
  return 0;
};
