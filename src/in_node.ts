/**
 * Check if the code is running in Node.js using the `process` and Object.prototype.hasOwnProperty.call() method.
 *
 * @name inNode
 * @returns {Boolean}
 */
export const inNode =
	typeof process !== 'undefined' &&
	Object.prototype.hasOwnProperty.call(process, 'versions') &&
	Object.prototype.hasOwnProperty.call(process.versions, 'node');
