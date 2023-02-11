// @vitest-environment jsdom
import { describe, expect, it, beforeAll } from 'vitest';
import { validate, removeAllValidationErrors } from '../index';
import {
	RULES,
	ValidatorError,
	parseRule,
	getRule,
	parseValidationMessage,
	validateAll,
	getInputCollection,
	// getInputLabel,
} from '../validate';

const testData = [
	{
		id: 'required',
		rule: 'required',
		values: ['required'],
		invalids: [''],
	},
	{
		id: 'matches',
		rule: 'matches[required]',
		values: ['required'],
		invalids: ['invalid'],
	},
	{
		id: 'url',
		rule: 'url',
		values: ['https://www.apple.com'],
		invalids: ['invalid-url'],
	},
	{
		id: 'email',
		rule: 'email',
		values: ['testing@surveyplanet.com'],
		invalids: ['invalid-email'],
	},
	{
		id: 'emails',
		rule: 'emails',
		values: ['testing1@surveyplanet.com,testing2@surveyplanet.com'],
		invalids: ['invalid1-email,invalid2-email'],
	},
	{
		id: 'min-length',
		rule: 'minLength[8]',
		values: ['The quick brown fox.'],
		invalids: ['A', 'The fox'],
	},
	{
		id: 'max-length',
		rule: 'maxLength[20]',
		values: ['The quick fox.'],
		invalids: ['The quick brown fox jumped over the lazy dog.'],
	},
	{
		id: 'exact-length',
		rule: 'exactLength[20]',
		values: ['The quick brown fox.'],
		invalids: ['The quick fox.'],
	},
	{
		id: 'greater-than',
		rule: 'greaterThan[20]',
		values: ['21'],
		invalids: ['1', '20'],
	},
	{
		id: 'equals',
		rule: 'equals[20]',
		values: ['20'],
		invalids: ['s', '21'],
	},
	{
		id: 'less-than',
		rule: 'lessThan[20]',
		values: ['2'],
		invalids: ['20'],
	},
	{
		id: 'alpha',
		rule: 'alpha',
		values: ['abc'],
		invalids: ['123'],
	},
	{
		id: 'alpha-numeric',
		rule: 'alphaNumeric',
		values: ['abc123'],
		invalids: ['abc(123)'],
	},
	{
		id: 'alpha-dash',
		rule: 'alphaDash',
		values: ['_abc-123'],
		invalids: ['#abc-123'],
	},
	{
		id: 'numeric',
		rule: 'numeric',
		values: ['3'],
		invalids: ['invalid3'],
	},
	{
		id: 'integer',
		rule: 'integer',
		values: ['-3'],
		invalids: ['invalid'],
	},
	{
		id: 'decimal',
		rule: 'decimal',
		values: ['.3'],
		invalids: ['invalid3'],
	},
	{
		id: 'ip',
		rule: 'ip',
		values: ['8.8.8.8'],
		invalids: ['invalid-ip'],
	},
	{
		id: 'base64',
		rule: 'base64',
		values: ['U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ='],
		invalids: ['in'],
	},
	{
		id: 'cvc',
		rule: 'cvc',
		values: ['123'],
		invalids: ['invalid-cvc'],
	},
	{
		id: 'credit_card',
		rule: 'creditCard',
		values: ['4242-4242-4242-4242'],
		invalids: ['invalid-cc'],
	},
	{
		id: 'phone',
		rule: 'phone',
		values: ['5558889999'],
		invalids: ['invalid-phone'],
	},
	// {
	// 	id: 'file_type',
	// 	rule: 'fileType',
	// 	values: ['image.png'],
	// 	invalids: ['invalid.png'],
	// },
	{
		id: 'has-special-char',
		rule: 'hasSpecialChar',
		values: ['fo-x', 'fo!x', 'fox?', '"'],
		invalids: ['nope'],
	},
	{
		id: 'has-number',
		rule: 'hasNumber',
		values: ['hell0'],
		invalids: ['no-number'],
	},
	{
		id: 'has-upper',
		rule: 'hasUpper',
		values: ['Hello'],
		invalids: ['no-upper'],
	},
	{
		id: 'has-lower',
		rule: 'hasLower',
		values: ['HELLo'],
		invalids: ['NO-LOWER'],
	},
	// This doesn't work all the time, particularly when there are no commas in the regular expression.
	// Possible solution is to only allow one rule when using custom rule.
	// {
	// 	id: 'custom',
	// 	rule: 'custom[/[a-z]/]',
	// 	values: ['abcdefg'],
	// 	invalids: ['ABC123'],
	// },
];

describe('Validator', () => {
	beforeAll(() => {
		const markup = [
			'<html>',
			'<head>',
			'<title>Validate test form</title>',
			'</head>',
			'<body>',
			'<content>',
			'<form id="input-form"></form>',
			'<form id="check-radio-form"></form>',
			'<form id="select-form"></form>',
			'</content>',
			'</body>',
			'</html>',
		].join('/n');

		document.getElementsByTagName('body')[0].innerHTML = markup;
		const inputForm = document.getElementById(
			'input-form'
		) as HTMLFormElement;

		for (const item of testData) {
			const p = document.createElement('p');
			const label = document.createElement('label');

			label.textContent =
				item.rule === 'required' ? item.rule + ' *' : item.rule;
			label.setAttribute('for', item.id);
			p.appendChild(label);

			const input = document.createElement('input');
			input.type = 'text';
			input.id = item.id;
			input.name = input.id;
			input.setAttribute('data-validate-rules', item.rule);
			input.setAttribute('data-validate-show-errors', 'true');
			input.setAttribute('class', `validate-test`);
			p.appendChild(input);
			inputForm.appendChild(p);
			// console.log('\n', p.innerHTML);
		}

		const checkRadioForm = document.getElementById(
			'check-radio-form'
		) as HTMLFormElement;

		['checkbox', 'radio'].forEach((type) =>
			Array.from(Array(5).keys()).forEach((i) => {
				const p = document.createElement('p');
				const label = document.createElement('label');
				const input = document.createElement('input');

				input.type = type;
				input.id = `${type}-test-${i}`;
				input.value = `${type}-test-${i}`;
				input.name = `${type}-test`;
				input.setAttribute('data-validate-rules', 'required');

				label.setAttribute('for', input.id);
				label.textContent = `${type} - ${i}`;
				p.appendChild(label);
				p.appendChild(input);
				checkRadioForm.appendChild(p);
			})
		);

		const selectForm = document.getElementById(
			'select-form'
		) as HTMLFormElement;

		const p = document.createElement('p');
		const label = document.createElement('label');
		const input = document.createElement('select');
		input.id = `test-select`;
		input.name = `test-select`;
		input.setAttribute('data-validate-rules', 'required');
		label.setAttribute('for', input.id);
		label.textContent = 'Select input';

		const placeholderOption = document.createElement('option');
		placeholderOption.textContent = `Choose one...`;
		placeholderOption.value = '';
		input.appendChild(placeholderOption);

		Array.from(Array(5).keys()).forEach((i) => {
			const option = document.createElement('option');
			option.textContent = `Option ${i}`;
			option.value = i.toString();
			input.appendChild(option);
		});

		p.appendChild(label);
		p.appendChild(input);
		selectForm.appendChild(p);
	});

	it('should get all the inputs with validate data attributes', () => {
		const inputCollection = getInputCollection();

		expect(inputCollection).toBeDefined();
		expect(inputCollection.length).toBeGreaterThan(1);
		let hasSelect = false;
		let hasInput = false;
		for (const item of inputCollection) {
			expect(item.nodeName).toBeDefined();
			const nodeType = item.nodeName.toLowerCase();
			if (!hasSelect) hasSelect = nodeType === 'select';
			if (!hasInput) hasInput = nodeType === 'input';
			const correctNodeType = ['input', 'select'].includes(nodeType);
			expect(correctNodeType).toBeTruthy();
			expect(item.dataset).toHaveProperty('validateRules');
		}
		expect(hasSelect).toBeTruthy();
		expect(hasInput).toBeTruthy();
	});

	it('should prase validation rules', () => {
		expect(parseRule('')).toEqual({ rule: '' });
		expect(parseRule('required')).toEqual({ rule: 'required' });
		expect(parseRule('email')).toEqual({ rule: 'email' });
		expect(parseRule('matches[test-required]')).toEqual({
			rule: 'matches',
			param: 'test-required',
		});
		expect(parseRule('minLength[10]')).toEqual({
			rule: 'minLength',
			param: '10',
		});
		expect(parseRule('custom[/^[a-z]{1,9}$/m]')).toEqual({
			rule: 'custom',
			param: '/^[a-z]{1,9}$/m',
		});
	});

	it('should prase validation message', () => {
		let msg = parseValidationMessage(
			'The %l requires %p characters',
			'field',
			'10'
		);
		expect(msg).toBe('The field requires 10 characters');

		msg = parseValidationMessage('The %l is required', 'field');
		expect(msg).toBe('The field is required');
	});

	it('should get the validation rules', () => {
		for (const [idx, rule] of RULES.entries()) {
			expect(getRule(rule.name)).toEqual(RULES[idx]);
		}
	});

	it('should validate all text inputs - one at a time', () => {
		for (const item of testData) {
			const input = document.getElementById(item.id) as HTMLInputElement;
			expect(input).toBeInstanceOf(HTMLInputElement);

			let errors: ValidatorError[];

			for (const invalid of item.invalids) {
				input.value = invalid;
				errors = validate(input);
				// output some error messages for better debugging
				if (!errors.length) {
					console.error(
						`Error: ${invalid} should be invalid for rule ${item.rule}`
					);
					console.error(item);
				}
				expect(errors.length).toBe(1);
				expect(errors[0].id).toBe(item.id);
				expect(errors[0].name).toBe(item.id);
				expect(errors[0].class).toBe('validate-test');
				expect(
					input.className.includes('validation-error')
				).toBeTruthy();
				expect(errors[0].value).toBe(input.value);
				const parsedRule = parseRule(item.rule);
				expect(errors[0].rule).toBe(parsedRule.rule);
				expect(errors[0].parameter).toBe(parsedRule.param);
				expect(errors[0].error.length).toBeGreaterThan(5);
				expect(errors[0].error.includes('%l')).toBeFalsy();
				expect(errors[0].error.includes('%p')).toBeFalsy();

				const label = input.nextSibling as HTMLLabelElement;

				expect(label).toBeDefined();
				console.log(label.textContent);
				expect(label.textContent).toBe(
					errors[0].error.replace(/<\/?em>/g, '')
				);

				expect(label.textContent?.endsWith('*')).toBeFalsy();
			}

			for (const value of item.values) {
				input.value = value;
				errors = validate(input);
				// output some error messages for better debugging
				if (errors.length) {
					console.error(
						`Error: ${value} should be valid for rule ${item.rule}`
					);
					console.error(item);
					console.error(errors);
				}

				expect(errors.length).toBe(0);
			}
		}
	});

	it('should validate all text input at once', () => {
		const inputForm = document.getElementById(
			'input-form'
		) as HTMLFormElement;

		const inputs = inputForm.querySelectorAll('input');
		inputs.forEach(
			(input, i) => (input.value = testData[i]?.invalids[0] ?? '')
		);
		const errors = validateAll(inputs);
		expect(errors).toBeDefined();
		expect(errors.length).toBeGreaterThanOrEqual(inputs.length);
	});

	it('should validate all inputs without passing inputs', () => {
		const errors = validate(null);
		expect(errors).toBeDefined();
		expect(errors.length).toBeGreaterThanOrEqual(testData.length);
	});

	it('should remove all validation errors', () => {
		const errors = validate(null);
		expect(errors).toBeDefined();
		expect(errors.length).toBeGreaterThanOrEqual(testData.length);
		removeAllValidationErrors();
		const errs = document.querySelectorAll('validation-error');
		expect(errs.length).toBe(0);
		const msgs = document.querySelectorAll('validation-error-message');
		expect(msgs.length).toBe(0);
	});

	it('should display a custom error message', () => {
		const customMessage = 'Hey!! The %l input is a required field!';
		const input = document.getElementById(
			testData[0].id
		) as HTMLInputElement;

		expect(input).toBeDefined();
		input.value = '';
		input.setAttribute('data-validate-message', customMessage);
		input.setAttribute('data-show-message', customMessage);
		const errors = validate(input);

		expect(errors.length).toBe(1);
		expect(errors[0].error).toBe(customMessage.replace('%l', 'required'));
		const labels = input.parentElement?.querySelectorAll(
			`label[for="${input.name}"]`
		);
		expect(labels).toHaveLength(2);
		const errLabel = labels?.item(1) as HTMLLabelElement;
		expect(errLabel).toBeDefined();
		expect(errLabel.textContent?.replace('*', '')).toBe(errors[0].error);
	});

	it('should validation error form multiple rules', () => {
		const input = document.getElementById(
			testData[0].id
		) as HTMLInputElement;
		expect(input).toBeDefined();
		input.value = '';
		input.setAttribute(
			'data-validate-rules',
			'required,email,minLength[10]'
		);

		const errors = validate(input);

		expect(errors.length).toBe(3);
		expect(errors[0].rule).toBe('required');
		expect(errors[1].rule).toBe('email');
		expect(errors[2].rule).toBe('minLength');
	});

	it('should validate the checkbox form', () => {
		const checkbox = document.querySelector<HTMLInputElement>(
			'input[type="checkbox"]'
		);

		// type guard
		if (!checkbox) throw new Error('unable to find checkbox');
		// expect(checkbox).toBeDefined(); // not sure why this isn't good enough

		checkbox.checked = true;

		let errors = validate(checkbox);
		expect(errors.length).toBe(0);

		checkbox.checked = false;
		errors = validate(checkbox);
		expect(errors.length).toBe(1);
	});

	it('should validate the radio form', () => {
		const radio: HTMLInputElement | null = document.querySelector(
			'input[type="radio"]'
		);

		// type guard
		if (!radio) throw new Error('unable to find checkbox');
		// expect(radio).toBeDefined();

		radio.checked = true;

		let errors = validate(radio);
		expect(errors.length).toBe(0);

		radio.checked = false;
		errors = validate(radio);
		expect(errors.length).toBe(1);
	});

	it('should validate select input form', () => {
		const select = document.getElementById(
			'test-select'
		) as HTMLSelectElement;

		expect(select).toBeDefined();
		let selectedOption = select.getElementsByTagName('option')[2];
		expect(selectedOption).toBeDefined();
		selectedOption.selected = true;

		let errors = validate(select);
		expect(errors.length).toBe(0);

		selectedOption = select.getElementsByTagName('option')[0];
		expect(selectedOption).toBeDefined();
		selectedOption.selected = true;

		errors = validate(select);
		expect(errors.length).toBe(1);
	});
});
