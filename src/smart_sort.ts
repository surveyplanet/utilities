/**
 * Generic sort function for Record<string, unknown> data
 * @param data - Array of objects to sort
 * @param key - The object property to sort by
 * @param ascending - Sort direction, true for ascending, false for descending
 * @param comparator - Optional custom comparison function
 * @returns Sorted array
 */
export function smartSort<T extends { [K in keyof T]: unknown }>(
	data: T[],
	key: keyof T,
	ascending = true,
	comparator?: (a: unknown, b: unknown) => number
): T[] {
	// Create a copy to avoid modifying the original array
	const sortedData = [...data];

	return sortedData.sort((a, b) => {
		if (comparator) {
			return ascending
				? comparator(a[key], b[key])
				: comparator(b[key], a[key]);
		}

		// undefined or null
		if (a[key] == null) return ascending ? -1 : 1;
		if (b[key] == null) return ascending ? 1 : -1;

		// Strings
		// if (typeof a[key] === 'string' && typeof b[key] === 'string') {
		// 	return ascending
		// 		? (a[key] as string).localeCompare(b[key] as string)
		// 		: (b[key] as string).localeCompare(a[key] as string);
		// }

		// Numbers
		if (typeof a[key] === 'number' && typeof b[key] === 'number') {
			return ascending
				? (a[key] as number) - (b[key] as number)
				: (b[key] as number) - (a[key] as number);
		}

		// Dates
		if (a[key] instanceof Date && b[key] instanceof Date) {
			return ascending
				? (a[key] as Date).getTime() - (b[key] as Date).getTime()
				: (b[key] as Date).getTime() - (a[key] as Date).getTime();
		}

		// Booleans
		if (typeof a[key] === 'boolean' && typeof b[key] === 'boolean') {
			return ascending
				? Number(a[key]) - Number(b[key])
				: Number(b[key]) - Number(a[key]);
		}

		// Default (string)
		return ascending
			? String(a[key]).localeCompare(String(b[key]))
			: String(b[key]).localeCompare(String(a[key]));
	});
}
