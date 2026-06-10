interface ParseDurationOptions {
	humanize?: boolean;
}

/**
 * Format a duration in milliseconds as H:mm:ss.
 *
 * @param ms - Duration in milliseconds.
 * @param options - Formatting options.
 * @returns The formatted duration string.
 *
 * @example
 * // Default H:mm:ss format
 * parseDuration(5425000);
 * // "1:30:25"
 *
 * @example
 * // Zero milliseconds
 * parseDuration(0);
 * // "0:00:00"
 *
 * @example
 * // Human-readable format
 * parseDuration(5425000, { humanize: true });
 * // "1h 30m 25s"
 *
 * @example
 * // Human-readable with only minutes and seconds
 * parseDuration(125000, { humanize: true });
 * // "2m 5s"
 *
 * @example
 * // Negative values are treated as absolute
 * parseDuration(-3600000);
 * // "1:00:00"
 *
 * @example
 * // Sub-second values round down to 0s
 * parseDuration(999, { humanize: true });
 * // "0s"
 */
export function parseDuration(ms: number, { humanize = false }: ParseDurationOptions = {}): string {
	const totalSeconds = Math.floor(Math.abs(ms) / 1000);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	if (humanize) {
		const parts: string[] = [];
		if (hours) {
			parts.push(`${hours}h`);
		}
		if (minutes) {
			parts.push(`${minutes}m`);
		}
		if (seconds || parts.length === 0) {
			parts.push(`${seconds}s`);
		}
		return parts.join(' ');
	}

	return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
