/* eslint-disable @typescript-eslint/no-unsafe-return */
// The debounce function is a higher-order function that takes a function (fn) as an argument.
// It returns a new function that, when called, will first call the clearTimeout method on the event object,
// preventing the event from bubbling up the DOM tree, and then call the original function (fn).
/* eslint-disable @typescript-eslint/ban-types */

export function debounce(fn: Function) {
	let timeout: NodeJS.Timeout;
	return function (event: Event) {
		clearTimeout(timeout);
		timeout = setTimeout(() => fn.call(event), 100);
	};
}

/* eslint-enable @typescript-eslint/ban-types */
/* eslint-enable @typescript-eslint/no-unsafe-return */
