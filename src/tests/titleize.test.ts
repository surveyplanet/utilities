import { describe, expect, it } from 'vitest';
import { titleize } from '../titleize';

describe('titleize', () => {
	it('should capitalize the first letter of a single word', () => {
		expect(titleize('hello')).toBe('Hello');
	});

	it('should capitalize the first letter of a sentence', () => {
		expect(titleize('hello world')).toBe('Hello world');
	});

	it('should return an empty string if input is empty', () => {
		expect(titleize('')).toBe('');
	});

	it('should return the same string if the first character is already capitalized', () => {
		expect(titleize('Hello')).toBe('Hello');
	});

	it('should handle strings with special characters', () => {
		expect(titleize('!hello')).toBe('!hello');
	});

	it('should handle strings with numbers', () => {
		expect(titleize('123hello')).toBe('123hello');
	});

	it('should ensure all other words are lowercase', () => {
		expect(titleize('Thank yoU And GOODNIGHT!')).toBe(
			'Thank you and goodnight!'
		);
	});
});
