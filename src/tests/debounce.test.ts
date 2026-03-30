import { describe, it, expect } from 'vitest';
import { debounce } from '../index.js';

describe('debounce', () => {
	it('should be a function', () => {
		expect(typeof debounce).toBe('function');
	});
});
