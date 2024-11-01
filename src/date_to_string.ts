/**
 * @name dateToString
 * @description Converts a valid ISO date string or Date object to a string that is compatible with the input type date, time, or datetime-local
 * @param {string | Date} value - a valid ISO date string or Date object.
 * @param {'date' | 'time' | 'datetime-local'} type - the format type to return the date string in.	Default is 'datetime-local'.
 * @returns {string} A string representing the date entered in the input. The date is formatted according to [Date strings format](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#date_strings).
 */
export const dateToString = (
	value: string | Date,
	type: 'date' | 'time' | 'datetime-local' = 'datetime-local'
): string | undefined => {
	if (
		!(value instanceof Date) &&
		(typeof value !== 'string' || isNaN(Date.parse(value)))
	) {
		return;
	}

	const date = value instanceof Date ? value : new Date(value);

	// Validate the date
	if (isNaN(date.getTime())) {
		return undefined;
	}

	// Ensure the type is valid
	if (!['date', 'time', 'datetime-local'].includes(type)) {
		type = 'datetime-local';
	}

	// Get timezone offset in minutes
	const tzOffset = date.getTimezoneOffset();

	// Adjust date for timezone
	const localDate = new Date(date.getTime() - tzOffset * 60000);

	// Convert to ISO string and remove the 'Z' timezone indicator
	const isoString = localDate.toISOString().slice(0, -1);

	// Return appropriate format based on type
	switch (type) {
		case 'date':
			return isoString.split('T')[0];
		case 'time':
			return isoString.split('T')[1].slice(0, 5); // Only return HH:mm
		case 'datetime-local':
			return (
				isoString.split('T')[0] +
				'T' +
				isoString.split('T')[1].slice(0, 5)
			); // Include date and HH:mm
		default:
			throw new Error('Invalid type specified');
	}
};
