import { DateTimeValue } from '@surveyplanet/types';
import InputType from './types/date_time_input_type';

/**
 * @name dateToString
 * @returns {ISODate}
 */
const dateToString = (
	type: InputType,
	response: DateTimeValue[]
): string | undefined => {
	if (!response.length) {
		return;
	}

	const dateVal = new Date(response[0]);

	if (isNaN(dateVal.getTime())) {
		return;
	}

	if (type === 'time') {
		return dateVal.toISOString().split('T')[1].split('.')[0]; // time only
	}

	if (type === 'date') {
		return dateVal.toISOString().split('T')[0]; // date only
	}

	return dateVal.toISOString().split('.')[0]; // datetime-local
};

export default dateToString;
