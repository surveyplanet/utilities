const TEST_NAME = '__local_storage_test__';
const TEST_VAL = 'yes';

export const locals = {
	/**
	 * Check if localStorage is available
	 *
	 * @function available
	 * @returns {boolean}
	 */
	available: (): boolean => {
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
	},

	/**
	 * Creates a local storage value. This is a wrapper around localStorage.setItem() where all values are stringified.
	 *
	 * @method set
	 * @param {string} name The name of the local storage value
	 * @param {T} value The value of the local object
	 */
	set: <T>(name: string, value: T) => {
		const val = JSON.stringify(value);
		localStorage.setItem(name, val);
	},

	/**
	 * Retrieves a value from local storage.
	 *
	 * @method get
	 * @param {string} name The name of the local storage value being retrieved
	 * @param {D} defaultVal The default value to return if the value is not found
	 * @return The retrieved value or default value
	 */
	get: <T, D extends T | undefined = undefined>(
		name: string,
		defaultVal?: D
	): D extends undefined ? T | null : T => {
		const value = localStorage.getItem(name);

		if (value === null) {
			return (defaultVal ?? null) as D extends undefined ? T | null : T;
		}

		try {
			return JSON.parse(value) as T;
		} catch (error) {
			return (defaultVal ?? null) as D extends undefined ? T | null : T;
		}
	},

	/**
	 * Removes a local object.
	 *
	 * @method remove
	 * @param {string} name The name of the local object being removed
	 */
	remove: (name: string) => {
		localStorage.removeItem(name);
	},
} as const;
