/**
 * @name stringToDate
 * @param {string} value - A string representing the date entered in the input. The date is formatted according to [Date strings format](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#date_strings).
 * @param {'datetime-local', 'date', or 'time'} type - 'datetime-local', 'date', or 'time'
 * @returns {Date}
 *
 */
const stringToDate = (
	value: string,
	type?: 'date' | 'time' | 'datetime-local'
): Date | undefined => {
	if (typeof value !== 'string') {
		return;
	}

	value = value.trim(); // clean up whitespace

	if (value.length < 5) {
		// minimum length for a valid date is 5
		return;
	}

	// Time format only e.g.: 11:35
	if (type === 'time') {
		const [hr, min = 0] = value.split(':').map(Number);
		if (isNaN(hr) || hr > 23) {
			return;
		}

		if (isNaN(min) || min > 59) {
			return;
		}

		return new Date(Date.UTC(0, 0, 0, hr, min));
	}

	// Date format only e.g.: 2020-01-01
	if (type === 'date') {
		const [year, month, day] = value.split('-').map(Number);
		if (isNaN(year) || isNaN(month) || isNaN(day)) {
			return;
		}
		if (month < 1 || month > 12) {
			return;
		}
		if (day < 1 || day > 31) {
			return;
		}
		return new Date(Date.UTC(year, month - 1, day));
	}

	// default to Datetime-local format e.g.: 2020-01-01T11:35
	const [d, t] = value.split('T');

	if (!d || !t) {
		return;
	}

	const [year, month, day] = d.split('-').map(Number);

	if (isNaN(year) || isNaN(month) || isNaN(day)) {
		return;
	}

	if (month < 1 || month > 12) {
		return;
	}

	if (day < 1 || day > 31) {
		return;
	}

	const [hr = 0, min = 0] = t.split(':').map(Number);

	if (isNaN(hr) || hr > 23) {
		return;
	}

	if (isNaN(min) || min > 59) {
		return;
	}

	return new Date(Date.UTC(year, month - 1, day, hr, min));
};

export default stringToDate;
