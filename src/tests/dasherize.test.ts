// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { dasherize } from '../index';

describe('dasherize', () => {
	it('should replace all spaces in string to dashes', () => {
		expect(dasherize('Johnny Appleseed')).toBe('johnny-appleseed');
		expect(dasherize('johnnyAppleseed')).toBe('johnny-appleseed');
		expect(dasherize('__---_--Johnny_-Appleseed')).toBe('johnny-appleseed');
		expect(dasherize('Johnny Appleseed', '_')).toBe('johnny_appleseed');
		expect(dasherize('__---_--Johnny_-Appleseed', '_')).toBe(
			'johnny_appleseed'
		);
	});
});
