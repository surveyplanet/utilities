import { describe, expect, it } from 'vitest';
import { isPlainObject } from '../index';

describe('isPlainObject', () => {
	it('should confirm value is a plain object', () => {
		const value = { a: 1, b: { c: 2 } };
		const result = isPlainObject<{ a: number; b: { c: number } }>(value);
		expect(result).toBeTruthy();
	});

	it('should confirm value is not a plain object', () => {
		let result = isPlainObject<number>(1);
		expect(result).toBeFalsy();

		result = isPlainObject<string>('noop');
		expect(result).toBeFalsy();

		result = isPlainObject<number[]>([1, 2, 3]);
		expect(result).toBeFalsy();

		result = isPlainObject<null>(null);
		expect(result).toBeFalsy();

		result = isPlainObject<undefined>(undefined);
		expect(result).toBeFalsy();
	});
});
