import { beforeEach, describe, expect, it } from 'vitest';
import pino from 'pino';
import { log, type LoggerInstance } from '../log.js';

interface LogOutput {
	level: number;
	name: string;
	msg: string;
	err?: {
		message?: string;
	};
	[key: string]: unknown;
}

describe('log', () => {
	let logOutput: LogOutput[];
	let logger: LoggerInstance;

	beforeEach(() => {
		logOutput = [];

		const stream = {
			write: (chunk: string): boolean => {
				logOutput.push(JSON.parse(chunk) as LogOutput);
				return true;
			},
		};

		logger = pino({ level: 'debug' }, stream) as unknown as LoggerInstance;
	});

	it('should log at info level by default', () => {
		log('test-service', 'Test message', { logger });

		expect(logOutput).toHaveLength(1);
		expect(logOutput[0]).toHaveProperty('level', 30);
		expect(logOutput[0]).toHaveProperty('name', 'test-service');
		expect(logOutput[0]).toHaveProperty('msg', 'Test message');
	});

	it('should automatically use error level when err is provided', () => {
		const testError = new Error('Test error!');

		log('error-service', 'Something went wrong', {
			err: testError,
			logger,
		});

		expect(logOutput).toHaveLength(1);
		expect(logOutput[0]).toHaveProperty('level', 50);
		expect(logOutput[0]).toHaveProperty('name', 'error-service');
		expect(logOutput[0]).toHaveProperty('msg', 'Something went wrong');
		expect(logOutput[0]).toHaveProperty('err');
		expect(logOutput[0].err).toHaveProperty('message', testError.message);
	});

	it('should prioritize explicit level over auto-detection', () => {
		const testError = new Error('Test error!');

		log('warn-service', 'Warning with error', {
			level: 'warn',
			err: testError,
			logger,
		});

		expect(logOutput).toHaveLength(1);
		expect(logOutput[0]).toHaveProperty('level', 40);
		expect(logOutput[0]).toHaveProperty('name', 'warn-service');
		expect(logOutput[0]).toHaveProperty('err');
	});

	it('should include additional properties in log output', () => {
		log('user-service', 'User action', {
			userId: '123',
			action: 'login',
			ipAddress: '192.168.1.1',
			logger,
		});

		expect(logOutput).toHaveLength(1);
		expect(logOutput[0]).toHaveProperty('userId', '123');
		expect(logOutput[0]).toHaveProperty('action', 'login');
		expect(logOutput[0]).toHaveProperty('ipAddress', '192.168.1.1');
	});

	it('should handle debug level logging', () => {
		log('debug-service', 'Debug information', {
			level: 'debug',
			executionTime: '50ms',
			memoryUsage: '45MB',
			logger,
		});

		expect(logOutput).toHaveLength(1);
		expect(logOutput[0]).toHaveProperty('level', 20);
		expect(logOutput[0]).toHaveProperty('executionTime', '50ms');
		expect(logOutput[0]).toHaveProperty('memoryUsage', '45MB');
	});

	it('should handle warn level logging', () => {
		log('warn-service', 'Warning message', {
			level: 'warn',
			warningCode: 'DEPRECATED_API',
			logger,
		});

		expect(logOutput).toHaveLength(1);
		expect(logOutput[0]).toHaveProperty('level', 40);
		expect(logOutput[0]).toHaveProperty('warningCode', 'DEPRECATED_API');
	});

	it('should create child logger with correct name', () => {
		log('child-service', 'Child logger test', { logger });

		expect(logOutput).toHaveLength(1);
		expect(logOutput[0]).toHaveProperty('name', 'child-service');
	});

	it('should handle error with additional properties', () => {
		const testError = new Error('Database error');

		log('db-service', 'Database operation failed', {
			err: testError,
			query: 'db.users.find({email: "user@example.com"})',
			duration: '2000ms',
			retryCount: 3,
			logger,
		});

		expect(logOutput).toHaveLength(1);
		expect(logOutput[0]).toHaveProperty('level', 50);
		expect(logOutput[0]).toHaveProperty('err');
		expect(logOutput[0]).toHaveProperty('query', 'db.users.find({email: "user@example.com"})');
		expect(logOutput[0]).toHaveProperty('duration', '2000ms');
		expect(logOutput[0]).toHaveProperty('retryCount', 3);
	});

	it('should handle explicit error level without err object', () => {
		const missingFields = ['host', 'port'];

		log('config-service', 'Configuration issue detected', {
			level: 'error',
			configSection: 'database',
			missingFields,
			logger,
		});

		expect(logOutput).toHaveLength(1);
		expect(logOutput[0]).toHaveProperty('level', 50);
		expect(logOutput[0]).toHaveProperty('configSection', 'database');
		expect(logOutput[0]).toHaveProperty('missingFields');
		expect(logOutput[0].missingFields).toEqual(missingFields);
		expect(logOutput[0]).not.toHaveProperty('err');
	});
});
