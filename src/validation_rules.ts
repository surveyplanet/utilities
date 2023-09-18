import { ValidateArgs } from './validate';
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
	hook: (input: ValidateArgs, param: string | undefined) => boolean;
}

/**
 * All the rule data for validator.
 *
 * @property RULES
 * @static
 * @type ValidatorRule[]
 */

//change .value to a string and type form FormInput to string
const RULES: ValidatorRule[] = [
	{
		name: 'required',
		message: '<em>%l</em> is required.',
		description: 'Must not be empty.',
		parameterRequired: false,
		hook: (field: ValidateArgs) => {
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
		hook: (field: ValidateArgs, param) => {
			if (!param?.length) return false;
			const inputs = document.getElementsByName(param);
			if (!inputs.length) return false;
			const input = inputs.item(0) as HTMLInputElement;
			return input.value === field.value;
		},
	},
	{
		name: 'url',
		message: '<em>%l</em> must contain a valid url.',
		description: 'Must be a valid url.',
		example: 'http://www.example.com',
		parameterRequired: false,
		hook: (field: ValidateArgs) => {
			return REGEXP.url.test(field.value.trim());
		},
	},
	{
		name: 'email',
		message: '<em>%l</em> must contain a valid email address.',
		description: 'Must be a valid email address.',
		example: 'email@example.com',
		parameterRequired: false,
		hook: (field: ValidateArgs) => {
			return REGEXP.email.test(field.value.trim());
		},
	},
	{
		name: 'emails',
		message: '<em>%l</em> must contain all valid email addresses.',
		description: 'Must be a comma separated list of valid email addresses.',
		example: 'email1@example.com, email2@example.com',
		parameterRequired: false,
		hook: (field: ValidateArgs) => {
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
		hook: (field: ValidateArgs, param) => {
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
		hook: (field: ValidateArgs, param) => {
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
		hook: (field: ValidateArgs, param) => {
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
		hook: (field: ValidateArgs, param) => {
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
		hook: (field: ValidateArgs, param) => {
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
		hook: (field: ValidateArgs, param) => {
			return field.value.trim() === String(param).trim();
		},
	},
	{
		name: 'alpha',
		message: '<em>%l</em> must only contain alphabetical characters.',
		description: 'Can only contain alphabetical characters (A-z).',
		parameterRequired: false,
		hook: (field: ValidateArgs) => {
			return REGEXP.alpha.test(field.value);
		},
	},
	{
		name: 'alphaNumeric',
		message: '<em>%l</em> must only contain alpha-numeric characters.',
		description: 'Can only contain alpha-numeric characters (A-z, 0-9).',
		parameterRequired: false,
		hook: (field: ValidateArgs) => {
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
		hook: (field: ValidateArgs) => {
			return REGEXP.alphaDash.test(field.value);
		},
	},
	{
		name: 'numeric',
		message: '<em>%l</em> must only contain a whole number.',
		description: 'Must be a whole (non-negative) number.',
		parameterRequired: false,
		hook: (field: ValidateArgs) => {
			return REGEXP.numeric.test(field.value);
		},
	},
	{
		name: 'integer',
		message: '<em>%l</em> must be a number.',
		description: 'Must be an integer; either positive or negative.',
		parameterRequired: false,
		hook: (field: ValidateArgs) => {
			return REGEXP.integer.test(field.value);
		},
	},
	{
		name: 'decimal',
		message: '<em>%l</em> must contain a decimal number.',
		description:
			'Must be a valid integer or decimal consist of two parts: an integer and a fraction separated by a decimal point.',
		parameterRequired: false,
		hook: (field: ValidateArgs) => {
			return REGEXP.decimal.test(field.value);
		},
	},
	{
		name: 'ip',
		message: '<em>%l</em> must contain a valid IP address.',
		description: 'Must be a valid IP address.',
		parameterRequired: false,
		hook: (field: ValidateArgs) => {
			return REGEXP.ip.test(field.value);
		},
	},
	{
		name: 'base64',
		message: '<em>%l</em> must contain a base64 string.',
		description: 'Must be a base64 string.',
		parameterRequired: false,
		hook: (field: ValidateArgs) => {
			return REGEXP.base64.test(field.value);
		},
	},

	{
		name: 'phone',
		message: '<em>%l</em> must contain a valid phone number.',
		description: 'Must be a valid phone number.',
		parameterRequired: false,
		hook: (field: ValidateArgs) => {
			return REGEXP.phone.test(field.value);
		},
	},

	{
		name: 'cvc',
		message: '<em>%l</em> must contain a valid CVC.',
		description: 'Must be a valid credit card cvc.',
		parameterRequired: false,
		hook: (field: ValidateArgs) => {
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
		hook: (field: ValidateArgs) => {
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
		hook: (field: ValidateArgs, param) => {
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
		hook: (field: ValidateArgs) => {
			return REGEXP.hasSpecialChar.test(field.value);
		},
	},
	{
		name: 'hasNumber',
		message: '<em>%l</em> must contain at least one number.',
		description: 'Must contain a number.',
		parameterRequired: false,
		hook: (field: ValidateArgs) => {
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
		hook: (field: ValidateArgs) => {
			return REGEXP.hasLower.test(field.value);
		},
	},
];

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

export default RULES;
