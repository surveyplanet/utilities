// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { dasherize } from '../index.js';

describe('dasherize', () => {
	it('should replace all spaces in string to dashes and match github-slugger', () => {
		expect(dasherize('Johnny Appleseed')).toBe('johnny-appleseed');
		expect(dasherize('johnnyAppleseed')).toBe('johnnyappleseed');
		expect(dasherize('__---_--Johnny_-Appleseed')).toBe('__---_--johnny_-appleseed');
		expect(dasherize('Johnny Appleseed', '_')).toBe('johnny_appleseed');
		expect(dasherize('__---_--Johnny_-Appleseed', '_')).toBe('__---_--johnny_-appleseed');
		expect(dasherize('Surveys vs questionnaires - Key differences')).toBe(
			'surveys-vs-questionnaires---key-differences'
		);
		expect(dasherize("Disadvantages of online surveys: here's what to look out for")).toBe(
			'disadvantages-of-online-surveys-heres-what-to-look-out-for'
		);
	});
});
