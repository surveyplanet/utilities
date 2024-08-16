import { describe, expect, it } from 'vitest';
import { isPlainObject } from '../index';

describe('isPlainObject', () => {
	it('should confirm value is a plain object', () => {
		const value = { a: 1, b: { c: 2 } };
		const result = isPlainObject(value);
		expect(result).toBeTruthy();
	});

	it('should confirm value is not a plain object', () => {
		expect(isPlainObject(1)).toBeFalsy();
		expect(isPlainObject('noop')).toBeFalsy();
		expect(isPlainObject([1, 2, 3])).toBeFalsy();
		expect(isPlainObject(null)).toBeFalsy();
		expect(isPlainObject(undefined)).toBeFalsy();
		expect(isPlainObject(/test/)).toBeFalsy();

		class Test {
			a = 1;
		}
		expect(isPlainObject(new Test())).toBeFalsy();

		function test() {
			return 1;
		}
		expect(isPlainObject(test)).toBeFalsy();

		expect(isPlainObject(Symbol('test'))).toBeFalsy();
		expect(isPlainObject(BigInt(Number.MAX_SAFE_INTEGER))).toBeFalsy();
		expect(isPlainObject(new Error())).toBeFalsy();
		expect(isPlainObject(new Date())).toBeFalsy();
		expect(isPlainObject(new Map())).toBeFalsy();
		expect(isPlainObject(new Set())).toBeFalsy();
		expect(isPlainObject(new WeakMap())).toBeFalsy();
		expect(isPlainObject(new WeakSet())).toBeFalsy();
		expect(isPlainObject(new ArrayBuffer(8))).toBeFalsy();
		expect(isPlainObject(new Int8Array())).toBeFalsy();
		expect(isPlainObject(true)).toBeFalsy();
		expect(isPlainObject(false)).toBeFalsy();
		expect(isPlainObject(1.1)).toBeFalsy();
		expect(isPlainObject(new Float32Array())).toBeFalsy();
		expect(isPlainObject(new Float64Array())).toBeFalsy();
		expect(isPlainObject(new Int16Array())).toBeFalsy();
		expect(isPlainObject(new Int32Array())).toBeFalsy();
		expect(isPlainObject(new Int8Array())).toBeFalsy();
		expect(isPlainObject(new Uint16Array())).toBeFalsy();
		expect(isPlainObject(new Uint32Array())).toBeFalsy();
		expect(isPlainObject(new Uint8Array())).toBeFalsy();
		expect(isPlainObject(new Uint8ClampedArray())).toBeFalsy();
		expect(isPlainObject(new DataView(new ArrayBuffer(8)))).toBeFalsy();
		expect(
			isPlainObject(
				new Promise(() => {
					// noop
				})
			)
		).toBeFalsy();
		// expect(isPlainObject(new Proxy({}, {}))).toBeFalsy();
		expect(isPlainObject(new SharedArrayBuffer(8))).toBeFalsy();
		expect(isPlainObject(new URL('http://example.com'))).toBeFalsy();
		expect(isPlainObject(new URLSearchParams('a=b&c=d'))).toBeFalsy();
		const blob = new Blob();
		expect(isPlainObject(blob)).toBeFalsy();
		expect(isPlainObject(new File([''], 'test.txt'))).toBeFalsy();
	});
});
