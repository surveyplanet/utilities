/**
 * Check if the code is running in a web worker:
 * https://developer.mozilla.org/en-US/docs/Web/API/Worker
 *
 * @name inWorker
 * @returns {Boolean}
 */
export default typeof self === 'object' &&
	self.constructor.name === 'DedicatedWorkerGlobalScope';
