// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { hasLocalStorage } from '../index';

describe('hasLocalStorage', () => {
	it('should confirm that localStorage is available', () => {
		expect(hasLocalStorage()).toBe(true);
	});
});
