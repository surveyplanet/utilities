import { type Question } from '@surveyplanet/types';

import * as questionData from '@surveyplanet/fixtures/questions';
import { expect, test, describe } from 'vitest';
import { estimateQuestionLength } from '../index.js';

describe('Estimate question length', function () {
	test('should estimate 0 if question is not provided', function () {
		expect(estimateQuestionLength()).toBe(0);
	});

	test('should estimate 0 if question type is not provided', function () {
		const question = {
			properties: {},
		} as Question<'essay'>;
		expect(estimateQuestionLength(question)).toBe(0);
	});

	test('should estimate 0 if question properties are not provided', function () {
		const question = {
			type: 'essay',
		} as Question<'essay'>;
		expect(estimateQuestionLength(question)).toBe(0);
	});

	test('should estimate single-select multiple choice question length', function () {
		const question = { ...questionData.multipleChoice };
		expect(question.type).toBe('multiple_choice');
		expect(estimateQuestionLength(question)).toBe(7.5);
	});
	test('should estimate multi-select multiple choice question length', function () {
		const question = { ...questionData.multipleChoiceMulti };
		expect(question.type).toBe('multiple_choice');
		expect(estimateQuestionLength(question)).toBe(67.5);
	});
	test('should estimate essay question length', function () {
		const question = { ...questionData.essay };
		expect(question.type).toBe('essay');
		expect(estimateQuestionLength(question)).toBe(22.5);
	});
	test('should estimate rating question length', function () {
		const question = { ...questionData.rating };
		expect(question.type).toBe('rating');
		expect(estimateQuestionLength(question)).toBe(7.5);
	});
	test('should estimate scale question length', function () {
		const question = { ...questionData.scale };
		expect(question.type).toBe('scale');
		expect(estimateQuestionLength(question)).toBe(7.5);
	});
	test('should estimate form question length', function () {
		const question = { ...questionData.form };
		expect(question.type).toBe('form');
		expect(estimateQuestionLength(question)).toBe(112.5);
	});
	test('should estimate scoring question length', function () {
		const question = { ...questionData.scoring };
		expect(question.type).toBe('scoring');
		expect(estimateQuestionLength(question)).toBe(30);
	});
	test('should estimate range question length', function () {
		const question = { ...questionData.range };
		expect(question.type).toBe('range');
		expect(estimateQuestionLength(question)).toBe(7.5);
	});
	test('should estimate dateTime question length', function () {
		const question = { ...questionData.dateTime };
		expect(question.type).toBe('date_time');
		expect(estimateQuestionLength(question)).toBe(7.5);
	});
	test('should estimate image question length', function () {
		const question = { ...questionData.image };
		expect(question.type).toBe('image');
		expect(estimateQuestionLength(question)).toBe(22.5);
	});
});
