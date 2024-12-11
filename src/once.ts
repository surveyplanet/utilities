export const once = <F extends (...args: Parameters<F>) => ReturnType<F>>(
	func: F
) => {
	let called = false;
	let result: ReturnType<F>;

	return function (...args: Parameters<F>) {
		if (!called) {
			called = true;
			result = func(...args);
		}
		return result;
	};
};
