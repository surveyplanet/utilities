/**
 * Check if localStorage is available
 *
 * @function hasLocalStorage
 * @see https://stackoverflow.com/questions/16427636/check-if-localstorage-is-available
 * @returns {boolean}
 */

const TEST_NAME = '__local_storage_test__';
const TEST_VAL = 'yes';

export const hasLocalStorage = (): boolean => {
	console.warn(
		'hasLocalStorage() is deprecated. Use locals.available() instead.'
	);
	if (typeof localStorage === 'undefined') {
		return false; // localStorage is not available
	}

	try {
		localStorage.setItem(TEST_NAME, TEST_VAL);
		if (localStorage.getItem(TEST_NAME) === TEST_VAL) {
			localStorage.removeItem(TEST_NAME);
			return true; // localStorage is enabled
		} else {
			return false; // localStorage is disabled
		}
	} catch (e) {
		return false; // localStorage is disabled
	}
};
