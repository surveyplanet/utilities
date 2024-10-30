/**
 * Generates a unique ID with an optional prefix and suffix.
 * @function uniqueId
 * @param {string} prefix - The optional prefix to prepend to the ID.
 * @param {string} suffix - The optional suffix to append to the ID.
 * @returns {string} The generated unique ID.
 */
export const uniqueId = (prefix?: string, suffix?: string): string => {
	let id = Date.now().toString(36) + Math.random().toString(36).slice(2);

	if (prefix?.length) {
		id = `${prefix}-${id}`;
	}
	if (suffix?.length) {
		id = `${id}-${suffix}`;
	}

	return id;
};
