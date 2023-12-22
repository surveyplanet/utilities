// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { delay } from '../index';

describe('delay', () => {
	it('should delay the call stack', async () => {
		const time = 10;
		const startTime = new Date();
		await delay(time);
		const totalTime = new Date().getTime() - startTime.getTime();
		expect(totalTime).toBeGreaterThanOrEqual(time - 3);
		expect(totalTime).toBeLessThanOrEqual(time + 3);
	});
});
