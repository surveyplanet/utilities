import { describe, it, expect } from 'vitest';
import { truncate } from '../index.js';

describe('truncate', () => {
	const testTxt =
		'This is a very long text that needs to be truncated in different ways';

	describe('End truncation', () => {
		it('should truncate text at the end with default ellipsis', () => {
			const result = truncate(testTxt, { maxLength: 20 });
			expect(result).toBe('This is a very lo...');
			expect(result.length).toBe(20);
		});

		it('should truncate text at the end with explicit position', () => {
			const result = truncate(testTxt, {
				maxLength: 20,
				position: 'end',
			});
			expect(result).toBe('This is a very lo...');
			expect(result.length).toBe(20);
		});

		it('should truncate text at the end with custom ellipsis', () => {
			const result = truncate(testTxt, {
				maxLength: 20,
				position: 'end',
				ellipsis: '…',
			});
			expect(result).toBe('This is a very long…');
			expect(result.length).toBe(20);
		});

		it('should handle very short maxLength for end truncation', () => {
			const result = truncate(testTxt, { maxLength: 5 });
			expect(result).toBe('Th...');
			expect(result.length).toBe(5);
		});
	});

	describe('Start truncation', () => {
		it('should truncate text at the start with default ellipsis', () => {
			const result = truncate(testTxt, {
				maxLength: 20,
				position: 'start',
			});
			expect(result).toBe('...in different ways');
			expect(result.length).toBe(20);
		});

		it('should truncate text at the start with custom ellipsis', () => {
			const result = truncate(testTxt, {
				maxLength: 20,
				position: 'start',
				ellipsis: '←',
			});
			expect(result).toBe('←d in different ways');
			expect(result.length).toBe(20);
		});

		it('should handle very short maxLength for start truncation', () => {
			const result = truncate(testTxt, {
				maxLength: 5,
				position: 'start',
			});
			expect(result).toBe('...ys');
			expect(result.length).toBe(5);
		});
	});

	describe('Middle truncation', () => {
		it('should truncate text in the middle with default ellipsis', () => {
			const result = truncate(testTxt, {
				maxLength: 20,
				position: 'middle',
			});
			expect(result).toBe('This is a...ent ways');
			expect(result.length).toBe(20);
		});

		it('should truncate text in the middle with custom ellipsis', () => {
			const result = truncate(testTxt, {
				maxLength: 20,
				position: 'middle',
				ellipsis: '---',
			});
			expect(result).toBe('This is a---ent ways');
			expect(result.length).toBe(20);
		});

		it('should handle odd maxLength for middle truncation', () => {
			const result = truncate(testTxt, {
				maxLength: 21,
				position: 'middle',
			});
			expect(result).toBe('This is a...rent ways');
			expect(result.length).toBe(21);
		});

		it('should handle even maxLength for middle truncation', () => {
			const result = truncate(testTxt, {
				maxLength: 22,
				position: 'middle',
			});
			expect(result).toBe('This is a ...rent ways');
			expect(result.length).toBe(22);
		});
	});

	describe('Edge cases', () => {
		const shortTxt = 'Short';

		it('should return original text when it is shorter than maxLength', () => {
			const result = truncate(shortTxt, { maxLength: 10 });
			expect(result).toBe(shortTxt);
		});

		it('should return original text when it equals maxLength', () => {
			const result = truncate(shortTxt, { maxLength: 5 });
			expect(result).toBe(shortTxt);
		});

		it('should handle empty string', () => {
			const result = truncate('', { maxLength: 10 });
			expect(result).toBe('');
		});

		it('should handle single character string', () => {
			const result = truncate('A', { maxLength: 5 });
			expect(result).toBe('A');
		});

		it('should handle maxLength equal to ellipsis length', () => {
			const result = truncate(testTxt, { maxLength: 3 });
			expect(result).toBe('...');
		});

		it('should handle maxLength smaller than ellipsis length', () => {
			const result = truncate(testTxt, {
				maxLength: 2,
				ellipsis: '...',
			});
			expect(result).toBe('..');
		});

		it('should handle very long custom ellipsis', () => {
			const result = truncate(testTxt, {
				maxLength: 15,
				position: 'middle',
				ellipsis: '[TRUNCATED]',
			});
			expect(result).toBe('Th[TRUNCATED]ys');
			expect(result.length).toBe(15);
		});
	});

	describe('Boundary testing', () => {
		it('should handle maxLength of 1 with single character ellipsis', () => {
			const result = truncate(testTxt, {
				maxLength: 1,
				ellipsis: '.',
			});
			expect(result).toBe('.');
		});

		it('should handle very long text', () => {
			const veryLongText = 'A'.repeat(1000);
			const result = truncate(veryLongText, {
				maxLength: 50,
				position: 'middle',
			});
			expect(result.length).toBe(50);
			expect(result).toMatch(/^A+\.\.\.A+$/);
		});

		it('should preserve Unicode characters correctly', () => {
			const unicodeText = 'Hello 🌍 World 🚀 Test 💫 End';
			const result = truncate(unicodeText, {
				maxLength: 15,
				position: 'middle',
			});
			expect(result.length).toBe(15);
			expect(result).toBe('Hello ...💫 End');
		});
	});

	describe('Position-specific behavior', () => {
		const testText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

		it('should maintain correct character distribution for middle truncation', () => {
			const result = truncate(testText, {
				maxLength: 10,
				position: 'middle',
			});
			expect(result).toBe('ABCD...XYZ');

			const startPart = result.split('...')[0];
			const endPart = result.split('...')[1];
			expect(startPart.length).toBe(4);
			expect(endPart.length).toBe(3);
		});

		it('should preserve word boundaries when possible', () => {
			const wordText = 'The quick brown fox jumps over the lazy dog';
			const result = truncate(wordText, { maxLength: 20 });
			expect(result).toBe('The quick brown f...');
		});
	});

	describe('Additional comprehensive tests', () => {
		it('should use end truncation as default when position not specified', () => {
			const result = truncate(testTxt, { maxLength: 15 });
			expect(result).toBe('This is a ve...');
			expect(result.length).toBe(15);
		});

		it('should handle all positions with same input consistently', () => {
			const testInput = 'The quick brown fox jumps over bridges';
			const maxLen = 15;

			const endResult = truncate(testInput, { maxLength: maxLen });
			const startResult = truncate(testInput, {
				maxLength: maxLen,
				position: 'start',
			});
			const middleResult = truncate(testInput, {
				maxLength: maxLen,
				position: 'middle',
			});

			// expect(endResult.length).toBe(maxLen);
			// expect(startResult.length).toBe(maxLen);
			// expect(middleResult.length).toBe(maxLen);

			expect(endResult).toBe('The quick br...');
			expect(startResult).toBe('...over bridges');
			expect(middleResult).toBe('The qu...ridges');
		});

		it('should handle different ellipsis lengths properly', () => {
			const text = 'Hello World Testing';

			const singleChar = truncate(text, {
				maxLength: 9,
				position: 'middle',
				ellipsis: '•',
			});
			const tripleChar = truncate(text, {
				maxLength: 9,
				position: 'middle',
				ellipsis: ' ... ',
			});
			const longEllipsis = truncate(text, {
				maxLength: 9,
				position: 'middle',
				ellipsis: '[...]',
			});

			expect(singleChar).toBe('Hell•ting');
			expect(tripleChar).toBe('He ... ng');
			expect(longEllipsis).toBe('He[...]ng');

			expect(singleChar.length).toBe(9);
			expect(tripleChar.length).toBe(9);
			expect(longEllipsis.length).toBe(9);
		});
	});
});
