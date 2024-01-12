const TEST_NAME = '__local_storage_test__';
const TEST_VAL = 'yes';

/**
 * Check if localStorage is available
 *
 * @function available
 * @returns {boolean}
 */
export function available(): boolean {
	if (typeof localStorage === 'undefined') {
		return false;
	}

	try {
		localStorage.setItem(TEST_NAME, TEST_VAL);
		if (localStorage.getItem(TEST_NAME) === TEST_VAL) {
			localStorage.removeItem(TEST_NAME);
			return true;
		} else {
			return false;
		}
	} catch (e) {
		return false;
	}
}

/**
 * Creates a local storage value. This is a wrapper around localStorage.setItem() where all values are stringified.
 *
 * @method set
 * @param {string} name the name of the local storage value
 * @param {T} value the value of the local object
 */
export function set<T>(name: string, value: T) {
	if (!available()) {
		return null;
	}

	const val = JSON.stringify(value);
	return localStorage.setItem(name, val);
}

/**
 * Retrieves a value from  local storage.
 *
 * @method get
 * @param {string} name The name of the local storage value being retrieved
 * @param {T} defaultVal A default value if local storage value is undefined
 * @return {T}
 */
export function get<T>(name: string, defaultVal: T | undefined): T | null {
	if (!available()) {
		return defaultVal ?? null;
	}

	const value = localStorage.getItem(name);

	if (value === null) {
		return defaultVal ?? null;
	}

	try {
		return JSON.parse(value) as T;
	} catch (error) {
		return null;
	}
}

/**
 * Removes a local object.
 *
 * @method remove
 * @param {string} name the name of the local object being retrieved
 */
export function remove(name: string) {
	if (!available()) {
		return;
	}

	return localStorage.removeItem(name);
}
