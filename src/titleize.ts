/**
 * Capitalize the first letter of a given string.
 *
 * @function titleize
 * @returns {string}
 */
export const titleize = (str: string): string => {
	if (!str) return str;

	// Split the string into words
	const words = str.split(/\s+/);

	// Process each word
	return words
		.map((word, index) => {
			// Check if word is likely an acronym (all uppercase and at least 2 chars)
			if (word.length >= 2 && word === word.toUpperCase()) {
				return word; // Keep acronyms as is
			}

			// First word gets capitalized, all others lowercase
			if (index === 0) {
				return (
					word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
				);
			} else {
				return word.toLowerCase();
			}
		})
		.join(' ');
};
