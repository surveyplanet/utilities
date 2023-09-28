// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { inJsDom } from '../index';

describe('inJsDom', () => {
	it('should confirm test is not in a web worker', () => {
		expect(inJsDom).toBe(true);
	});
});
