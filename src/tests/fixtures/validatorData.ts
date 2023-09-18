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

export default testData;
