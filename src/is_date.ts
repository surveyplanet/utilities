/**
 * Check if a given value is a Javascript Date object.
 *
 * @template T - The type of the input object.
 * @param {T} value - The value to check.
 * @returns {boolean} - Whether the input value is Date or not.
 */
export default function isDate<T>(value: T): value is Extract<T, Date> {
	return value instanceof Date && !isNaN(value.getTime());
}
