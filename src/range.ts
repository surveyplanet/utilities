/**
 * Generates an array of sequential numbers between two values.
 *
 * Supports both ascending and descending ranges. By default, the range
 * is exclusive (the end value is omitted). Set `inclusive` to `true`
 * to include the end value.
 *
 * @param start - The first value in the range.
 * @param end - The boundary value of the range.
 * @param inclusive - Whether to include the end value. Defaults to `false`.
 * @returns An array of numbers from `start` toward `end`.
 *
 * @example
 * // Exclusive ascending range
 * range(1, 5); // [1, 2, 3, 4]
 *
 * @example
 * // Inclusive ascending range
 * range(1, 5, true); // [1, 2, 3, 4, 5]
 *
 * @example
 * // Exclusive descending range
 * range(5, 1); // [5, 4, 3, 2]
 *
 * @example
 * // Inclusive descending range
 * range(5, 1, true); // [5, 4, 3, 2, 1]
 */
export function range(
	start: number,
	end: number,
	inclusive: boolean = false
): number[] {
	const results: number[] = [];
	const ascending: boolean = start < end;

	if (inclusive) {
		end = ascending ? end + 1 : end - 1;
	}

	const condition = (i: number): boolean => (ascending ? i < end : i > end);
	const step = (i: number): number => (ascending ? i + 1 : i - 1);

	for (let i: number = start; condition(i); i = step(i)) {
		results.push(i);
	}

	return results;
}
