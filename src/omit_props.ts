/**
 * Omit specified properties from an object.
 *
 * @template T - The type of the object.
 * @template K - The type of the keys to omit.
 * @param obj - The object from which to omit properties.
 * @param keys - The keys to omit from the object.
 * @returns A new object with the specified properties omitted.
 */
export default function omitProps<T extends object, K extends keyof T>(
	obj: T,
	keys: K[]
): Omit<T, K> {
	return Object.fromEntries(
		Object.entries(obj).filter(([key]) => !keys.includes(key as K))
	) as Omit<T, K>;
}
