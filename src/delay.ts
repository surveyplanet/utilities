/**
 * Delay call stack for x milliseconds
 *
 * @function delay
 * @param {number} [ms=0] - The number of milliseconds to delay
 * @async
 * @returns Promise<void>
 */
export const delay = (ms = 0): Promise<void> => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
