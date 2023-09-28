/**
 * Check if the code is running in a web browser:
 *
 * @name inWorker
 * @returns {Boolean}
 */
export default typeof window !== 'undefined' &&
	typeof window.document !== 'undefined';
