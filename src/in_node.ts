/**
 * Check if the code is running in Node.js
 *
 * @name inNode
 * @returns {Boolean}
 */
export default typeof process !== 'undefined' &&
	process.versions != null &&
	process.versions.node != null;
