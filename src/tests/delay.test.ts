// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { delay } from '../index';

describe('delay', () => {
	it('should delay the call stack', async () => {
		const time = 10;
		const startTime = new Date();
		await delay(time);
		const totalTime = new Date().getTime() - startTime.getTime();
		expect(totalTime).toBeGreaterThanOrEqual(time);
		expect(totalTime).toBeLessThanOrEqual(time + 2);
	});

	it('should delay the call stack', async () => {
		const time = 100;
		const startTime = new Date();
		await delay(time);
		const totalTime = new Date().getTime() - startTime.getTime();
		expect(totalTime).toBeGreaterThanOrEqual(time);
		expect(totalTime).toBeLessThanOrEqual(time + 2);
	});
});
