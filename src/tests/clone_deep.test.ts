import { describe, expect, it } from 'vitest';
import { cloneDeep } from '../index';

describe('cloneDeep', () => {
	it('should deep clone an object', () => {
		const input = { a: 1, b: { c: 2 } };
		const output = cloneDeep<{ a: number; b: { c: number } }>(input);

		expect(output).toEqual(input);
		expect(output).not.toBe(input);
		expect(output.b).not.toBe(input.b);
	});

	it('should deep clone and object with circular references', () => {
		interface Input {
			a: number;
			b?: Input;
		}

		const input: Input = { a: 1 };
		input.b = input;

		const output = cloneDeep(input);

		expect(output).toEqual(input);
		expect(output).not.toBe(input);
		expect(output.b).toBe(output);
	});

	it('should deep clone a complex object', () => {
		const input = {
			array: [1, 2, 3],
			arrayBuffer: new ArrayBuffer(8),
			boolean: false,
			date: new Date(),
			error: new Error('Boom!'),
			map: new Map([
				[1, 'one'],
				[2, 'two'],
				[3, 'three'],
			]),
			object: { a: 1, b: { c: 2 } },
			regExp: /[0-9]/g,
			set: new Set([1, 2, 3, 4, 5]),
			string: '...this is something new I wish I had 11 too.',
			typedArray: new Int8Array(8),
		};

		const output = cloneDeep(input);
		expect(output).toEqual(input);
		expect(output).not.toBe(input);
	});

	it('should not deep clone a function', () => {
		const input = {
			a: 1,
			func: () => {
				return null;
			},
		};
		const output = cloneDeep(input);
		expect(output).not.toEqual(input);
		expect(output).not.toBe(input);
		expect(output).toHaveProperty('a');
		expect(output.a).toBe(input.a);
		expect(output).not.toHaveProperty('func');
	});

	it('should not deep clone a symbol', () => {
		const input = {
			a: 1,
			symbol: Symbol('noop'),
		};
		const output = cloneDeep(input);
		expect(output).not.toEqual(input);
		expect(output).not.toBe(input);
		expect(output).toHaveProperty('a');
		expect(output.a).toBe(input.a);
		expect(output).not.toHaveProperty('symbol');
	});
});
