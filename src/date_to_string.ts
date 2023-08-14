import { ISODate, ensureISODate, DateTimeValue } from '@surveyplanet/types';
import InputType from './types/DateTimeInputType';

/**
 * Description....
 *
 * @name dateToString
 * @returns {ISODate}
 */
const dateToString = (
	type: InputType,
	response: DateTimeValue[]
): string | '' => {
	if (!response.length) {
		return '';
	}

	const dateVal = new Date(response[0]);

	if (isNaN(dateVal.getTime())) {
		return '';
	} else if (type === 'datetime-local') {
		return dateVal.toISOString().split('.')[0]; // datetime-local
	} else if (type === 'time') {
		return dateVal.toISOString().split('T')[1].split('.')[0]; // time only
	} else {
		return dateVal.toISOString().split('T')[0]; // date only
	}

	// if (isNaN(dateVal.getTime())) {
	// 	return '';
	// } else if (type === 'datetime-local') {
	// 	return dateVal.toISOString().split('.')[0]; // datetime-local
	// } else if (type === 'time') {
	// 	return dateVal.toISOString().split('T')[1].split('.')[0]; // time only
	// } else {
	// 	return dateVal.toISOString().split('T')[0]; // date only
	// }
};

export default dateToString;
