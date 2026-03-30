/**
 * Capitalize the first letter of a given string. This is intended to satisfy the
 * Microsoft style guide sentence-style casing, that is, only capitalize the
 * first word of a title, like at the beginning of a sentence.
 *
 * @function titleize
 * @see https://learn.microsoft.com/en-us/style-guide/capitalization#sentence-style-capitalization-in-titles-and-headings
 * @todo If string includes a colon, capitalize the first word after it. e.g.:
 * "Section one: Important details". This will make this function much more complex
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
				return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
			} else {
				return word.toLowerCase();
			}
		})
		.join(' ');
};
