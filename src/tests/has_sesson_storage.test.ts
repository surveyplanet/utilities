// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { hasSessionStorage } from '../index';

describe('hasSessionStorage', () => {
	it('should confirm that localStorage is available', () => {
		expect(hasSessionStorage()).toBe(true);
	});
});
