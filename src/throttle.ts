// The throttle function is a higher-order function that takes a function (fn) as an argument.
// It returns a new function that, when called, will first call the clearTimeout method on the event object,
// preventing the event from bubbling up the DOM tree, and then call the original function (fn).
/* eslint-disable @typescript-eslint/ban-types */

export function throttle(fn: Function) {
	let wait = false;
	return function (event: Event) {
		if (!wait) {
			fn.call(event);
			wait = true;
			setTimeout(() => (wait = false), 300);
		}
	};
}

/* eslint-enable @typescript-eslint/ban-types */
