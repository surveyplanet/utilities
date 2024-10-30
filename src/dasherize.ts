/**
 * Converts a string to dasherize case.
 *
 * @function dasherize
 * @see https://stackoverflow.com/questions/16427636/check-if-localstorage-is-available
 * @returns {boolean}
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
