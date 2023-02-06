# SurveyPlanet Typescript utility library

A collection of utility functions.

## Install

```bash
npm install @surveyplanet/utilities
```

## Functions

### Delay

Delay the call stack for a specified number of milliseconds

#### Example

```ts
import { delay } from '@surveyplanet/utilities';
const someFunction = async (checked) => {
	console.log(new Date());
	await delay(100);
	console.log(new Date());
};
```

#### Properties

| Property | Type   | Description                                                                                                                                                                   |
| -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ms=0`   | Number | The total number of milliseconds to delay for. Operates as a [`nextTick`](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#process-nexttick) if not provided |

### Validate

Validate form inputs

#### Example

```html
<script>
	import { validate } from '@surveyplanet/utilities';

	function submit () {
	  const errors = validate();
	  if (!errors) { fetch(...) }
	}
</script>

<label for="email">Email</label>
<input
	type="email"
	id="email"
	name="email"
	data-validate-rules="required,email"
	data-validate-message="Hey! you need to use a proper email dude." />

<label for="password">Password</label>
<input
	type="password"
	id="password"
	name="password"
	data-validate-rules="required,minLength[8],hasSpecialChar,hasNumber,hasUpper,hasLower" />

<label for="confirm-password">Confirm Password</label>
<input
	type="confirm-password"
	id="confirm-password"
	name="confirm-password"
	data-validate-rules="matches[password]" />
```

#### Properties

| Property | Type                                          | Description                                                                                                                                                                                                                                                         |
| -------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `input`  | HTMLInputElement \| HTMLSelectElement \| null | The input to validate. Must have `data-validate-rules` attribute with the appropriate rules value. See below for validation rules. If no input are provided all `input` and `select` elements with the `data-validate-rules` attribute are validated automatically. |

#### Dataset attributes

| Property                    | Description                                                                                                                                                                            |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data-validate-rules`       | A comma separated list of rules to use for validation. See validation rules below.                                                                                                     |
| `data-validate-message`     | A custom error message instead of the default one. Use `%l` to add the input label to your element and `%p` to the validation property. For example if you use `minLength[8]` %p is 8. |
| `data-validate-hide-errors` | Don't automatically show the validation error under the text box. You can handel them yourself this way.                                                                               |

#### Validation rules

| Property              | Description                                                                                                      |
| --------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `required`            | Must not be empty.                                                                                               |
| `matches[number]`     | Must match another field value.                                                                                  |
| `url`                 | Must be a valid url.                                                                                             |
| `email`               | Must be a valid email address.                                                                                   |
| `emails`              | Must be a comma separated list of valid email addresses.                                                         |
| `minLength[number]`   | Must be at least X characters long.                                                                              |
| `maxLength[number]`   | Must be no longer than X characters.                                                                             |
| `exactLength[number]` | Must be exactly X characters long.                                                                               |
| `greaterThan[number]` | Must be greater than X.                                                                                          |
| `lessThan[number]`    | Must be less than X.                                                                                             |
| `equals[number]`      | Must be equal to X.                                                                                              |
| `alpha`               | Can only contain alphabetical characters (A-z).                                                                  |
| `alphaNumeric`        | Can only contain alpha-numeric characters (A-z, 0-9).                                                            |
| `alphaDash`           | Can only contain alpha-numeric characters, underscores, or dashes.                                               |
| `numeric`             | Must be a whole (non-negative) number.                                                                           |
| `integer`             | Must be an integer; either positive or negative.                                                                 |
| `decimal`             | Must be a valid integer or decimal consist of two parts: an integer and a fraction separated by a decimal point. |
| `ip`                  | Must be a valid IP address.                                                                                      |
| `base64`              | Must be a base64 string.                                                                                         |
| `phone`               | Must be a valid phone number.                                                                                    |
| `cvc`                 | Must be a valid credit card cvc.                                                                                 |
| `creditCard`          | Must be a valid credit card number.                                                                              |
| `fileType[string]`    | Must be a comma separated list of file types e.g.: gif,png,jpg.                                                  |
| `hasSpecialChar`      | Must contain a special character e.g.: $&+,:;=?@#\|'"<>.^\*()%!-.                                                |
| `hasNumber`           | Must contain a number.                                                                                           |
| `hasUpper`            | Must contain an upper case letter.                                                                               |
| `hasLower`            | Must contain a lower case letter.                                                                                |

## Tests

[Vitest](https://vitest.dev/) is used for unit testing. The coverage is also done through vitest, using [c8](https://github.com/bcoe/c8).

### Commands

-   `test`: runs vitest test runner
-   `test:watch`: runs vitest test runner in watch mode
-   `test:coverage`: runs vitest test runner and generates coverage reports

## Format & lint

This library relies on the combination of [eslint](https://github.com/eslint/eslint) — through [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) for linting and [prettier](https://github.com/prettier/prettier) for formatting.
It also uses [cspell](https://github.com/streetsidesoftware/cspell) to ensure spelling

### Commands

-   `format`: runs prettier with automatic fixing
-   `format:check`: runs prettier without automatic fixing (used in CI)
-   `lint`: runs eslint with automatic fixing
-   `lint:check`: runs eslint without automatic fixing (used in CI)
-   `spell`: runs spell checker

## Releasing

Under the hood, this library uses [semantic-release](https://github.com/semantic-release/semantic-release).
The goal is to avoid manual release process. Using `semantic-release` will automatically create a github release (hence tags) as well as an npm release. Based on your commit history, `semantic-release` will automatically create a patch, feature or breaking release.

### Commands

-   `cz`: interactive CLI that helps you generate a proper git commit message, using [commitizen](https://github.com/commitizen/cz-cli)
-   `semantic-release`: triggers a release (used in CI)
