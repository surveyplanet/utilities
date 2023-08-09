// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { inNode } from '../index';

describe('inNode', () => {
	it('should confirm test is running in Node.js', () => {
		expect(inNode).toBe(true);
	});
});
