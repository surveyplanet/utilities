import { type Question, fixtures } from '@surveyplanet/types';

import { expect, test, describe } from 'vitest';
import { estimateQuestionLength } from '../index';

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
		const question = { ...fixtures.questions.multipleChoice };
		expect(question.type).toBe('multiple_choice');
		expect(estimateQuestionLength(question)).toBe(7.5);
	});
	test('should estimate multi-select multiple choice question length', function () {
		const question = { ...fixtures.questions.multipleChoiceMulti };
		expect(question.type).toBe('multiple_choice');
		expect(estimateQuestionLength(question)).toBe(67.5);
	});
	test('should estimate essay question length', function () {
		const question = { ...fixtures.questions.essay };
		expect(question.type).toBe('essay');
		expect(estimateQuestionLength(question)).toBe(22.5);
	});
	test('should estimate rating question length', function () {
		const question = { ...fixtures.questions.rating };
		expect(question.type).toBe('rating');
		expect(estimateQuestionLength(question)).toBe(7.5);
	});
	test('should estimate scale question length', function () {
		const question = { ...fixtures.questions.scale };
		expect(question.type).toBe('scale');
		expect(estimateQuestionLength(question)).toBe(7.5);
	});
	test('should estimate form question length', function () {
		const question = { ...fixtures.questions.form };
		expect(question.type).toBe('form');
		expect(estimateQuestionLength(question)).toBe(112.5);
	});
	test('should estimate scoring question length', function () {
		const question = { ...fixtures.questions.scoring };
		expect(question.type).toBe('scoring');
		expect(estimateQuestionLength(question)).toBe(30);
	});
	test('should estimate range question length', function () {
		const question = { ...fixtures.questions.range };
		expect(question.type).toBe('range');
		expect(estimateQuestionLength(question)).toBe(7.5);
	});
	test('should estimate dateTime question length', function () {
		const question = { ...fixtures.questions.dateTime };
		expect(question.type).toBe('date_time');
		expect(estimateQuestionLength(question)).toBe(7.5);
	});
	test('should estimate image question length', function () {
		const question = { ...fixtures.questions.image };
		expect(question.type).toBe('image');
		expect(estimateQuestionLength(question)).toBe(22.5);
	});
});
