/**
 * Capitalize the first letter of a given string.
 *
 * @function titleize
 * @returns {string}
 */
export const titleize = (str: string): string => {
	if (!str) return str;
	return str.charAt(0).toUpperCase() + str.slice(1);
};
