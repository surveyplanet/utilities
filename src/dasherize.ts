/**
 * Converts a string to dasherize case.
 *
 * @function dasherize
 * @param {string} str - The string to convert
 * @param {string} [delimiter='-'] - The delimiter to use
 * @returns {string}
 */
export const dasherize = (str: string, delimiter: '-' | '_' = '-'): string => {
	return str
		.toLowerCase()
		.replace(/[^\p{L}\p{N}\s\-_]/gu, '')
		.replace(/\s/g, delimiter);
};
