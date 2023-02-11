/**
 * The interface used to describe the validation rules
 *
 * @interface ValidatorRule
 * @member name {string} The name of the rule.
 * @member message {string} The message that appears when a rule is violated.
 * @member description {string} The rule description.
 * @member example? {string} An example of a valid value
 * @member parameterRequired {boolean} Whether or not the rule requires any additional parameters
 * @member hook {(input: FormInput, param: string | undefined) => boolean} The function used to validate the input
 */
export interface ValidatorRule {
	name: string;
	message: string;
	description: string;
	example?: string;
	parameterRequired: boolean;
	hook: (input: FormInput, param: string | undefined) => boolean;
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
 * All the rule data for validator.
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
		hook: (field: FormInput) => {
			const { value } = field;
			if (
				field instanceof HTMLInputElement &&
				(field.type === 'checkbox' || field.type === 'radio')
			) {
				return field.checked;
			}
			return value.length > 0;
		},
	},
	{
		name: 'matches',
		message: '<em>%l</em> must be the same as <em>%p</em>.',
		description: 'Must match another field value.',
		parameterRequired: true,
		hook: (field: FormInput, param) => {
			if (!param?.length) return false;
			const inputs = document.getElementsByName(param);
			if (!inputs.length) return false;
			const input = inputs.item(0) as FormInput;
			return input.value === field.value;
		},
	},
	{
		name: 'url',
		message: '<em>%l</em> must contain a valid url.',
		description: 'Must be a valid url.',
		example: 'http://www.example.com',
		parameterRequired: false,
		hook: (field: FormInput) => {
			return REGEXP.url.test(field.value.trim());
		},
	},
	{
		name: 'email',
		message: '<em>%l</em> must contain a valid email address.',
		description: 'Must be a valid email address.',
		example: 'email@example.com',
		parameterRequired: false,
		hook: (field: FormInput) => {
			return REGEXP.email.test(field.value.trim());
		},
	},
	{
		name: 'emails',
		message: '<em>%l</em> must contain all valid email addresses.',
		description: 'Must be a comma separated list of valid email addresses.',
		example: 'email1@example.com, email2@example.com',
		parameterRequired: false,
		hook: (field: FormInput) => {
			const result = field.value.split(',');
			return result.every((item) => REGEXP.email.test(item.trim()));
		},
	},
	{
		name: 'minLength',
		message:
			'<em>%l</em> must be at least <em>%p</em> characters in length.',
		description: 'Must be at least X characters long.',
		parameterRequired: true,
		hook: (field: FormInput, param) => {
			if (!param || !REGEXP.numeric.test(param)) {
				return false;
			}
			return field.value.length >= parseInt(param, 10);
		},
	},
	{
		name: 'maxLength',
		message:
			'<em>%l</em> must not exceed <em>%p</em> characters in length.',
		description: 'Must be no longer than X characters.',
		parameterRequired: true,
		hook: (field: FormInput, param) => {
			if (!param || !REGEXP.numeric.test(param)) {
				return false;
			}
			return field.value.length <= parseInt(param, 10);
		},
	},
	{
		name: 'exactLength',
		message:
			'<em>%l</em> must be exactly <em>%p</em> characters in length.',
		description: 'Must be exactly X characters long.',
		parameterRequired: true,
		hook: (field: FormInput, param) => {
			if (!param || !REGEXP.numeric.test(param)) {
				return false;
			}
			return field.value.length === parseInt(param, 10);
		},
	},
	{
		name: 'greaterThan',
		message: '<em>%l</em> must contain a number greater than <em>%p</em>.',
		description: 'Must be greater than X.',
		parameterRequired: true,
		hook: (field: FormInput, param) => {
			if (!param || !REGEXP.numeric.test(param)) {
				return false;
			}
			return parseFloat(field.value) > parseFloat(param);
		},
	},
	{
		name: 'lessThan',
		message: '<em>%l</em> must contain a number less than <em>%p</em>.',
		description: 'Must be less than X.',
		parameterRequired: true,
		hook: (field: FormInput, param) => {
			if (!param || !REGEXP.numeric.test(param)) {
				return false;
			}
			return parseFloat(field.value) < parseFloat(param);
		},
	},
	{
		name: 'equals',
		message: '<em>%l</em> must be equal to <em>%p</em>.',
		description: 'Must be equal to X.',
		parameterRequired: true,
		hook: (field: FormInput, param) => {
			return field.value.trim() === String(param).trim();
		},
	},
	{
		name: 'alpha',
		message: '<em>%l</em> must only contain alphabetical characters.',
		description: 'Can only contain alphabetical characters (A-z).',
		parameterRequired: false,
		hook: (field: FormInput) => {
			return REGEXP.alpha.test(field.value);
		},
	},
	{
		name: 'alphaNumeric',
		message: '<em>%l</em> must only contain alpha-numeric characters.',
		description: 'Can only contain alpha-numeric characters (A-z, 0-9).',
		parameterRequired: false,
		hook: (field: FormInput) => {
			return REGEXP.alphaNumeric.test(field.value);
		},
	},
	{
		name: 'alphaDash',
		message:
			'<em>%l</em> must only contain alpha-numeric characters, underscores and dashes.',
		description:
			'Can only contain alpha-numeric characters, underscores, or dashes.',
		parameterRequired: false,
		hook: (field: FormInput) => {
			return REGEXP.alphaDash.test(field.value);
		},
	},
	{
		name: 'numeric',
		message: '<em>%l</em> must only contain a whole number.',
		description: 'Must be a whole (non-negative) number.',
		parameterRequired: false,
		hook: (field: FormInput) => {
			return REGEXP.numeric.test(field.value);
		},
	},
	{
		name: 'integer',
		message: '<em>%l</em> must be a number.',
		description: 'Must be an integer; either positive or negative.',
		parameterRequired: false,
		hook: (field: FormInput) => {
			return REGEXP.integer.test(field.value);
		},
	},
	{
		name: 'decimal',
		message: '<em>%l</em> must contain a decimal number.',
		description:
			'Must be a valid integer or decimal consist of two parts: an integer and a fraction separated by a decimal point.',
		parameterRequired: false,
		hook: (field: FormInput) => {
			return REGEXP.decimal.test(field.value);
		},
	},
	{
		name: 'ip',
		message: '<em>%l</em> must contain a valid IP address.',
		description: 'Must be a valid IP address.',
		parameterRequired: false,
		hook: (field: FormInput) => {
			return REGEXP.ip.test(field.value);
		},
	},
	{
		name: 'base64',
		message: '<em>%l</em> must contain a base64 string.',
		description: 'Must be a base64 string.',
		parameterRequired: false,
		hook: (field: FormInput) => {
			return REGEXP.base64.test(field.value);
		},
	},

	{
		name: 'phone',
		message: '<em>%l</em> must contain a valid phone number.',
		description: 'Must be a valid phone number.',
		parameterRequired: false,
		hook: (field: FormInput) => {
			return REGEXP.phone.test(field.value);
		},
	},

	{
		name: 'cvc',
		message: '<em>%l</em> must contain a valid CVC.',
		description: 'Must be a valid credit card cvc.',
		parameterRequired: false,
		hook: (field: FormInput) => {
			return (
				/^\d+$/.test(field.value) &&
				field.value.length >= 3 &&
				field.value.length <= 4
			);
		},
	},
	{
		name: 'creditCard',
		message: '<em>%l</em> must contain a valid credit card number.',
		description: 'Must be a valid credit card number.',
		parameterRequired: false,
		hook: (field: FormInput) => {
			if (!REGEXP.creditCard.test(field.value)) {
				return false;
			}

			let nCheck = 0;
			let nDigit = 0;
			let bEven = false;
			const strippedField = field.value.replace(/\D/g, '');
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
		hook: (field: FormInput, param) => {
			if (!param?.length) return false;
			const extTypes = param.split(',').map((e) => e.trim());
			const ext = field.value.split('.').pop();
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
		hook: (field: FormInput) => {
			return REGEXP.hasSpecialChar.test(field.value);
		},
	},
	{
		name: 'hasNumber',
		message: '<em>%l</em> must contain at least one number.',
		description: 'Must contain a number.',
		parameterRequired: false,
		hook: (field: FormInput) => {
			return REGEXP.hasNumber.test(field.value);
		},
	},
	{
		name: 'hasUpper',
		message: '<em>%l</em> must contain at least one upper case letter.',
		description: 'Must contain an upper case letter.',
		parameterRequired: false,
		hook: (field: FormInput) => {
			return REGEXP.hasUpper.test(field.value);
		},
	},
	{
		name: 'hasLower',
		message: '<em>%l</em> must contain at least one lower case letter.',
		description: 'Must contain a lower case letter.',
		parameterRequired: false,
		hook: (field: FormInput) => {
			return REGEXP.hasLower.test(field.value);
		},
	},
];

/**
 * Validate all inputs.
 * @function validateAll
 * @return {ValidatorError[]}
 */
export function validateAll(inputs: InputCollection): ValidatorError[] {
	let errors: ValidatorError[] = [];

	if (!inputs?.length) {
		inputs = getInputCollection();

		if (!inputs.length) {
			return errors;
		}
	}

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
	input: FormInput | null | undefined
): ValidatorError[] {
	const errors: ValidatorError[] = [];

	if (!input) {
		return validateAll(null);
	}

	const showErrors =
		Object.prototype.hasOwnProperty.call(
			input.dataset,
			'validateShowErrors'
		) && input.dataset.validateShowErrors !== 'false';

	if (showErrors) {
		removeAllValidationErrors();
	}

	const ruleData = input.dataset.validateRules;

	const labelText = getInputLabel(input);

	if (!ruleData?.length) {
		return errors;
	}

	const rules = ruleData.split(',').map((rule) => rule.trim());

	for (const ruleName of rules) {
		const params = parseRule(ruleName);
		const rule = getRule(params.rule);

		if (!rule) continue;

		const valid = rule.hook(input, params.param);

		if (!valid) {
			const msg = input.dataset.validateMessage?.length
				? input.dataset.validateMessage
				: rule.message;

			const errMsg = parseValidationMessage(msg, labelText, params.param);

			const err: ValidatorError = {
				id: input.id,
				name: input.name,
				class: input.className,
				value: input.value,
				error: errMsg,
				rule: params.rule,
			};

			if (params.param) {
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

/**
 * Get the input's label text
 * @function renderValidationError
 * @param {FormInput} input The input that errored.
 * @return {string}
 */
export function getInputLabel(input: FormInput): string {
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
 * @return {string[]}
 */
export const parseRule = (str: string): { rule: string; param?: string } => {
	const execArr = /^(.+?)\[(.+)\]$/.exec(str);
	const result: { rule: string; param?: string } = {
		rule: str,
	};

	if (!execArr?.length) {
		return result;
	}

	if (execArr.length > 1) result.rule = execArr[1];
	if (execArr.length > 2) result.param = execArr[2];

	return result;
};

/**
 * Find a validation rule by name.
 * @function getRule
 * @param {String} rule name of rule to find
 * @return {ValidatorRule | undefined}
 */
export function getRule(name: string): ValidatorRule | undefined {
	return RULES.find((rule) => rule.name === name);
}

/**
 * Parse validation message with label and param.
 * @function getInputCollection
 * @return {FormInput[]}
 */
export function getInputCollection(): FormInput[] {
	const inputs: InputCollection = Array.from(
		document.getElementsByTagName('input')
	);
	const selects: InputCollection = Array.from(
		document.getElementsByTagName('select')
	);

	return selects.concat(inputs).filter((input) => {
		return 'validateRules' in input.dataset;
	});
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
	param?: string
): string {
	message = message.replace('%l', label);

	if (param) {
		message = message.replace('%p', param.toString());
	}

	return message;
}
