import { expect, test, describe } from 'vitest';

import { estimateSampleSize } from '../index';

describe('Test', function () {
	test('should estimate sample size with a 10% margin of error', function () {
		const moe = 0.1; // margin of error

		expect(estimateSampleSize(100000, moe) === 96);
		expect(estimateSampleSize(95000, moe) === 96);
		expect(estimateSampleSize(90000, moe) === 96);
		expect(estimateSampleSize(85000, moe) === 96);
		expect(estimateSampleSize(80000, moe) === 96);
		expect(estimateSampleSize(75000, moe) === 96);
		expect(estimateSampleSize(70000, moe) === 96);
		expect(estimateSampleSize(65000, moe) === 96);
		expect(estimateSampleSize(60000, moe) === 96);
		expect(estimateSampleSize(55000, moe) === 96);
		expect(estimateSampleSize(50000, moe) === 96);
		expect(estimateSampleSize(45000, moe) === 96);
		expect(estimateSampleSize(40000, moe) === 96);
		expect(estimateSampleSize(35000, moe) === 96);
		expect(estimateSampleSize(30000, moe) === 96);
		expect(estimateSampleSize(25000, moe) === 96);
		expect(estimateSampleSize(20000, moe) === 96);
		expect(estimateSampleSize(15000, moe) === 96);
		expect(estimateSampleSize(10000, moe) === 96);
		expect(estimateSampleSize(5000, moe) === 95);
		expect(estimateSampleSize(100, moe) === 50);
		expect(estimateSampleSize(10, moe) === 10);
	});

	test('should estimate sample size with a 5% margin of error', function () {
		const moe = 0.05; // margin of error

		expect(estimateSampleSize(100000, moe) === 383);
		expect(estimateSampleSize(95000, moe) === 383);
		expect(estimateSampleSize(90000, moe) === 383);
		expect(estimateSampleSize(85000, moe) === 383);
		expect(estimateSampleSize(80000, moe) === 383);
		expect(estimateSampleSize(75000, moe) === 383);
		expect(estimateSampleSize(70000, moe) === 383);
		expect(estimateSampleSize(65000, moe) === 382);
		expect(estimateSampleSize(60000, moe) === 382);
		expect(estimateSampleSize(55000, moe) === 382);
		expect(estimateSampleSize(50000, moe) === 382);
		expect(estimateSampleSize(45000, moe) === 381);
		expect(estimateSampleSize(40000, moe) === 381);
		expect(estimateSampleSize(35000, moe) === 380);
		expect(estimateSampleSize(30000, moe) === 380);
		expect(estimateSampleSize(25000, moe) === 379);
		expect(estimateSampleSize(20000, moe) === 377);
		expect(estimateSampleSize(15000, moe) === 375);
		expect(estimateSampleSize(10000, moe) === 370);
		expect(estimateSampleSize(5000, moe) === 357);
		expect(estimateSampleSize(100, moe) === 80);
		expect(estimateSampleSize(10, moe) === 10);
	});

	test('should estimate sample size with a 3% margin of error', function () {
		const moe = 0.03; // margin of error

		expect(estimateSampleSize(100000, moe) === 1056);
		expect(estimateSampleSize(95000, moe) === 1056);
		expect(estimateSampleSize(90000, moe) === 1055);
		expect(estimateSampleSize(85000, moe) === 1054);
		expect(estimateSampleSize(80000, moe) === 1054);
		expect(estimateSampleSize(75000, moe) === 1053);
		expect(estimateSampleSize(70000, moe) === 1052);
		expect(estimateSampleSize(65000, moe) === 1050);
		expect(estimateSampleSize(60000, moe) === 1049);
		expect(estimateSampleSize(55000, moe) === 1047);
		expect(estimateSampleSize(50000, moe) === 1045);
		expect(estimateSampleSize(45000, moe) === 1043);
		expect(estimateSampleSize(40000, moe) === 1040);
		expect(estimateSampleSize(35000, moe) === 1036);
		expect(estimateSampleSize(30000, moe) === 1031);
		expect(estimateSampleSize(25000, moe) === 1024);
		expect(estimateSampleSize(20000, moe) === 1014);
		expect(estimateSampleSize(15000, moe) === 997);
		expect(estimateSampleSize(10000, moe) === 965);
		expect(estimateSampleSize(5000, moe) === 880);
		expect(estimateSampleSize(100, moe) === 92);
		expect(estimateSampleSize(10, moe) === 10);
	});

	test('should estimate sample size with a 1% margin of error', function () {
		const moe = 0.01; // margin of error

		expect(estimateSampleSize(100000, moe) === 8763);
		expect(estimateSampleSize(95000, moe) === 8723);
		expect(estimateSampleSize(90000, moe) === 8679);
		expect(estimateSampleSize(85000, moe) === 8630);
		expect(estimateSampleSize(80000, moe) === 8575);
		expect(estimateSampleSize(75000, moe) === 8514);
		expect(estimateSampleSize(70000, moe) === 8446);
		expect(estimateSampleSize(65000, moe) === 8368);
		expect(estimateSampleSize(60000, moe) === 8279);
		expect(estimateSampleSize(55000, moe) === 8177);
		expect(estimateSampleSize(50000, moe) === 8057);
		expect(estimateSampleSize(45000, moe) === 7915);
		expect(estimateSampleSize(40000, moe) === 7745);
		expect(estimateSampleSize(35000, moe) === 7537);
		expect(estimateSampleSize(30000, moe) === 7276);
		expect(estimateSampleSize(25000, moe) === 6939);
		expect(estimateSampleSize(20000, moe) === 6489);
		expect(estimateSampleSize(15000, moe) === 5856);
		expect(estimateSampleSize(10000, moe) === 4900);
		expect(estimateSampleSize(5000, moe) === 3289);
		expect(estimateSampleSize(100, moe) === 99);
		expect(estimateSampleSize(10, moe) === 10);
	});

	test('should estimate some random sample sizes', function () {
		expect(estimateSampleSize(965991576508945, 0.5, 0.8) === 2);
		expect(estimateSampleSize(8107755, 0.05, 0.99) === 666);
		expect(estimateSampleSize(54379101, 0.08, 0.9) === 107);
	});
});
