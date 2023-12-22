/**
 * Check if a given value is a plain object.
 *
 * @template T - The type of the input object.
 * @param {T} value - The value to check against.
 * @returns {boolean} - Whether the input value is a plain object or not.
 */
export default function isPlainObject<T>(
	value: T
): value is Extract<T, object> {
	return (
		typeof value === 'object' &&
		value !== null &&
		value.constructor === Object &&
		Object.prototype.toString.call(value) === '[object Object]'
	);
}
