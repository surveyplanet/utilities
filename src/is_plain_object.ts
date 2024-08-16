/**
 * Check if a given value is a plain object.
 *
 * @param {unknown} value - The value to check against.
 * @returns {boolean} - Whether the input value is a plain object or not.
 */
export default function isPlainObject(value: unknown) {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const proto: object | null = Object.getPrototypeOf(value) as object | null;
	return proto === Object.prototype || proto === null;
}
