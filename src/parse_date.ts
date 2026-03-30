export type FormatType = 'dateTime' | 'date' | 'time';

interface ParseDateOptions {
	format?: FormatType;
	timezone?: string;
	compact?: boolean;
	short?: boolean;
	includeTimeZone?: boolean;
}

const FORMAT_OPTIONS: Record<FormatType, Intl.DateTimeFormatOptions> = {
	dateTime: {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	},
	date: { year: 'numeric', month: 'long', day: 'numeric' },
	time: { hour: 'numeric', minute: 'numeric' },
};

/**
 * Convert a date into a formatted string.
 *
 * @param date - The date to parse.
 * @param options - Formatting options.
 * @returns The formatted date string.
 *
 * @example
 * // Default (dateTime format, UTC)
 * parseDate('2025-06-15T14:30:00Z');
 * // "Sunday, June 15, 2025 at 2:30 PM"
 *
 * @example
 * // Date only
 * parseDate('2025-06-15T14:30:00Z', { format: 'date' });
 * // "June 15, 2025"
 *
 * @example
 * // Time only
 * parseDate('2025-06-15T14:30:00Z', { format: 'time' });
 * // "2:30 PM"
 *
 * @example
 * // Compact removes weekday and shortens month
 * parseDate('2025-06-15T14:30:00Z', { compact: true });
 * // "Jun 15, 2025 at 2:30 PM"
 *
 * @example
 * // Short uses numeric date parts and 24-hour time
 * parseDate('2025-06-15T14:30:00Z', { short: true });
 * // "6/15/2025, 14:30"
 *
 * @example
 * // Include time zone name
 * parseDate('2025-06-15T14:30:00Z', {
 *   timezone: 'America/New_York',
 *   includeTimeZone: true,
 * });
 * // "Sunday, June 15, 2025 at 10:30 AM EDT"
 */
export function parseDate(date: Date | string | number, options: ParseDateOptions = {}): string {
	const parsedDate = new Date(date);
	const format: FormatType =
		options.format && FORMAT_OPTIONS[options.format] ? options.format : 'dateTime';

	const args: Intl.DateTimeFormatOptions = {
		timeZone: options.timezone ?? 'UTC',
		...FORMAT_OPTIONS[format],
	};

	if (options.includeTimeZone) args.timeZoneName = 'short';

	if (options.compact) {
		delete args.weekday;
		if (options.format !== 'time') args.month = 'short';
	}

	if (options.short) {
		delete args.weekday;
		if (format === 'time' || format === 'dateTime') {
			args.hour12 = false;
		}
		if (format !== 'time') {
			args.month = 'numeric';
			args.year = 'numeric';
			args.day = 'numeric';
		}
	}

	return parsedDate.toLocaleString('en', args).replace(/\s/g, ' ');
}
