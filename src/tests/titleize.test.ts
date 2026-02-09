import { describe, expect, it } from 'vitest';
import { titleize } from '../index.js';

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
		expect(titleize('Thank yoU And GOODnIGHT!')).toBe(
			'Thank you and goodnight!'
		);
	});

	it('should not lowercase acronym', () => {
		expect(titleize('NPS Survey')).toBe('NPS survey');
	});

	it('should not lowercase acronym as second word', () => {
		expect(titleize('surveys That aRe like NPS Surveys')).toBe(
			'Surveys that are like NPS surveys'
		);
	});

	// it.skip('should capitalize the first word after a colon', () => {
	// 	expect(titleize('section one: important details')).toBe(
	// 		'Section one: Important details'
	// 	);
	// });

	// it.skip('should capitalize the first word after a colon while preserving acronyms', () => {
	// 	expect(titleize('note: the NPS survey results')).toBe(
	// 		'Note: The NPS survey results'
	// 	);
	// });

	// it.skip('should handle colons at the end of acronyms', () => {
	// 	expect(titleize('FAQ: frequently asked questions')).toBe(
	// 		'FAQ: Frequently asked questions'
	// 	);
	// });

	// it.skip('should handle multiple colons in a single string', () => {
	// 	expect(
	// 		titleize('categories: primary: red, blue secondary: green')
	// 	).toBe('Categories: Primary: Red, blue secondary: Green');
	// });

	// it.skip('should handle a string starting with a colon', () => {
	// 	expect(titleize(': starting with colon')).toBe(': Starting with colon');
	// });
});
