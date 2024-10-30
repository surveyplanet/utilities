const TEST_NAME = '__session_storage_test__';
const TEST_VAL = 'yes';

export const session = {
	/**
	 * Check if sessionStorage is available
	 *
	 * @function available
	 * @returns {boolean}
	 */
	available: (): boolean => {
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
		} catch (e) {
			return false;
		}
	},

	/**
	 * Creates a session value. This is a wrapper around sessionStorage.setItem() where all values are stringified.
	 *
	 * @method set
	 * @param {string} name the name of the session object
	 * @param {T} value the value of the session object
	 */
	set: <T>(name: string, value: T) => {
		if (!session.available()) {
			return null;
		}

		const val = JSON.stringify(value);
		sessionStorage.setItem(name, val);
	},

	/**
	 * Creates a session storage value. This is a wrapper around sessionStorage.setItem() where all values are stringified.
	 *
	 * @method set
	 * @param {string} name the name of the session storage value
	 * @param {T} value the value of the session object
	 * @return {T}
	 */
	get: <T>(name: string, defaultVal: T | undefined = undefined): T | null => {
		if (!session.available()) {
			return defaultVal ?? null;
		}

		const value = sessionStorage.getItem(name);

		if (value === null) {
			return defaultVal ?? null;
		}

		try {
			return JSON.parse(value) as T;
		} catch (error) {
			return null;
		}
	},

	/**
	 * Removes a session object.
	 *
	 * @method remove
	 * @param {string} name the name of the session object being retrieved
	 */
	remove: (name: string) => {
		if (session.available()) {
			sessionStorage.removeItem(name);
		}
	},
} as const;
