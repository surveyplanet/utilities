/**
 * Appends the appropriate ordinal suffix to a given integer, converting it into
 * an ordinal string representation (e.g., 1 → "1st", 2 → "2nd", 3 → "3rd",
 * 4 → "4th", ..., 21 → "21st", 112 → "112th").
 *
 * Handles standard English rules for ordinal indicators:
 * - Numbers ending in 1 (except 11) get "st"
 * - Numbers ending in 2 (except 12) get "nd"
 * - Numbers ending in 3 (except 13) get "rd"
 * - All other numbers (including 11, 12, 13, and any number ending in 0, 4–9)
 *   get "th"
 *
 * Note: The function works correctly for negative numbers as well, preserving
 * the sign while appending the suffix to the absolute value's representation.
 *
 * @param n - The integer to convert to an ordinal string.
 * @returns The ordinal string representation of the input number.
 */
export function ordinalSuffix(val: number): string {
	const absVal = Math.abs(val); // make sure negative numbers are handled correctly
	const lastDigit = absVal % 10;
	const lastTwoDigits = absVal % 100;
	if (lastDigit === 1 && lastTwoDigits !== 11) return `${val}st`;
	if (lastDigit === 2 && lastTwoDigits !== 12) return `${val}nd`;
	if (lastDigit === 3 && lastTwoDigits !== 13) return `${val}rd`;
	return `${val}th`;
}
