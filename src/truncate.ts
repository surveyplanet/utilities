/**
 * Configuration options for text truncation
 */
export interface TruncateOptions {
	/** Maximum length of the truncated string including ellipsis */
	maxLength: number;
	/** Position where ellipsis should be placed (defaults to 'end') */
	position?: 'start' | 'middle' | 'end';
	/** Custom ellipsis string (defaults to '...') */
	ellipsis?: string;
}

/**
 * Truncates text at the specified position with configurable ellipsis
 *
 * @param text - The text string to truncate
 * @param options - Configuration object specifying truncation behavior
 * @returns The truncated string with ellipsis at the specified position
 *
 * @example
 * ```typescript
 * // End truncation (default ellipsis)
 * truncate('Hello world', { maxLength: 8, position: 'end' })
 * // Returns: "Hello..."
 *
 * // Start truncation with custom ellipsis
 * truncate('Hello world', { maxLength: 8, position: 'start', ellipsis: '←' })
 * // Returns: "← world"
 *
 * // Middle truncation
 * truncate('Hello world', { maxLength: 9, position: 'middle' })
 * // Returns: "Hel...rld"
 * ```
 */
export function truncate(text: string, options: TruncateOptions): string {
	const { maxLength, position = 'end', ellipsis = '...' } = options;

	if (text.length <= maxLength) {
		return text;
	}

	if (maxLength <= ellipsis.length) {
		return ellipsis.substring(0, maxLength);
	}

	if (position === 'start') {
		const startIndex = text.length - (maxLength - ellipsis.length);
		return ellipsis + text.substring(startIndex);
	} else if (position === 'middle') {
		const availableLength = maxLength - ellipsis.length;
		const startLength = Math.ceil(availableLength / 2);
		const endLength = Math.floor(availableLength / 2);
		const start = text.substring(0, startLength);
		const end = text.substring(text.length - endLength);
		return start + ellipsis + end;
	} else {
		return text.substring(0, maxLength - ellipsis.length) + ellipsis;
	}
}
