// @vitest-environment jsdom
import { describe, expect, it, beforeAll, afterAll } from 'vitest';
import { inWorker } from '../index';

describe('inBrowser', () => {
	it('should confirm test is not in a web worker', () => {
		expect(inWorker).toBe(false);
	});

	// NOTE: Workers cannot be testing in jsdom
	//
	// beforeAll(() => {
	// 	return fs.appendFile(WORKER_NAME, 'self.postMessage("Worker test!!");');
	// });
	// afterAll(() => {
	// 	return fs.rm(WORKER_NAME);
	// });
	// it('should confirm test is in a web worker', async () => {
	// 	const worker = new Worker('<worker_file>.js');

	// 	worker.onmessage = (event) => {
	// 		console.log(`Worker said : ${event.data}`);
	// 		expect(inWorker).toBe(true);
	// 	};
	// });
});
