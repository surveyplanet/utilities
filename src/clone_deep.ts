/**
 * Creates a deep copy of the input object.
 *
 * @template T - The type of the input object.
 * @param {T} input - The input object to clone.
 * @returns {T} - A deep copy of the input object.
 */
export default function cloneDeep<T>(input: T): T {
	let cloned: T;

	try {
		cloned = structuredClone(input);
	} catch (e) {
		cloned = JSON.parse(JSON.stringify(input)) as T;
	}

	return cloned;
}
