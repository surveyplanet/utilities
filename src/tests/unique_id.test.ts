// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { uniqueId } from '../index';

describe('uniqueId', () => {
	it('should generate a unique id', () => {
		const id = uniqueId();
		expect(id).toBeTypeOf('string');
		expect(id).match(/^[a-zA-Z0-9]{18,20}$/);
	});

	it('should generate a unique id with prefix', () => {
		expect(uniqueId('pre')).match(/^pre-[a-zA-Z0-9]*$/);
	});

	it('should generate a unique id with suffix', () => {
		expect(uniqueId(undefined, 'post')).match(/^[a-zA-Z0-9]*-post$/);
	});

	it('should generate a bunch of unique ids in succession without collision', () => {
		const total = 1000;
		const ids = new Set();
		for (let i = 0; i < total; i++) {
			ids.add(uniqueId());
		}
		expect(ids.size).toBe(total);
	});
});
