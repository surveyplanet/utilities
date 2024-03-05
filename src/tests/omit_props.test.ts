import { describe, expect, it } from 'vitest';
import { omitProps } from '../index';

describe('omitProps', () => {
	const user = {
		id: 1,
		name: 'Alice',
		email: 'alice@example.com',
		password: 'secret',
	};

	it('should remove properties from object', () => {
		const omit: (keyof typeof user)[] = ['email', 'password'];
		const userWithoutSensitiveInfo = omitProps(user, omit);

		for (const key of omit) {
			expect(userWithoutSensitiveInfo).not.toHaveProperty(key);
			expect(user).toHaveProperty(key);
		}
	});

	it('should not modify the original object', () => {
		const userWithoutSensitiveInfo = omitProps(user, []);
		expect(userWithoutSensitiveInfo).toEqual(user);
	});

	it('should not modify an empty object', () => {
		const obj = {} as Record<string, unknown>;
		const testObj = omitProps(obj, ['key1', 'key2']);
		expect(testObj).toEqual(obj);
	});

	it('should not modify an object since there are no keys', () => {
		const obj = { apple: 1, peach: 2 };
		const testObj = omitProps(obj, []);
		expect(testObj).toEqual(obj);
	});
});
