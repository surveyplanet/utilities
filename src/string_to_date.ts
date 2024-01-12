import {
	type default as DateTimeInputType,
	isDateTimeInputType,
} from './types/date_time_input_type';

/**
 * @name stringToDate
 * @param {DateTimeInputType} type - 'datetime-local', 'date', or 'time'
 * @param {string} isoStr - ISO string from the date input
 * @returns {Date}
 *
 */

const stringToDate = (
	type: DateTimeInputType,
	isoStr: string
): Date | undefined => {
	if (!isDateTimeInputType(type)) {
		throw new Error(`Invalid type: ${type as string}`);
	}

	if (!isoStr.length) {
		return;
	}

	isoStr = isoStr.trim(); // clean up whitespace

	// Time format only e.g.: 11:35
	if (type === 'time') {
		const [hr, min] = isoStr.split(':').map(Number);

		return new Date(Date.UTC(0, 0, 0, hr, min));
	}
	// Date format only e.g.: 2020-01-01
	if (type === 'date') {
		const [year, month, day] = isoStr.split('-').map(Number);
		return new Date(Date.UTC(year, month - 1, day));
	}

	const [d, t] = isoStr.split('T');
	const [year, month, day] = d.split('-').map(Number);
	const [hr, min] = t.split(':').map(Number);

	return new Date(Date.UTC(year, month - 1, day, hr, min));
};

export default stringToDate;
