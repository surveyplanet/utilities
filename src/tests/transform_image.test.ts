import { describe, expect, it } from 'vitest';
import { transformImage, type TransformOptions } from '../index';

const TEST_IMG = 'https://media.surveyplanet.com/testing/default.jpeg';
const ROOT_URL = 'https://media.surveyplanet.com';

describe('transform_image', function () {
	it('should return url without transformation since it is not on media server', function () {
		const originalUrl = 'https://someimage.png';
		const options: TransformOptions = { height: 200 };
		const url = transformImage(originalUrl, options);
		expect(url).toBe(originalUrl);
	});

	it('should not return any transformation since none were passed', function () {
		const url = transformImage(TEST_IMG);
		expect(url).toBe(TEST_IMG);
	});

	it('should change the width, height, and fit', function () {
		const fit = 'contain';
		const height = 150;
		const width = 150;
		const options: TransformOptions = { fit, height, width };
		const url = transformImage(TEST_IMG, options);

		expect(url).toBe(
			`${ROOT_URL}/f_${fit},h_${height},w_${width}/testing/default.jpeg`
		);
	});

	it('should change the image background', function () {
		const value = '00FF00';
		const options: TransformOptions = { background: value };
		const url = transformImage(TEST_IMG, options);
		expect(url).toBe(`${ROOT_URL}/bg_${value}/testing/default.jpeg`);
	});

	it('should change the image blur', function () {
		const value = 10;
		const options: TransformOptions = { blur: value };

		const url = transformImage(TEST_IMG, options);
		expect(url).toBe(`${ROOT_URL}/b_${value}/testing/default.jpeg`);
	});

	it('should change the image fit', function () {
		const value = 'contain';
		const options: TransformOptions = { fit: value };
		const url = transformImage(TEST_IMG, options);
		expect(url).toBe(`${ROOT_URL}/f_${value}/testing/default.jpeg`);
	});

	it('should change the image flatten', function () {
		const value = 'ff00ff';
		const options: TransformOptions = { flatten: value };
		const url = transformImage(TEST_IMG, options);
		expect(url).toBe(`${ROOT_URL}/fl_${value}/testing/default.jpeg`);
	});

	it('should change the image flip', function () {
		const value = true;
		const options: TransformOptions = { flip: value };
		const url = transformImage(TEST_IMG, options);
		expect(url).toBe(`${ROOT_URL}/fi/testing/default.jpeg`);
	});

	it('should change the image flop', function () {
		const value = true;
		const options: TransformOptions = { flop: value };
		const url = transformImage(TEST_IMG, options);
		expect(url).toBe(`${ROOT_URL}/fo/testing/default.jpeg`);
	});

	it('should change the image gamma', function () {
		const value = 0.5;
		const options: TransformOptions = { gamma: value };
		const url = transformImage(TEST_IMG, options);
		expect(url).toBe(`${ROOT_URL}/ga_${value}/testing/default.jpeg`);
	});

	it('should change the image grayscale', function () {
		const value = true;
		const options: TransformOptions = { grayscale: value };
		const url = transformImage(TEST_IMG, options);
		expect(url).toBe(`${ROOT_URL}/g/testing/default.jpeg`);
	});

	it('should change the image height', function () {
		const value = 150;
		const options: TransformOptions = { height: value };
		const url = transformImage(TEST_IMG, options);
		expect(url).toBe(`${ROOT_URL}/h_${value}/testing/default.jpeg`);
	});

	it('should change the image median', function () {
		const value = 5;
		const options: TransformOptions = { median: value };
		const url = transformImage(TEST_IMG, options);
		expect(url).toBe(`${ROOT_URL}/m_${value}/testing/default.jpeg`);
	});

	it('should change the image negate', function () {
		const value = true;
		const options: TransformOptions = { negate: value };
		const url = transformImage(TEST_IMG, options);
		expect(url).toBe(`${ROOT_URL}/n/testing/default.jpeg`);
	});

	it('should change the image normalize', function () {
		const value = true;
		const options: TransformOptions = { normalize: value };
		const url = transformImage(TEST_IMG, options);
		expect(url).toBe(`${ROOT_URL}/no/testing/default.jpeg`);
	});

	it('should change the image rotate', function () {
		const value = 5;
		const options: TransformOptions = { rotate: value };
		const url = transformImage(TEST_IMG, options);
		expect(url).toBe(`${ROOT_URL}/ro_${value}/testing/default.jpeg`);
	});

	it('should change the image sharpen', function () {
		const value = 10;
		const options: TransformOptions = { sharpen: value };
		const url = transformImage(TEST_IMG, options);
		expect(url).toBe(`${ROOT_URL}/s_${value}/testing/default.jpeg`);
	});

	it('should change the image threshold', function () {
		const value = 10;
		const options: TransformOptions = { threshold: value };
		const url = transformImage(TEST_IMG, options);
		expect(url).toBe(`${ROOT_URL}/th_${value}/testing/default.jpeg`);
	});

	it('should change the image tint', function () {
		const value = '0:0';
		const options: TransformOptions = { tint: value };
		const url = transformImage(TEST_IMG, options);
		expect(url).toBe(`${ROOT_URL}/t_${value}/testing/default.jpeg`);
	});

	it('should change the image width', function () {
		const value = 100;
		const options: TransformOptions = { width: value };
		const url = transformImage(TEST_IMG, options);
		expect(url).toBe(`${ROOT_URL}/w_${value}/testing/default.jpeg`);
	});
});
