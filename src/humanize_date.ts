import type { ISODate } from '@surveyplanet/types';

type HumanizeDateFormat = Intl.DateTimeFormatOptions & {
	default?: boolean;
	timeOnly?: boolean;
	full?: boolean;
};

/**
 * Formats a date into a human-readable string representation.
 *
 * @param date - The date to format (ISO string or Date object).
 * @param options - Formatting options to control the output style.
 * @param local - The locale to use for formatting (defaults to 'en-US').
 * @returns A formatted date string based on the provided options.
 * @deprecated use `parseDate` instead.
 *
 * @example
 * // Default format: "Jan 1, 2023"
 * humanizeDate('2023-01-01T00:00:00Z');
 *
 * @example
 * // Time-only format: "12:00 AM"
 * humanizeDate('2023-01-01T00:00:00Z', { timeOnly: true });
 *
 * @example
 * // Full format: "Jan 1, 2023, 12:00 AM"
 * humanizeDate('2023-01-01T00:00:00Z', { full: true });
 */
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
