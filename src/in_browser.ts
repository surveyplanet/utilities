/**
 * Check if the code is running in a web browser:
 *
 * @name inWorker
 * @returns {Boolean}
 */
export const inBrowser =
	typeof window !== 'undefined' && typeof window.document !== 'undefined';
