import { vi, describe, it, expect, expectTypeOf } from 'vitest';
import { smartSort } from '../index.js';

describe('smartSort', () => {
	// Test data
	const users = [
		{
			id: 2,
			name: 'Bob',
			age: 45,
			active: true,
			created: new Date('2023-01-15'),
		},
		{
			id: 1,
			name: 'Alice',
			age: 30,
			active: false,
			created: new Date('2023-03-20'),
		},
		{
			id: 3,
			name: 'Charlie',
			age: null,
			active: true,
			created: new Date('2022-11-05'),
		},
		{
			id: 4,
			name: 'David',
			age: 25,
			active: undefined,
			created: new Date('2023-05-10'),
		},
		{ id: 5, name: 'Eva', age: 35, active: false, created: null },
	];

	it('should sort strings in ascending order', () => {
		const result = smartSort(users, 'name');
		expect(result[0].name).toBe('Alice');
		expect(result[1].name).toBe('Bob');
		expect(result[2].name).toBe('Charlie');
		expect(result[3].name).toBe('David');
		expect(result[4].name).toBe('Eva');
	});

	it('should sort strings in descending order', () => {
		const result = smartSort(users, 'name', false);
		expect(result[0].name).toBe('Eva');
		expect(result[1].name).toBe('David');
		expect(result[2].name).toBe('Charlie');
		expect(result[3].name).toBe('Bob');
		expect(result[4].name).toBe('Alice');
	});

	it('should sort numbers in ascending order', () => {
		const result = smartSort(users, 'age');
		// null values should come first in ascending order
		expect(result[0].age).toBe(null);
		expect(result[1].age).toBe(25);
		expect(result[2].age).toBe(30);
		expect(result[3].age).toBe(35);
		expect(result[4].age).toBe(45);
	});

	it('should sort numbers in descending order', () => {
		const result = smartSort(users, 'age', false);
		expect(result[0].age).toBe(45);
		expect(result[1].age).toBe(35);
		expect(result[2].age).toBe(30);
		expect(result[3].age).toBe(25);
		// null values should come last in descending order
		expect(result[4].age).toBe(null);
	});

	it('should sort booleans in ascending order', () => {
		const result = smartSort(users, 'active');
		// undefined values should come first in ascending order
		expect(result[0].active).toBe(undefined);
		expect(result[1].active).toBe(false);
		expect(result[2].active).toBe(false);
		expect(result[3].active).toBe(true);
		expect(result[4].active).toBe(true);
	});

	it('should sort booleans in descending order', () => {
		const result = smartSort(users, 'active', false);
		expect(result[0].active).toBe(true);
		expect(result[1].active).toBe(true);
		expect(result[2].active).toBe(false);
		expect(result[3].active).toBe(false);
		// undefined values should come last in descending order
		expect(result[4].active).toBe(undefined);
	});

	it('should sort dates in ascending order', () => {
		const result = smartSort(users, 'created');
		expect(result[0].created).toBe(null);
		expect(result[1].created?.getTime()).toBe(
			new Date('2022-11-05').getTime()
		);
		expect(result[2].created?.getTime()).toBe(
			new Date('2023-01-15').getTime()
		);
		expect(result[3].created?.getTime()).toBe(
			new Date('2023-03-20').getTime()
		);
		expect(result[4].created?.getTime()).toBe(
			new Date('2023-05-10').getTime()
		);
	});

	it('should sort dates in descending order', () => {
		const result = smartSort(users, 'created', false);
		expect(result[0].created?.getTime()).toBe(
			new Date('2023-05-10').getTime()
		);
		expect(result[1].created?.getTime()).toBe(
			new Date('2023-03-20').getTime()
		);
		expect(result[2].created?.getTime()).toBe(
			new Date('2023-01-15').getTime()
		);
		expect(result[3].created?.getTime()).toBe(
			new Date('2022-11-05').getTime()
		);
		expect(result[4].created).toBe(null);
	});

	it('should use custom comparison function when provided', () => {
		const mockComparator = vi.fn(
			(a, b) => String(a).length - String(b).length
		);
		const result = smartSort(users, 'name', true, mockComparator);

		expect(mockComparator).toHaveBeenCalled();
		expect(result[0].name).toBe('Bob');
		expect(result[1].name).toBe('Eva');
		expect(result[2].name).toBe('Alice');
		expect(result[3].name).toBe('David');
		expect(result[4].name).toBe('Charlie');
	});

	it('should not modify the original array', () => {
		const original = [...users];
		smartSort(users, 'name');
		expect(users[0].id).toBe(original[0].id);
		expect(users[1].id).toBe(original[1].id);
		expect(users[2].id).toBe(original[2].id);
		expect(users[3].id).toBe(original[3].id);
		expect(users[4].id).toBe(original[4].id);
	});

	it('should handle mixed types gracefully', () => {
		const mixedData = [
			{ value: 42 },
			{ value: 'string' },
			{ value: true },
			{ value: new Date('2023-01-01') },
			{ value: null },
			{ value: { nested: 'object' } },
		];

		const result = smartSort(mixedData, 'value');
		expect(result.length).toBe(mixedData.length);
	});

	it('should handle edge case of empty array', () => {
		const emptyArray: Record<string, unknown>[] = [];
		const result = smartSort(emptyArray, 'anyKey');
		expect(result).toEqual([]);
	});

	it('should handle array with single item', () => {
		const singleItem = [{ id: 1, name: 'Single' }];
		const result = smartSort(singleItem, 'name');
		expect(result).toEqual(singleItem);
	});

	it('should enforce proper types', () => {
		interface User {
			id: number;
			name: string;
		}
		const users: User[] = [{ id: 1, name: 'Single' }];
		const result = smartSort<User>(users, 'name');
		expectTypeOf(result).toEqualTypeOf<User[]>(users);
	});
});
