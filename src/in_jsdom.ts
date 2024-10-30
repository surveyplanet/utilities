/**
 * Check if the code is running in jsdom
 *
 * @name inJsDom
 * @see https://github.com/jsdom/jsdom/issues/1537
 * @returns {Boolean}
 */
export const inJsDom =
	(typeof window !== 'undefined' && window.name === 'nodejs') ||
	(typeof navigator !== 'undefined' &&
		(navigator.userAgent.includes('Node.js') ||
			navigator.userAgent.includes('jsdom')));
