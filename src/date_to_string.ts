/**
 * @name dateToString
 * @description Converts a valid ISO date string or Date object to a string that is compatible with the input type date, time, or datetime-local
 * @param {string | Date} value - a valid ISO date string or Date object.
 * @param {'date' | 'time' | 'datetime-local'} type - the format type to return the date string in.	Default is 'datetime-local'.
 * @returns {string} A string representing the date entered in the input. The date is formatted according to [Date strings format](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#date_strings).
 */
export const dateToString = (
	value: string | Date,
	type?: 'date' | 'time' | 'datetime-local'
): string | undefined => {
	if (
		!(value instanceof Date) &&
		(typeof value !== 'string' || isNaN(Date.parse(value)))
	) {
		return;
	}

	const dateVal = value instanceof Date ? value : new Date(value);
	// ensure the date doesn't change when converting to UTC
	const date = new Date(
		Date.UTC(
			dateVal.getFullYear(),
			dateVal.getMonth(),
			dateVal.getDate(),
			dateVal.getHours(),
			dateVal.getMinutes(),
			dateVal.getSeconds(),
			dateVal.getMilliseconds()
		)
	);

	if (isNaN(date.getTime())) {
		return;
	}

	if (type === 'time') {
		return date.toISOString().split('T')[1].split('.')[0];
	}

	if (type === 'date') {
		return date.toISOString().split('T')[0];
	}

	return date.toISOString().split('.')[0]; // default to datetime-local
};
