import { ISODate } from '@surveyplanet/types';

/**
 * Description....
 *
 * @name dateToString
 * @returns {ISODate}
 */
const dateToString = (type: InputType): ISODate => {
	if (!response?.length) {
		return '';
	}

	const dateVal = new Date(response[0]);

	if (isNaN(dateVal.getTime())) {
		return '';
	}

	if (date && time) {
		return dateVal.toISOString().split('.')[0]; // datetime-local
	}

	if (time) {
		return dateVal.toISOString().split('T')[1].split('.')[0]; // time only
	}

	if (date) {
		return dateVal.toISOString().split('T')[0]; // date only
	}

	return '';
};
