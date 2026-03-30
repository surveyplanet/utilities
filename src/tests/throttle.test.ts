import { describe, it, expect } from 'vitest';
import { throttle } from '../index.js';

describe('throttle', () => {
	it('should be a function', () => {
		expect(typeof throttle).toBe('function');
	});
});
