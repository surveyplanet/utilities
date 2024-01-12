// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { locals } from '../index';

describe('locals', () => {
	const testKey = 'string';

	it('should confirm that localStorage is available', () => {
		const res = locals.available();
		expect(res).toBe(true);
	});

	describe('string', () => {
		const value = 'string';

		it('should set a local storage values', () => {
			expect(locals.set<string>(testKey, value)).toBe(undefined);
		});

		it('should get a local storage values', () => {
			expect(locals.get<string>(testKey)).toBe(value);
		});

		it('should remove a local storage values', () => {
			expect(locals.remove(testKey)).toBe(undefined);
		});

		it('should have removed local storage values', () => {
			expect(locals.get<string>(testKey)).toBe(null);
		});
	});

	describe('number', () => {
		const value = 1;

		it('should set a local storage values', () => {
			expect(locals.set<number>(testKey, value)).toBe(undefined);
		});

		it('should get a local storage values', () => {
			expect(locals.get<number>(testKey)).toBe(value);
		});

		it('should remove a local storage values', () => {
			expect(locals.remove(testKey)).toBe(undefined);
		});

		it('should have removed local storage values', () => {
			expect(locals.get<number>(testKey)).toBe(null);
		});
	});

	describe('boolean', () => {
		const value = true;

		it('should set a local storage values', () => {
			expect(locals.set<boolean>(testKey, value)).toBe(undefined);
		});

		it('should get a local storage values', () => {
			expect(locals.get<boolean>(testKey)).toBe(value);
		});

		it('should remove a local storage values', () => {
			expect(locals.remove(testKey)).toBe(undefined);
		});

		it('should have removed local storage values', () => {
			expect(locals.get<boolean>(testKey)).toBe(null);
		});
	});

	describe('array', () => {
		const value = [1, true, 'yep'];
		type TestType = typeof value;

		it('should set a local storage values', () => {
			expect(locals.set<TestType>(testKey, value)).toBe(undefined);
		});

		it('should get a local storage values', () => {
			expect(locals.get<TestType>(testKey)).toEqual(value);
		});

		it('should remove a local storage values', () => {
			expect(locals.remove(testKey)).toBe(undefined);
		});

		it('should have removed local storage values', () => {
			expect(locals.get<TestType>(testKey)).toBe(null);
		});
	});

	describe('object', () => {
		const value = {
			product: 'Apple',
			color: 'red',
			price: 100,
			available: true,
			quantity: [8, 10, 5],
			origin: {
				country: 'USA',
				state: 'California',
			},
		};
		type TestType = typeof value;

		it('should set a local storage values', () => {
			expect(locals.set<TestType>(testKey, value)).toBe(undefined);
		});

		it('should get a local storage values', () => {
			expect(locals.get<TestType>(testKey)).toEqual(value);
		});

		it('should remove a local storage values', () => {
			expect(locals.remove(testKey)).toBe(undefined);
		});

		it('should have removed local storage values', () => {
			expect(locals.get<TestType>(testKey)).toBe(null);
		});
	});
});
