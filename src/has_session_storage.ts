/**
 * Check if sessionStorage is available
 *
 * @function hasSessionStorage
 * @returns {boolean}
 */
const TEST_NAME = '__session_storage_test__';
const TEST_VAL = 'yes';

export default function (): boolean {
	if (typeof sessionStorage === 'undefined') {
		return false; // sessionStorage is not available
	}

	try {
		sessionStorage.setItem(TEST_NAME, TEST_VAL);
		if (sessionStorage.getItem(TEST_NAME) === TEST_VAL) {
			sessionStorage.removeItem(TEST_NAME);
			return true; // sessionStorage is enabled
		} else {
			return false; // sessionStorage is disabled
		}
	} catch (e) {
		return false; // sessionStorage is disabled
	}
}
