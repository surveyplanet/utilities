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

// time: 11:35
// date: 1977-04-29
// datetime-local: 1977-03-29T06:00:00

// value that comes in is: "1977-04-12T11:21"

// let result: Date;
// const stringToDate = (type: InputType, isoStr: string): Date | undefined => {
// 	console.log('stringToDate', isoStr);

// 	if (!isoStr.length) {
// 		return;
// 	}

// 	isoStr = isoStr.trim(); // clean up whitespace

// 	// Time format only e.g.: 11:35
// 	if (type === 'time') {
// 		const [hr, min] = isoStr.split(':').map(Number);

// 		if (isNaN(hr) || isNaN(min)) {
// 			return undefined;
// 		}
// 		// BUG: this will be in the user's timezone instead of UTC, need to
// 		// use Intl API: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
// 		result = new Date(0, 0, 0);
// 		result.setUTCHours(hr);
// 		result.setUTCMinutes(min);
// 	} else if (type === 'date') {
// 		// This should work for both date and datetime formats e.g.: 1977-04-29 or 1977-03-29T06:00:00
// 		result = new Date(isoStr); // BUG: this will be in the user's timezone instead of UTC, need to
// 		// use Intl API: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
// 	} else if (type === 'datetime-local') {
// 		// This should work for both date and datetime formats e.g.: 1977-04-29 or 1977-03-29T06:00:00
// 		//if (!time) {
// 		//result = new Date(isoStr); // BUG: same bug as above.
// 		//} else {
// 		const [d, t] = isoStr.split('T');
// 		const [hr, min] = t.split(':').map(Number);
// 		result = new Date(d);
// 		result.setUTCHours(hr);
// 		result.setUTCMinutes(min);
// 	}
// 	//}

// 	if (isNaN(result.getTime())) {
// 		return;
// 	}

// 	return result;
// };

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

		result = new Date(Date.UTC(1970, 0, 1, hr, min)); // Use Date.UTC to ensure UTC
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
