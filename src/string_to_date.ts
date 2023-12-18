import { type ISODate } from '@surveyplanet/types';
import InputType from './types/DateTimeInputType';

/**
 * Description.....
 *
 * time: 11:35
 * date: 1977-04-29
 * datetime-local: 1977-03-29T06:00:00
 * @name stringToDate
 * @returns {Date}
 */

let result: Date;
const stringToDate = (type: InputType, isoStr: string): Date | undefined => {
	console.log('stringToDate', isoStr);

	if (!isoStr.length) {
		return;
	}

	isoStr = isoStr.trim(); // clean up whitespace

	// Time format only e.g.: 11:35
	if (type === 'time') {
		const [hr, min] = isoStr.split(':').map(Number);

		if (isNaN(hr) || isNaN(min)) {
			return undefined;
		}

		result = new Date(Date.UTC(0, 0, 0, hr, min));
	} else if (type === 'date') {
		const [year, month, day] = isoStr.split('-').map(Number);
		result = new Date(Date.UTC(year, month - 1, day));
	} else if (type === 'datetime-local') {
		const [d, t] = isoStr.split('T');
		const [year, month, day] = d.split('-').map(Number);
		const [hr, min] = t.split(':').map(Number);

		result = new Date(Date.UTC(year, month - 1, day, hr, min));
	}

	if (isNaN(result.getTime())) {
		return;
	}

	return result;
};

export default stringToDate;
