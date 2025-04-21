import type { ISODate } from '@surveyplanet/types';

type HumanizeDateFormat = Intl.DateTimeFormatOptions & {
	default?: boolean;
	timeOnly?: boolean;
	full?: boolean;
};

export const humanizeDate = (
	date: ISODate | Date,
	options: HumanizeDateFormat = { default: true },
	local: Intl.LocalesArgument = 'en-US'
): string => {
	date = new Date(date);

	if (options.timeOnly) {
		// Use toLocaleTimeString for time-only format
		return date.toLocaleTimeString(local, {
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
		});
	}

	if (options.default) {
		options = { month: 'short', day: 'numeric', year: 'numeric' };
	} else if (options.full) {
		options = {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
		};
	}

	return date.toLocaleDateString(local, options);
};
