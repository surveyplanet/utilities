/**
 * Delay call stack for x milliseconds
 *
 * @function delay
 * @param ms=0 {Number} - The number of milliseconds to delay
 * @async
 * @returns Promise<void>
 */
export const delay = async (ms = 0): Promise<void> => {
	return await new Promise((resolve) => setTimeout(resolve, ms));
};
