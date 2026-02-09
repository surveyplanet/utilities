import { describe, expect, it } from 'vitest';
import { get } from '../index.js';

describe('get', () => {
	it('should get value from object', () => {
		const value = 3;
		const object = { a: [{ b: { c: value } }] };
		expect(get(object, ['a', 0, 'b', 'c'])).toBe(value);
		expect(get(object, 'a[0].b.c')).toBe(value);
		expect(get(object, ['a', '0', 'b', 'c'])).toBe(value);
		expect(get(object, 'a.b.c', 'default')).toBe('default');
		expect(get(object, 'a.b.c')).toBe(undefined);
	});
});
