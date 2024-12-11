// The once function is a higher-order function that takes a function (fn) as an argument.
// It returns a new function that, when called, will first call the original function (fn),
// and then assign an empty function to fn, preventing it from being called again.
/* eslint-disable @typescript-eslint/ban-types */
export function once(fn: Function) {
	let called = false;
	return function (this: any, ...args: any[]) {
		if (!called) {
			called = true;
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			return fn.apply(this, args);
		}
	};
}
/* eslint-enable @typescript-eslint/ban-types */
