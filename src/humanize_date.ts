import type { ISODate } from '@surveyplanet/types';

export const humanizeDate = (
	date: ISODate | Date,
	local: Intl.LocalesArgument = 'en-US',
	options: Intl.DateTimeFormatOptions = {}
): string => {
	date = new Date(date);
	options = {
		...{ month: 'short', day: 'numeric', year: 'numeric' },
		...options,
	};
	return date.toLocaleDateString(local, options);
};
