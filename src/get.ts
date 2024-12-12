type PropertyPath = string | number | symbol | (string | number | symbol)[];

/**
 * Gets the value at path of object. If the resolved value is undefined, the
 * defaultValue is returned in its place. Path can be specified as a string
 * with dot notation or as an array of path segments.
 *
 * @param object The object to query
 * @param path The path of the property to get
 * @param defaultValue The value returned for undefined resolved values
 * @returns Returns the resolved value
 */
export function get<T extends object, D = undefined>(
	object: T | null | undefined,
	path: PropertyPath,
	defaultValue?: D
): D | undefined {
	if (object == null) {
		return defaultValue;
	}

	const segments = Array.isArray(path)
		? path
		: String(path)
				.split('.')
				.filter(Boolean)
				.map((segment) => {
					// Handle array indexing with bracket notation
					const match = segment.match(/^(\w+)(?:\[(\d+)])?$/);
					if (match) {
						const [, key, index] = match;
						return index ? [key, index] : key;
					}
					return segment;
				})
				.flat();

	let result: unknown = object;

	for (const segment of segments) {
		if (result == null || typeof result !== 'object') {
			return defaultValue;
		}

		result = (result as Record<string | number | symbol, unknown>)[segment];
	}

	return result === undefined ? defaultValue : (result as D);
}
