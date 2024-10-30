export type CheckRadioInputElement =
	| (HTMLInputElement & { type: 'radio' })
	| { type: 'checkbox' }; // Union type for radio and checkbox

export type FormControl = HTMLInputElement | HTMLSelectElement; //| CheckRadioInputElement;

/**
 * Arguments for the validate function.
 * @param {string | HTMLInputElement} value The input element to validate.
 * @param {{name: string, parameter: string | number}[]} rules The validation rules to apply from the RULES constant.
 * @param {string} label The label for the input element.
 * @param {string} message The validation error message.
 * @param {boolean} show Render the error message when value is an input type.
 */
export interface ValidateArgs {
	value: string | FormControl;
	rules?: ValidateArgsRule[];
	label?: string;
	message?: string;
	show?: boolean;
	_id?: string; // used internally to show and hide errors
}

/**
 * The interface used to describe ValidateArg.rules
 *
 * @interface ValidatorError
 * @param {string} name The rule name
 * @param {string|number|undefined} parameter The parameter used for the rule, if any.
 */
export interface ValidateArgsRule {
	name: (typeof RULES)[number]['name'];
	parameter?: string | number;
}

/**
 * The interface used to describe validation errors
 *
 * @interface ValidatorError
 * @param {string} value The value that was validated against the rule.
 * @param {string} rule The validation rule tha was violated.
 * @param {string} parameter? The parameter used for the rule, if any.
 * @param {string} error The validation error message.
 * @param {string} id The unique id of the input if error came from an html input element
 */
export interface ValidatorError {
	value: string;
	error: string;
	rule: (typeof RULES)[number]['name'];
	parameter?: string | number;
	id?: string;
}

/**
 * The interface used to describe the validation rules
 *
 * @interface ValidatorRule
 * @param name {string} The name of the rule.
 * @param message {string} The message that appears when a rule is violated.
 * @param description {string} The rule description.
 * @param example? {string} An example of a valid value
 * @param parameterRequired {boolean} Whether or not the rule requires any additional parameters
 * @param hook {(value: string, option?: string | number) => boolean} The function used to validate the input
 */
export interface ValidatorRule {
	name: string;
	message: string;
	description: string;
	example?: string;
	parameterRequired: boolean;
	hook: (value: string, option?: string | number) => boolean;
}

/**
 * A collection of regular expressions used for validation.
 *
 * @property REGEXP
 * @static
 * @type Object
 */
const REGEXP = {
	decimal: /^-?[0-9]*\.?[0-9]+$/,
	url: /\b(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|]/i,
	email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	numeric: /^[0-9]+$/,
	integer: /^-?[0-9]+$/,
	hasNumber: /[0-9]/,
	hasUpper: /[A-Z]/,
	hasLower: /[a-z]/,
	hasSpecialChar: /[$&+,:;=?@#|'"<>.^*()%!_-]/,
	creditCard: /^[\d\-\s]+$/,
	phone: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
	base64: /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/i,
	ip: /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
	alphaDash: /^[a-z0-9_-]+$/i,
	alphaNumeric: /^[a-z0-9]+$/i,
	alpha: /^[a-z]+$/i,
};

/**
 * A collection of validation rules used by validator.
 *
 * @property RULES
 * @static
 * @type ValidatorRule[]
 */
export const RULES: ValidatorRule[] = [
	{
		name: 'required',
		message: '<em>%l</em> is required.',
		description: 'Must not be empty.',
		parameterRequired: false,
		hook: (value) => {
			if (!value) {
				return false;
			}
			return Boolean(value.length);
		},
	},
	{
		name: 'matches',
		message: '<em>%l</em> must be the same as <em>%p</em>.',
		description: 'Must match another field value.',
		parameterRequired: true,
		hook: (value, param) => {
			return value === param;
		},
	},
	{
		name: 'url',
		message: '<em>%l</em> must contain a valid url.',
		description: 'Must be a valid url.',
		example: 'http://www.example.com',
		parameterRequired: false,
		hook: (value) => {
			return REGEXP.url.test(value.trim());
		},
	},
	{
		name: 'email',
		message: '<em>%l</em> must contain a valid email address.',
		description: 'Must be a valid email address.',
		example: 'email@example.com',
		parameterRequired: false,
		hook: (value) => {
			return REGEXP.email.test(value.trim());
		},
	},
	{
		name: 'emails',
		message: '<em>%l</em> must contain all valid email addresses.',
		description: 'Must be a comma separated list of valid email addresses.',
		example: 'email1@example.com, email2@example.com',
		parameterRequired: false,
		hook: (value) => {
			const result = value.split(',');
			return result.every((item) => REGEXP.email.test(item.trim()));
		},
	},
	{
		name: 'minLength',
		message:
			'<em>%l</em> must be at least <em>%p</em> characters in length.',
		description: 'Must be at least X characters long.',
		parameterRequired: true,
		hook: (value, param) => {
			if (!param) {
				return false;
			}
			return value.length >= parseInt(param.toString(), 10);
		},
	},
	{
		name: 'maxLength',
		message:
			'<em>%l</em> must not exceed <em>%p</em> characters in length.',
		description: 'Must be no longer than X characters.',
		parameterRequired: true,
		hook: (value, param) => {
			if (!param) {
				return false;
			}
			return value.length <= parseInt(param.toString(), 10);
		},
	},
	{
		name: 'exactLength',
		message:
			'<em>%l</em> must be exactly <em>%p</em> characters in length.',
		description: 'Must be exactly X characters long.',
		parameterRequired: true,
		hook: (value, param) => {
			if (!param) {
				return false;
			}
			return value.length === parseInt(param.toString(), 10);
		},
	},
	{
		name: 'greaterThan',
		message: '<em>%l</em> must contain a number greater than <em>%p</em>.',
		description: 'Must be greater than X.',
		parameterRequired: true,
		hook: (value, param) => {
			if (!param) {
				return false;
			}
			return parseFloat(value) > parseFloat(param.toString());
		},
	},
	{
		name: 'lessThan',
		message: '<em>%l</em> must contain a number less than <em>%p</em>.',
		description: 'Must be less than X.',
		parameterRequired: true,
		hook: (value, param) => {
			if (!param) {
				return false;
			}
			return parseFloat(value) < parseFloat(param.toString());
		},
	},
	{
		name: 'equals',
		message: '<em>%l</em> must be equal to <em>%p</em>.',
		description: 'Must be equal to X.',
		parameterRequired: true,
		hook: (value, param) => {
			return value.trim() === String(param).trim();
		},
	},
	{
		name: 'alpha',
		message: '<em>%l</em> must only contain alphabetical characters.',
		description: 'Can only contain alphabetical characters (A-z).',
		parameterRequired: false,
		hook: (value) => {
			return REGEXP.alpha.test(value);
		},
	},
	{
		name: 'alphaNumeric',
		message: '<em>%l</em> must only contain alpha-numeric characters.',
		description: 'Can only contain alpha-numeric characters (A-z, 0-9).',
		parameterRequired: false,
		hook: (value) => {
			return REGEXP.alphaNumeric.test(value);
		},
	},
	{
		name: 'alphaDash',
		message:
			'<em>%l</em> must only contain alpha-numeric characters, underscores and dashes.',
		description:
			'Can only contain alpha-numeric characters, underscores, or dashes.',
		parameterRequired: false,
		hook: (value) => {
			return REGEXP.alphaDash.test(value);
		},
	},
	{
		name: 'numeric',
		message: '<em>%l</em> must only contain a whole number.',
		description: 'Must be a whole (non-negative) number.',
		parameterRequired: false,
		hook: (value) => {
			return REGEXP.numeric.test(value);
		},
	},
	{
		name: 'integer',
		message: '<em>%l</em> must be a number.',
		description: 'Must be an integer; either positive or negative.',
		parameterRequired: false,
		hook: (value) => {
			return REGEXP.integer.test(value);
		},
	},
	{
		name: 'decimal',
		message: '<em>%l</em> must contain a decimal number.',
		description:
			'Must be a valid integer or decimal consist of two parts: an integer and a fraction separated by a decimal point.',
		parameterRequired: false,
		hook: (value) => {
			return REGEXP.decimal.test(value);
		},
	},
	{
		name: 'ip',
		message: '<em>%l</em> must contain a valid IP address.',
		description: 'Must be a valid IP address.',
		parameterRequired: false,
		hook: (value) => {
			return REGEXP.ip.test(value);
		},
	},
	{
		name: 'base64',
		message: '<em>%l</em> must contain a base64 string.',
		description: 'Must be a base64 string.',
		parameterRequired: false,
		hook: (value) => {
			return REGEXP.base64.test(value);
		},
	},

	{
		name: 'phone',
		message: '<em>%l</em> must contain a valid phone number.',
		description: 'Must be a valid phone number.',
		parameterRequired: false,
		hook: (value) => {
			return REGEXP.phone.test(value);
		},
	},

	{
		name: 'cvc',
		message: '<em>%l</em> must contain a valid CVC.',
		description: 'Must be a valid credit card cvc.',
		parameterRequired: false,
		hook: (value) => {
			return (
				/^\d+$/.test(value) && value.length >= 3 && value.length <= 4
			);
		},
	},
	{
		name: 'creditCard',
		message: '<em>%l</em> must contain a valid credit card number.',
		description: 'Must be a valid credit card number.',
		parameterRequired: false,
		hook: (value) => {
			if (!REGEXP.creditCard.test(value)) {
				return false;
			}

			let nCheck = 0;
			let nDigit = 0;
			let bEven = false;
			const strippedField = value.replace(/\D/g, '');
			let n = strippedField.length - 1;

			while (n >= 0) {
				const cDigit = strippedField.charAt(n);
				nDigit = parseInt(cDigit, 10);
				if (bEven) {
					if ((nDigit *= 2) > 9) {
						nDigit -= 9;
					}
				}
				nCheck += nDigit;
				bEven = !bEven;
				n--;
			}
			return nCheck % 10 === 0;
		},
	},
	{
		name: 'fileType',
		message: '<em>%l</em> must contain only <em>%p</em> files.',
		description:
			'Must be a comma separated list of file types e.g.: gif,png,jpg.',
		parameterRequired: true,
		hook: (value, param) => {
			if (typeof param !== 'string') return false;
			if (!param.length) return false;

			const extTypes = param.split(',').map((e) => e.trim());
			const ext = value.split('.').pop();
			if (!ext?.length) {
				return false;
			}
			return extTypes.includes(ext.trim());
		},
	},
	{
		name: 'hasSpecialChar',
		message:
			'<em>%l</em> must contain at least one special character e.g.: $&+,:;=?@#|\'"<>.^*()%!_-',
		description:
			'Must contain a special character e.g.: $&+,:;=?@#|\'"<>.^*()%!-.',
		parameterRequired: false,
		hook: (value) => {
			return REGEXP.hasSpecialChar.test(value);
		},
	},
	{
		name: 'hasNumber',
		message: '<em>%l</em> must contain at least one number.',
		description: 'Must contain a number.',
		parameterRequired: false,
		hook: (value) => {
			return REGEXP.hasNumber.test(value);
		},
	},
	{
		name: 'hasUpper',
		message: '<em>%l</em> must contain at least one upper case letter.',
		description: 'Must contain an upper case letter.',
		parameterRequired: false,
		hook: (value) => {
			return REGEXP.hasUpper.test(value);
		},
	},
	{
		name: 'hasLower',
		message: '<em>%l</em> must contain at least one lower case letter.',
		description: 'Must contain a lower case letter.',
		parameterRequired: false,
		hook: (value) => {
			return REGEXP.hasLower.test(value);
		},
	},
];

/**
 * Validate multiple values.
 *
 * @function validateAll
 * @param {ValidateArgs[]}
 * @return {ValidatorError[]}
 */
export function validateAll(options: ValidateArgs[]): ValidatorError[] {
	let errors: ValidatorError[] = [];

	for (const input of options) {
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
 * @param {ValidateArgs | ValidateArgs[]} options Validate options
 * @return {ValidatorError[]} A collection of validation errors.
 * @example
 * const options = {
 *   value: 'bad-email-address'
 *   rules: [{name:'required'}, {name:'email'}, {name:'minLength', parameter:4}]
 * }
 * const errors = validate( options );
 * @example
 * <script>
 * const inputEl = getElementById('email');
 * function submit () {
 *   const errors = validate( inputEl );
 *   if (!errors.length) { fetch(...) }
 * }
 * </script>
 *
 * <label for="email">Email</label>
 * <input type="email"
 *   id="email"
 *   name="email"
 *   data-validate-rules="required,email,minLength[4]"
 *   data-validate-message="My custom validation message (or just use the default)"
 *   data-validate-show-errors />
 */

export const validate = (
	options: ValidateArgs | ValidateArgs[]
): ValidatorError[] => {
	const errors: ValidatorError[] = [];

	if (Array.isArray(options)) {
		return validateAll(options);
	}

	// HTMLInputElement and HTMLSelectElement are both instanceof Element
	const isInputElement =
		typeof Element !== 'undefined' && options.value instanceof Element;

	if (isInputElement) {
		options = parseValidationArgsFromInput(options);
		if (options.show) {
			removeAllValidationErrors();
		}
	}

	if (!options.rules) {
		return errors;
	}

	for (const item of options.rules) {
		const rule = getRule(item.name);

		if (!rule) {
			// throw new Error(`Invalid rule: ${item.name}`);
			continue;
		}

		const valid = rule.hook(options.value as string, item.parameter);

		if (!valid) {
			const errMsg = parseValidationMessage(
				options.message ?? rule.message,
				options.label ?? 'undefined',
				item.parameter
			);

			const error: ValidatorError = {
				value: options.value as string,
				rule: item.name,
				error: errMsg,
			};

			if (item.parameter) {
				error.parameter = item.parameter;
			}

			if (options._id?.length) {
				error.id = options._id;
			}

			errors.push(error);
		}
	}

	if (errors.length && isInputElement && options.show && errors[0]?.id) {
		renderValidationError(errors[0].id, errors[0].error);
	}

	return errors;
};

/**
 * Returns validation arguments give an html input element
 * @function parseValidationArgsFromInput
 * @param {ValidateArgs} input The input or input id that errored.
 * @return {ValidateArgs}
 */
export function parseValidationArgsFromInput(
	input: ValidateArgs
): ValidateArgs {
	const inputEl = input.value as HTMLInputElement;
	const inputData = inputEl.dataset;

	// TODO: validate checkbox and radio inputs
	// only valid rule if is 'required'
	// if (inputEl.type === 'checkbox' || inputEl.type === 'radio') {
	// }

	if (!inputData.validateRules) {
		throw new Error('Input must use "data-validate-rules" attribute');
	}

	const ruleData = inputData.validateRules
		.split(',')
		.map((rule) => rule.trim());

	if (!ruleData.length) {
		throw new Error('Input must use "data-validate-rules" attribute');
	}

	input.rules = ruleData.map((rule) => parseRule(rule));

	input._id = inputEl.id;

	if (inputData.validateMessage?.length) {
		input.message = inputData.validateMessage;
	}

	input.label = getInputLabel(inputEl);

	if (
		Object.prototype.hasOwnProperty.call(inputData, 'validateShowErrors') &&
		inputData.validateShowErrors !== 'false'
	) {
		input.show = true;
	}

	input.value = inputEl.value;

	return input;
}

/**
 * Get the input's label text
 * @function getInputLabel
 * @param {FormControl | string} input The input or input id that errored.
 * @return {string}
 */
export function getInputLabel(input: FormControl | string): string {
	if (typeof input === 'string') {
		input = document.getElementById(input) as FormControl;
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
 * @param {FormControl} input The input that errored.
 * @param {ValidatorError} error The validation error data.
 * @param {'before' | 'after'} position='after' Whether to place the error message before or after the input.
 * @return {void}
 */
export function renderValidationError(
	input: FormControl | string,
	error: ValidatorError['error'],
	position: 'before' | 'after' = 'after'
): void {
	if (typeof input === 'string') {
		input = document.getElementById(input) as FormControl;
	}

	input.classList.add('validation-error');
	const label = document.createElement('label');
	label.className = 'validation-error-message';
	label.setAttribute('for', input.id);
	label.innerHTML = error;
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
 * Separates the parameter from the rule name. e.g.: minLength[8] => {rule:'maxLength', property:'8'}.
 * @function parseRule
 * @param {String} rule The rule to parse. e.g.: maxLength[20]
 * @return {ValidateArgsRule} The parsed rule
 */
export const parseRule = (str: string): ValidateArgsRule => {
	const execArr = /^(.+?)\[(.+)\]$/.exec(str);
	const result: ValidateArgsRule = { name: str };

	if (!execArr?.length) {
		return result;
	}

	if (execArr.length > 1) result.name = execArr[1];
	if (execArr.length > 2) result.parameter = execArr[2];

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
 * @function parseValidationMessage
 * @param {string} message the message to parse
 * @param {string} label to field label
 * @param {string | null} param to field parameter
 * @return {string}
 */
export function parseValidationMessage(
	message: string,
	label: string,
	param?: string | number
): string {
	message = message.replace('%l', label);

	if (param) {
		message = message.replace('%p', param.toString());
	}

	return message;
}

/**
 * @function getInputCollection
 * @return {FormControl[]}
 */
// export function getInputCollection(): FormControl[] {
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
