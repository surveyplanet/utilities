// insert.test.ts
import { describe, it, expect } from 'vitest';
import { insert } from '..';

describe('insert', () => {
	it('inserts an item at the beginning of an array', () => {
		const original = [2, 3, 4];
		const result = insert(original, 0, 1);
		expect(result).toStrictEqual([1, 2, 3, 4]);
		expect(original).toStrictEqual([2, 3, 4]); // Ensure original is not mutated
	});

	it('inserts an item in the middle of an array', () => {
		const original = [1, 2, 4, 5];
		const result = insert(original, 2, 3);
		expect(result).toStrictEqual([1, 2, 3, 4, 5]);
		expect(original).toStrictEqual([1, 2, 4, 5]);
	});

	it('inserts an item at the end of an array', () => {
		const original = [1, 2, 3];
		const result = insert(original, 3, 4);
		expect(result).toStrictEqual([1, 2, 3, 4]);
		expect(original).toStrictEqual([1, 2, 3]);
	});

	it('works with an empty array', () => {
		const original: number[] = [];
		const result = insert(original, 0, 1);
		expect(result).toStrictEqual([1]);
		expect(original).toStrictEqual([]);
	});

	it('works with arrays of different types', () => {
		const original = ['apple', 'orange', 'grape'];
		const result = insert(original, 1, 'banana');
		expect(result).toStrictEqual(['apple', 'banana', 'orange', 'grape']);
		expect(original).toStrictEqual(['apple', 'orange', 'grape']);
	});

	it('throws an error when index is negative', () => {
		const original = [1, 2, 3];
		expect(insert(original, -1, 0)).toEqual(original);
	});

	it('throws an error when index is greater than array length', () => {
		const original = [1, 2, 3];
		expect(insert(original, 4, 5)).toEqual(original);
	});

	it('correctly handles readonly arrays', () => {
		const original: readonly number[] = [1, 2, 4];
		const result = insert(original, 2, 3);
		expect(result).toStrictEqual([1, 2, 3, 4]);
	});
});
