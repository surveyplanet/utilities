// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { inBrowser } from '../index.js';

describe('inBrowser', () => {
	it('should confirm test is in (jsdom) browser', () => {
		expect(inBrowser).toBe(true);
	});
});
