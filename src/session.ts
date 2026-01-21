const TEST_NAME = '__session_storage_test__';
const TEST_VAL = 'yes';

/**
 * Check if sessionStorage is available
 *
 * @function available
 * @returns {boolean}
 */
function available(): boolean {
	if (typeof sessionStorage === 'undefined') {
		return false;
	}

	try {
		sessionStorage.setItem(TEST_NAME, TEST_VAL);
		if (sessionStorage.getItem(TEST_NAME) === TEST_VAL) {
			sessionStorage.removeItem(TEST_NAME);
			return true;
		} else {
			return false;
		}
	} catch {
		return false;
	}
}

/**
 * Creates a session value. This is a wrapper around sessionStorage.setItem() where all values are stringified.
 *
 * @method set
 * @param {string} name The name of the session object
 * @param {T} value The value of the session object
 */
function set<T>(name: string, value: T) {
	if (!available()) {
		return;
	}

	const val = JSON.stringify(value);
	sessionStorage.setItem(name, val);
}

/**
 * Retrieves a value from session storage.
 *
 * @method get
 * @param {string} name The name of the session storage value being retrieved
 * @param {D} defaultVal The default value to return if the value is not found
 * @return The retrieved value or default value
 */
function get<T, D extends T | undefined = undefined>(
	name: string,
	defaultVal?: D
): D extends undefined ? T | null : T {
	if (!available()) {
		return (defaultVal ?? null) as D extends undefined ? T | null : T;
	}

	const value = sessionStorage.getItem(name);

	if (value === null) {
		return (defaultVal ?? null) as D extends undefined ? T | null : T;
	}

	try {
		return JSON.parse(value) as T;
	} catch {
		return (defaultVal ?? null) as D extends undefined ? T | null : T;
	}
}

/**
 * Removes a session object.
 *
 * @method remove
 * @param {string} name The name of the session object being removed
 */
function remove(name: string) {
	if (!available()) {
		return;
	}
	sessionStorage.removeItem(name);
}

export const session = {
	available,
	set,
	get,
	remove,
} as const;
