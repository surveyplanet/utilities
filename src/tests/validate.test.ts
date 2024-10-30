// @vitest-environment jsdom

import { describe, expect, it, beforeAll } from 'vitest';
import {
	validate,
	validateAll,
	RULES,
	parseRule,
	getRule,
	parseValidationArgsFromInput,
	parseValidationMessage,
	renderValidationError,
	removeAllValidationErrors,
	getInputLabel,
} from '../validate';
import testData from './fixtures/validatorData';

describe('Validator', () => {
	describe('Utilities', () => {
		it('should prase validation rules', () => {
			// expect(parseRule('')).toEqual({ rule: '' });
			expect(parseRule('required')).toEqual({ name: 'required' });
			expect(parseRule('email')).toEqual({ name: 'email' });
			expect(parseRule('matches[test-required]')).toEqual({
				name: 'matches',
				parameter: 'test-required',
			});
			expect(parseRule('minLength[10]')).toEqual({
				name: 'minLength',
				parameter: '10',
			});
			expect(parseRule('custom[/^[a-z]{1,9}$/m]')).toEqual({
				name: 'custom',
				parameter: '/^[a-z]{1,9}$/m',
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
	});

	describe('Hooks', () => {
		it('should validate test data', function () {
			for (const item of testData) {
				const rule = RULES.find((r) => r.name === item.name);

				if (!rule) {
					throw new Error('Rule is undefined');
				}

				expect(rule, `${item.name} does not have a rule`).toBeDefined();
				expect(rule).toHaveProperty('hook');
				expect(rule.name).toBe(item.name);

				const valid = rule.hook(item.values[0], item.parameter);
				expect(
					valid,
					`${rule.name} should validate ${item.values[0]}`
				).toBe(true);
			}
		});

		it('should not validate test data', function () {
			for (const item of testData) {
				const rule = RULES.find((r) => r.name === item.name);

				if (!rule) {
					throw new Error('Rule is undefined');
				}

				expect(rule, `${item.name} does not have a rule`).toBeDefined();
				expect(rule).toHaveProperty('hook');
				expect(rule.name).toBe(item.name);

				const valid = rule.hook(item.invalids[0], item.parameter);

				expect(
					valid,
					`${rule.name} should not validate ${item.invalids[0]}`
				).toBe(false);
			}
		});
	});

	describe('Plain text validation', function () {
		// TODO: create test that check all validation rules.
		it('should validate valid values', function () {
			for (const item of testData) {
				// console.log(item);

				const validateArgs = {
					value: item.values[0],
					rules: [
						{
							name: item.name,
							parameter: item.parameter,
						},
					],
				};
				const errors = validate(validateArgs);
				expect(errors).toBeDefined();
				expect(errors).toHaveLength(0);
			}
		});

		it('should not validate invalid values', function () {
			for (const item of testData) {
				const validateArgs = {
					value: item.invalids[0],
					label: item.name,
					rules: [
						{
							name: item.name,
							parameter: item.parameter,
						},
					],
				};
				const errors = validate(validateArgs);
				expect(errors).toBeDefined();
				expect(errors).toHaveLength(1);
				expect(errors[0].value).toBe(validateArgs.value);
				expect(errors[0].rule).toBe(validateArgs.rules[0].name);
				expect(errors[0].parameter).toBe(
					validateArgs.rules[0].parameter
				);
				expect(errors[0].error).toMatch(
					new RegExp(`^<em>${validateArgs.label}</em>`)
				);
			}
		});

		it('should validate all', function () {
			const options = testData.map((itm) => {
				return {
					value: itm.values[0],
					rules: [
						{
							name: itm.name,
							parameter: itm.parameter,
						},
					],
					label: itm.name,
				};
			});
			const errors = validateAll(options);
			expect(errors).toBeDefined();
			expect(errors).toHaveLength(0);
		});

		it('should not validate all', function () {
			const options = testData.map((itm) => {
				return {
					value: itm.invalids[0],
					rules: [
						{
							name: itm.name,
							parameter: itm.parameter,
						},
					],
					label: itm.name,
				};
			});
			const errors = validateAll(options);
			expect(errors).toBeDefined();
			expect(errors).toHaveLength(options.length);
		});

		it('should return a custom error message and label', function () {
			const errMsg = 'Kaboom!!! %l is not valid.';
			const label = 'Noop';
			const rule = testData[0];

			const validateArgs = {
				value: rule.invalids[0],
				rules: [{ name: rule.name }],
				message: errMsg,
				label: label,
			};
			const errors = validate(validateArgs);
			expect(errors).toBeDefined();
			expect(errors).toHaveLength(1);
			expect(errors[0].value).toBe(validateArgs.value);
			expect(errors[0].rule).toBe(validateArgs.rules[0].name);
			expect(errors[0].error).toBe(parseValidationMessage(errMsg, label));
		});
	});

	describe('HTML input validation', () => {
		beforeAll(() => {
			const markup = [
				'<html>',
				'<head>',
				'<title>Validate test form</title>',
				'</head>',
				'<body>',
				'<content>',
				'<form id="input-form">',
				'<label for="email">Email *</label>',
				'<input type="email"',
				'  id="email"',
				'  name="email"',
				'  data-validate-rules="required,email"',
				'  data-validate-message="You\'ve got to use a real email bro at %l"',
				'  data-validate-show-errors />',
				'</form>',
				'<form id="check-radio-form">',
				'<fieldset>',
				'  <label for="checkbox1">',
				'    <input type="checkbox" id="checkbox1" name="checkbox[]" value="Option 1"> Option 1',
				'  </label>',
				'  <label for="checkbox2">',
				'    <input type="checkbox" id="checkbox2" name="checkbox[]" value="Option 2"> Option 2',
				'  </label>',
				'  <label for="checkbox3">',
				'    <input type="checkbox" id="checkbox3" name="checkbox[]" value="Option 3"> Option 3',
				'  </label>',
				'</fieldset>',
				'<fieldset>',
				'  <label for="radio1">',
				'    <input type="radio" id="radio1" name="radio" value="Radio Option 1"> Radio Option 1',
				'  </label>',
				'  <label for="radio2">',
				'    <input type="radio" id="radio2" name="radio" value="Radio Option 2"> Radio Option 2',
				'  </label>',
				'  <label for="radio3">',
				'    <input type="radio" id="radio3" name="radio" value="Radio Option 3"> Radio Option 3',
				'  </label>',
				'</fieldset>',
				'</form>',
				'<form id="select-form">',
				'<label for="test-select">Select an option:</label>',
				'<select id="test-select" name="test-select"',
				'  data-validate-rules="required"',
				'  data-validate-message="You\'ve got to select one option"',
				'  data-validate-show-errors >',
				'  <option value="">Choose One</option>',
				'  <option value="option1">Option 1</option>',
				'  <option value="option2">Option 2</option>',
				'  <option value="option3">Option 3</option>',
				'  <option value="option4">Option 4</option>',
				'</select>',
				'</form>',
				'</content>',
				'</body>',
				'</html>',
			].join('/n');

			document.getElementsByTagName('body')[0].innerHTML = markup;
		});

		it('should get the label for an input', () => {
			const emailInput = document.getElementById(
				'email'
			) as HTMLInputElement;
			const label = getInputLabel(emailInput);
			expect(label).toBe('Email');
		});

		it('should get the label by input id', () => {
			const label = getInputLabel('email');
			expect(label).toBe('Email');
		});

		it('should parse validation arguments for email input', () => {
			const emailInput = document.getElementById(
				'email'
			) as HTMLInputElement;
			emailInput.value = 'someone@test.test';
			const args = parseValidationArgsFromInput({ value: emailInput });
			expect(args).toStrictEqual({
				value: emailInput.value,
				label: 'Email',
				rules: [{ name: 'required' }, { name: 'email' }],
				message: "You've got to use a real email bro at %l",
				show: true,
				_id: 'email',
			});
		});

		it('should create and remove a validation error', () => {
			let errs = document.querySelectorAll('.validation-error');
			let msgs = document.querySelectorAll('.validation-error-message');
			expect(msgs.length).toBe(0);
			expect(errs.length).toBe(0);

			const errMsg = 'noop, that is not an email';
			const emailInput = document.getElementById(
				'email'
			) as HTMLInputElement;

			renderValidationError(emailInput, errMsg);

			errs = document.querySelectorAll('.validation-error');
			msgs = document.querySelectorAll('.validation-error-message');
			expect(msgs.length).toBe(1);
			expect(errs.length).toBe(1);
			expect(msgs[0].textContent).toBe(errMsg);

			removeAllValidationErrors();
			errs = document.querySelectorAll('.validation-error');
			msgs = document.querySelectorAll('.validation-error-message');
			expect(msgs.length).toBe(0);
			expect(errs.length).toBe(0);
		});

		it('should not validate a required email input', () => {
			const emailInput = document.getElementById(
				'email'
			) as HTMLInputElement;
			emailInput.value = 'not-an-email';

			const validationArgs = {
				value: emailInput,
			};
			const errors = validate(validationArgs);
			expect(errors).toHaveLength(1);
			expect(errors[0]).toHaveProperty('value');
			expect(errors[0]).toHaveProperty('rule');
			expect(errors[0]).toHaveProperty('error');
			expect(errors[0].value).toBe(emailInput.value);
			expect(errors[0].rule).toBe('email');
			expect(errors[0].error).toBe(
				"You've got to use a real email bro at Email"
			);

			const errs = document.querySelectorAll('.validation-error');
			const msgs = document.querySelectorAll('.validation-error-message');
			expect(msgs.length).toBe(1);
			expect(errs.length).toBe(1);
			expect(msgs[0].textContent).toBe(errors[0].error);

			removeAllValidationErrors();
		});

		it('should validate a required email input', () => {
			const emailInput = document.getElementById(
				'email'
			) as HTMLInputElement;
			emailInput.value = 'tester@testington.tst';

			const validationArgs = {
				value: emailInput,
			};
			const errors = validate(validationArgs);
			expect(errors).toHaveLength(0);
			const errs = document.querySelectorAll('.validation-error');
			const msgs = document.querySelectorAll('.validation-error-message');
			expect(msgs.length).toBe(0);
			expect(errs.length).toBe(0);
			removeAllValidationErrors();
		});

		it('should validate select input form', () => {
			const select = document.getElementById(
				'test-select'
			) as HTMLSelectElement;

			expect(select).toBeDefined();

			let errors = validate({ value: select });
			expect(errors.length).toBe(1);

			const selectedOption = select.getElementsByTagName('option')[2];
			expect(selectedOption).toBeDefined();
			selectedOption.selected = true;
			errors = validate({ value: select });

			expect(errors.length).toBe(0);
		});

		// it.skip('TODO: should validate the checkbox form', () => {
		// 	const checkbox = document.querySelectorAll(
		// 		'input[type="checkbox"]'
		// 	);
		// });

		// it.skip('TODO: should validate the radio form', () => {
		// 	const radio = document.querySelectorAll(
		// 		'input[type="radio"]'
		// 	);
		// });
	});
});
