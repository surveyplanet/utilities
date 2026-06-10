function boolMatch(s: string, matchers: Array<string | RegExp>): boolean {
	const down = s.toLowerCase();

	for (const matcher of matchers) {
		if (!matcher) {
			continue;
		}
		if (matcher instanceof RegExp && matcher.test(s)) {
			return true;
		}
		if (typeof matcher === 'string' && matcher.toLowerCase() === down) {
			return true;
		}
	}

	return false;
}

export function toBoolean(
	str: unknown,
	trueValues?: Array<string | RegExp>,
	falseValues?: Array<string | RegExp>
): boolean | undefined {
	let value: string;

	if (typeof str === 'number') {
		value = String(str);
	} else if (typeof str === 'string') {
		value = str.trim();
	} else {
		return !!str;
	}

	if (boolMatch(value, trueValues ?? ['true', '1'])) {
		return true;
	}

	if (boolMatch(value, falseValues ?? ['false', '0'])) {
		return false;
	}

	return undefined;
}
