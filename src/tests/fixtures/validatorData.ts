const testData = [
	{
		name: 'required',
		values: ['required'],
		invalids: [''],
	},
	{
		name: 'matches',
		parameter: 'required',
		values: ['required'],
		invalids: ['invalid'],
	},
	{
		name: 'url',
		values: ['https://www.apple.com'],
		invalids: ['invalid-url'],
	},
	{
		name: 'email',
		values: ['testing@surveyplanet.com'],
		invalids: ['invalid-email'],
	},
	{
		name: 'emails',
		values: ['testing1@surveyplanet.com,testing2@surveyplanet.com'],
		invalids: ['invalid1-email,invalid2-email'],
	},
	{
		name: 'minLength',
		parameter: 8,
		values: ['The quick brown fox.'],
		invalids: ['A', 'The fox'],
	},
	{
		name: 'maxLength',
		parameter: 20,
		values: ['The quick fox.'],
		invalids: ['The quick brown fox jumped over the lazy dog.'],
	},
	{
		name: 'exactLength',
		parameter: 20,
		values: ['The quick brown fox.'],
		invalids: ['The quick fox.'],
	},
	{
		name: 'greaterThan',
		parameter: 20,
		values: ['21'],
		invalids: ['1', '20'],
	},
	{
		name: 'equals',
		parameter: 20,
		values: ['20'],
		invalids: ['s', '21'],
	},
	{
		name: 'lessThan',
		parameter: 20,
		values: ['2'],
		invalids: ['20'],
	},
	{
		name: 'alpha',
		values: ['abc'],
		invalids: ['123'],
	},
	{
		name: 'alphaNumeric',
		values: ['abc123'],
		invalids: ['abc(123)'],
	},
	{
		name: 'alphaDash',
		values: ['_abc-123'],
		invalids: ['#abc-123'],
	},
	{
		name: 'numeric',
		values: ['3'],
		invalids: ['invalid3'],
	},
	{
		name: 'integer',
		values: ['-3'],
		invalids: ['invalid'],
	},
	{
		name: 'decimal',
		values: ['.3'],
		invalids: ['invalid3'],
	},
	{
		name: 'ip',
		values: ['8.8.8.8'],
		invalids: ['invalid-ip'],
	},
	{
		name: 'base64',
		values: ['U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ='],
		invalids: ['in'],
	},
	{
		name: 'cvc',
		values: ['123'],
		invalids: ['invalid-cvc'],
	},
	{
		name: 'creditCard',
		values: ['4242-4242-4242-4242'],
		invalids: ['invalid-cc'],
	},
	{
		name: 'phone',
		values: ['5558889999'],
		invalids: ['invalid-phone'],
	},
	{
		name: 'fileType',
		values: ['image.png'],
		invalids: ['invalid.xml'],
		parameter: 'gif,png,jpg',
	},
	{
		name: 'hasSpecialChar',
		values: ['fo-x', 'fo!x', 'fox?', '"'],
		invalids: ['nope'],
	},
	{
		name: 'hasNumber',
		values: ['hell0'],
		invalids: ['no-number'],
	},
	{
		name: 'hasUpper',
		values: ['Hello'],
		invalids: ['no-upper'],
	},
	{
		name: 'hasLower',
		values: ['HELLo'],
		invalids: ['NO-LOWER'],
	},
	// TODO: fix custom rule
	// This doesn't work all the time, particularly when there are no commas in the regular expression.
	// Possible solution is to only allow one rule when using custom rule.
	// {
	// 	name: 'custom',
	// 	parameter: '[a-z]',
	// 	values: ['abcdefg'],
	// 	invalids: ['ABC123'],
	// },
];

export default testData;
