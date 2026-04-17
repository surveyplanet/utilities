import pino from 'pino';

type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
type LogMethod = (object: Record<string, unknown>, message: string) => void;

export interface LoggerInstance {
	child(bindings: { name: string }): LoggerInstance;
	trace: LogMethod;
	debug: LogMethod;
	info: LogMethod;
	warn: LogMethod;
	error: LogMethod;
	fatal: LogMethod;
}

const defaultLogLevel: 'silent' | 'info' = process.env.TESTING ? 'silent' : 'info';

export const logger: LoggerInstance = pino({
	name: 'surveyplanet',
	level: defaultLogLevel,
}) as LoggerInstance;

export interface LogOptions {
	level?: LogLevel;
	err?: Error;
	logger?: LoggerInstance;
	[key: string]: unknown;
}

/**
 * Logs a message with automatic level detection and structured data.
 *
 * @see {@link https://getpino.io/#/docs/api}
 */
export function log(name: string, message: string, options: LogOptions = {}): void {
	const { level, err, logger: customLogger, ...props } = options;
	const logLevel: LogLevel = level || (err ? 'error' : 'info');
	const logObject: Record<string, unknown> = { ...props };
	const loggerInstance = customLogger ?? logger;
	const tempLogger = loggerInstance.child({ name });

	if (err) {
		logObject.err = err;
	}

	tempLogger[logLevel](logObject, message);
}
