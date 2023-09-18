import RULES, { type ValidatorRule } from './validation_rules';

/**
 * Arguments for the validate function.
 * @param {string | HTMLInputElement} value The input element to validate.
 * @param {{name: string, option: string | number}[]} rules The validation rules to apply from the RULES constant.
 * @param {string} label The label for the input element.
 * @param {string} message The validation error message.
 *
 */
export interface ValidateArgs {
	value: string | HTMLInputElement;
	rules?: {
		name: (typeof RULES)[number]['name'];
		option?: string | number;
	}[];
	label?: string;
	message?: string;
}

/**
 * The interface used to describe validation errors
 *
 * @interface ValidatorError
 * @member id {string} The id of the input element with the validation error.
 * @member name {string} The name of the input element with the validation error.
 * @member class {string} The class name of the input element with the validation error.
 * @member value {string} The value of the input element with the validation error.
 * @member error {string} The validation error message.
 * @member rule {string} The validation rule tha was violated.
 * @member parameter? {string} The parameter used for the rule, if any.
 */
export interface ValidatorError {
	id: string;
	name: string;
	class: string;
	value: string;
	error: string;
	rule: string;
	parameter?: string;
}

/**
 * Union type for HTMLInputElement and HTMLSelectElement
 *
 * @type FormInput
 */
export type FormInput = HTMLInputElement | HTMLSelectElement;

/**
 * Union type for defining iterable types of FormInputs.
 *
 * @type InputCollection
 */
export type InputCollection =
	| FormInput[]
	// | ArrayLike<FormInput>
	| NodeListOf<FormInput>
	| HTMLCollectionOf<FormInput>
	| undefined
	| null;

/**
 * Validate all inputs.
 * @function validateAll
 * @return {ValidatorError[]}
 */
export function validateAll(inputs: ValidateArgs[]): ValidatorError[] {
	let errors: ValidatorError[] = [];

	for (const input of inputs) {
		const err = validate(input);
		if (err.length) {
			errors = errors.concat(err);
		}
	}

	return errors;
}
/**
 * Utility for validating form inputs and displaying error messages.
 *
 * @function validate
 * @param {FormInput} input The input element to validate
 * @param {String} fields.id input id
 * @return {ValidatorError[]} A collection of validation errors.
 * @example
 * <script>
 * const inputEl = getElementById('email');
 * function submit () {
 *   const errors = validate( inputEl );
 *   if (!errors) { fetch(...) }
 * }
 * </script>
 *
 * <label for="email">Email</label>
 * <input type="email"
 *   id="email"
 *   name="email"
 *   data-validate-rules='require,email'
 *   data-validate-message="My custom validation message (or just use the default)"
 *   data-validate-show-errors />
 */

export default function validate(
	input: ValidateArgs | ValidateArgs[]
): ValidatorError[] {
	const errors: ValidatorError[] = [];
	let ruleData: string[] = [];
	if (Array.isArray(input)) {
		return validateAll(input);
	}

	let showErrors = false;

	if (
		Object.prototype.toString.call(input.value) ===
		'[object HTMLInputElement]'
	) {
		const inputEl = input.value as HTMLInputElement;
		const inputData = inputEl.dataset;
		if (!inputData.validateRules) {
			throw new Error('Input must use "data-validate-rules" attribute');
		}

		ruleData = inputData.validateRules
			.split(',')
			.map((rule) => rule.trim());

		if (!ruleData.length) {
			throw new Error('Input must use "data-validate-rules" attribute');
		}

		input.rules = ruleData.map((rule) => {
			parseRule(rule);
		});

		if (inputData.message) {
			input.message = inputData.message;
		}

		for (const rule of input.rules) {
			if (!isValidRule(rule.name)) {
				throw new Error(`Invalid rule: ${rule.name}`);
			}
		}

		input.value = inputEl.value;

		showErrors =
			Object.prototype.hasOwnProperty.call(
				input.dataset,
				'validateShowErrors'
			) && input.dataset.validateShowErrors !== 'false';
	}

	if (typeof input === 'object' && 'label' in input && 'value' in input) {
		input = document.getElementById(input.label) as FormInput;
	}

	if (showErrors) {
		removeAllValidationErrors();
	}

	// const labelText = getInputLabel(input);

	if (!ruleData?.length) {
		return errors;
	}

	const rules = ruleData;
	// loop trough input.rules and

	for (const ruleArg of input.rules) {
		const rule = getRule(ruleArg.name);

		if (!rule) continue;

		const valid = rule.hook(ruleArg.value, ruleArgs.param);

		if (!valid) {
			// TODO:
			// const msg = input.dataset.validateMessage?.length
			// 	? input.dataset.validateMessage
			// 	: rule.message;

			// const errMsg = parseValidationMessage(msg, labelText, params.param);

			const err: ValidatorError = {
				// id: input.id,
				// name: input.name,
				// class: input.className,
				value: ruleArgs.value,
				error: errMsg,
				rule: params.rule,
			};

			if (params.options) {
				err.parameter = params.param;
			}

			errors.push(err);
		}
	}

	if (showErrors && errors.length) {
		renderValidationError(input, errors[0]);
	}

	return errors;
}

function isValidRule(name: string): boolean {
	if (!name || !name.length) {
		return false;
	}

	return RULES.some((rule) => rule.name === name);
}

/**
 * Get the input's label text
 * @function renderValidationError
 * @param {FormInput} input The input that errored.
 * @return {string}
 */
export function getInputLabel(input: FormInput | string): string {
	if (typeof input === 'string') {
		input = document.getElementById(input) as FormInput;
	}
	const label = document.querySelector<HTMLLabelElement>(
		`label[for="${input.id}"]`
	);

	let labelText = '';

	const placeholderText = input.getAttribute('placeholder');

	if (label?.textContent?.length) {
		labelText = label.textContent.trim();

		if (labelText.length > 1 && labelText.endsWith('*')) {
			labelText = labelText.replace(/\s?\*$/, '');
		}
	} else if (placeholderText?.length) {
		labelText = placeholderText;
	} else if (input.name.length) {
		labelText = input.name.replace(/['"<>.|^*_-]/g, ' ');
	}

	return labelText;
}

/**
 * Add a validation error messages before or after an input.
 * @function renderValidationError
 * @param {FormInput} input The input that errored.
 * @param {ValidatorError} error The validation error data.
 * @param {'before' | 'after'} position='after' Whether to place the error message before or after the input.
 * @return {void}
 */
export function renderValidationError(
	input: FormInput,
	error: ValidatorError,
	position: 'before' | 'after' = 'after'
): void {
	input.classList.add('validation-error');

	const label = document.createElement('label');
	label.className = 'validation-error-message';
	label.setAttribute('for', error.id);
	label.innerHTML = error.error;

	input.insertAdjacentElement(
		position === 'before' ? 'beforebegin' : 'afterend',
		label
	);
}

/**
 * Removes all the validation error classes and messaging.
 * @function removeAllValidationErrors
 * @return {void}
 */
export function removeAllValidationErrors(): void {
	const inputs = document.getElementsByClassName('validation-error');

	for (const input of inputs) {
		input.classList.remove('validation-error');
	}

	const messages = document.getElementsByClassName(
		'validation-error-message'
	);

	for (const message of messages) {
		message.parentNode?.removeChild(message);
	}
}

/**
 * Separates the parameter from the rule name. e.g.: minLength[8] => {rule:'maxLength', param:'8'}.
 * @function parseRule
 * @param {String} rule The rule to parse. e.g.: maxLength[20]
 * @return {{ name: string; option: string | number }} The parsed rule which is of type ValidatorRule['name'][option]
 */
export const parseRule = (
	str: string
): { name: string; option: string | number } | undefined => {
	const execArr = /^(.+?)\[(.+)\]$/.exec(str);
	const result: { name: string; option: string | number } = {
		name: str,
		option: NaN,
	};

	if (!execArr?.length) {
		return result;
	}

	if (execArr.length > 1) result.name = execArr[1];
	if (execArr.length > 2) result.option = execArr[2];

	return result;
};

/**
 * Find a validation rule by name.
 * @function getRule
 * @param {String} rule name of rule to find
 * @return {ValidatorRule | undefined}
 */
export function getRule(
	name: (typeof RULES)[number]['name']
): ValidatorRule | undefined {
	return RULES.find((rule) => rule.name === name);
}

/**
 * Parse validation message with label and param.
 * @function getInputCollection
 * @return {FormInput[]}
 */
// export function getInputCollection(): FormInput[] {
// 	const inputs: InputCollection = Array.from(
// 		document.getElementsByTagName('input')
// 	);
// 	const selects: InputCollection = Array.from(
// 		document.getElementsByTagName('select')
// 	);

// 	return selects.concat(inputs).filter((input) => {
// 		return 'validateRules' in input.dataset;
// 	});
// }

/**
 * Parse validation message with label and param.
 * @function parseValidationMessage
 * @param {string} message the message to parse
 * @param {string} label to field label
 * @param {string | null} param to field parameter
 * @return {string}
 */
export function parseValidationMessage(
	message: string,
	label: string,
	param?: string
): string {
	message = message.replace('%l', label);

	if (param) {
		message = message.replace('%p', param.toString());
	}

	return message;
}
