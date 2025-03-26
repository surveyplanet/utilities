/**
 * Inserts an item at the specified index in an array without mutating the original array
 * @param array The original array
 * @param index The index at which to insert the item
 * @param item The item to insert
 * @returns A new array with the item inserted at the specified index. If the index is out of bounds, the original array is returned.
 */
export function insert<T>(array: readonly T[], index: number, item: T): T[] {
	// Validate index
	if (index < 0 || index > array.length) {
		return [...array];
	}

	return [...array.slice(0, index), item, ...array.slice(index)];
}
