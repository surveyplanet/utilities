/**
 * Description.....
 *
 * @name stringToDate
 * @returns {Date}
 */

// time: 11:35
// date: 1977-04-29
// datetime-local: 1977-03-29T06:00:00

const stringToDate = (type: InputType, isoStr: string): Date | undefined => {
	console.log('stringToDate', isoStr);

	if (!isoStr?.length) {
		return;
	}

	isoStr = isoStr.trim(); // clean up whitespace

	let result: Date;

	// Time format only e.g.: 11:35
	if (type === 'time') {
		const [hr, min] = isoStr.split(':').map(Number);

		if (isNaN(hr) || isNaN(min)) {
			return;
		}
		// BUG: this will be in the user's timezone instead of UTC, need to
		// use Intl API: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
		result = new Date(0, 0, 0);
		result.setUTCHours(hr);
		result.setUTCMinutes(min);
	} else if (type === 'date') {
	} else if (type === 'datetime-local') {
		// This should work for both date and datetime formats e.g.: 1977-04-29 or 1977-03-29T06:00:00
		if (!time) {
			result = new Date(isoStr); // BUG: same bug as above.
		} else {
			const [d, t] = isoStr.split('T');
			const [hr, min] = t.split(':').map(Number);
			result = new Date(d);
			result.setUTCHours(hr);
			result.setUTCMinutes(min);
		}
	}

	if (isNaN(result.getTime())) {
		return;
	}

	return result;
};
