/**
 * Converts a string to dasherize case.
 *
 * @function dasherize
 * @param {string} str - The string to convert
 * @param {string} [delimiter='-'] - The delimiter to use
 * @returns {string}
 */
export const dasherize = (str: string, delimiter: '-' | '_' = '-'): string => {
	str = str
		.trim()
		.replace(/([A-Z])/g, `${delimiter}$1`)
		.replace(/[-_\s]+/g, delimiter)
		.toLowerCase();

	if (str.startsWith(delimiter)) {
		str = str.substring(1);
	}

	return str;
};
