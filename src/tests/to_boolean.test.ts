import { describe, it, expect } from 'vitest';
import { toBoolean } from '../to_boolean.js';

describe('toBoolean', () => {
	describe('default truthy values', () => {
		it("returns true for 'true'", () => {
			expect(toBoolean('true')).toBe(true);
		});

		it("returns true for 'TRUE'", () => {
			expect(toBoolean('TRUE')).toBe(true);
		});

		it("returns true for 'True'", () => {
			expect(toBoolean('True')).toBe(true);
		});

		it("returns true for '1'", () => {
			expect(toBoolean('1')).toBe(true);
		});
	});

	describe('default falsy values', () => {
		it("returns false for 'false'", () => {
			expect(toBoolean('false')).toBe(false);
		});

		it("returns false for 'FALSE'", () => {
			expect(toBoolean('FALSE')).toBe(false);
		});

		it("returns false for 'False'", () => {
			expect(toBoolean('False')).toBe(false);
		});

		it("returns false for '0'", () => {
			expect(toBoolean('0')).toBe(false);
		});
	});

	describe('numeric input', () => {
		it('returns true for number 1', () => {
			expect(toBoolean(1)).toBe(true);
		});

		it('returns false for number 0', () => {
			expect(toBoolean(0)).toBe(false);
		});

		it('returns false for number 0', () => {
			expect(toBoolean(865)).toBe(undefined);
		});
	});

	describe('whitespace handling', () => {
		it('trims leading and trailing spaces', () => {
			expect(toBoolean('  true  ')).toBe(true);
		});

		it('trims tabs and newlines', () => {
			expect(toBoolean('\ttrue\n')).toBe(true);
		});
	});

	describe('unmatched strings return undefined', () => {
		it("returns undefined for 'yes'", () => {
			expect(toBoolean('yes')).toBeUndefined();
		});

		it("returns undefined for 'no'", () => {
			expect(toBoolean('no')).toBeUndefined();
		});

		it('returns undefined for arbitrary text', () => {
			expect(toBoolean('banana')).toBeUndefined();
		});

		it('returns undefined for empty string', () => {
			expect(toBoolean('')).toBeUndefined();
		});
	});

	describe('non-string, non-number input coerces with !!', () => {
		it('returns false for null', () => {
			expect(toBoolean(null)).toBe(false);
		});

		it('returns false for undefined', () => {
			expect(toBoolean(undefined)).toBe(false);
		});

		it('returns true for a non-empty object', () => {
			expect(toBoolean({})).toBe(true);
		});

		it('returns true for a non-empty array', () => {
			expect(toBoolean([1])).toBe(true);
		});

		it('returns true for a function', () => {
			expect(toBoolean(() => {})).toBe(true);
		});
	});

	describe('custom truthy and falsy values', () => {
		it('accepts custom truthy strings', () => {
			expect(toBoolean('yes', ['yes'], ['no'])).toBe(true);
		});

		it('accepts custom falsy strings', () => {
			expect(toBoolean('no', ['yes'], ['no'])).toBe(false);
		});

		it('returns undefined when neither custom set matches', () => {
			expect(toBoolean('true', ['yes'], ['no'])).toBeUndefined();
		});
	});

	describe('regex matchers', () => {
		it('matches a truthy regex', () => {
			expect(toBoolean('YES', [/^yes$/i])).toBe(true);
		});

		it('matches a falsy regex', () => {
			expect(toBoolean('NOPE', ['true'], [/^nope$/i])).toBe(false);
		});

		it('regex is case-sensitive by default', () => {
			expect(toBoolean('Yes', [/^yes$/])).toBeUndefined();
		});
	});
});
