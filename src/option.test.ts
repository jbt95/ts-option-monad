import { None, Option, Some } from './option';
import * as assert from 'assert';

describe('Having an Option instance', () => {
	describe('And a value is not provided', () => {
		let option: None<string>;
		beforeEach(() => (option = Option.of<string>(undefined)));
		it('should return false when calling isSome()', () => assert.strictEqual(option.isSome(), false));
		it('should return true when calling isNone()', () => assert.strictEqual(option.isNone(), true));
		it('should throw when calling get()', () => {
			try {
				option.get();
			} catch (error) {
				assert.ok(error instanceof Error);
			}
		});
		it('should return the default value when calling getOrElse()', () => {
			assert.strictEqual(option.getOrElse('1'), '1');
		});
		it('should throw the provided error when calling getOrThrow()', () => {
			const error = new Error('error');
			try {
				option.getOrThrow(error);
			} catch (err) {
				assert.strictEqual(err, error);
				assert.strictEqual(err.message, error.message);
			}
		});
		it('should return None when calling map()', () => assert.ok(option.map((value) => value) instanceof None));
		it('should return None when calling flatMap()', () => {
			assert.ok(option.flatMap((value) => Option.of(value)) instanceof None);
		});
		it('should return undefined when calling getOrUndefined()', () => {
			assert.strictEqual(option.getOrUndefined(), undefined);
		});
		it('should return null when calling getOrNull()', () => {
			assert.strictEqual(option.getOrNull(), null);
		});
		it('should not call the callback when calling ifSome()', () => {
			let called = false;
			option.ifSome((_) => (called = true));
			assert.strictEqual(called, false);
		});
		it('should call the callback when calling ifNone()', () => {
			let called = false;
			option.ifNone(() => (called = true));
			assert.strictEqual(called, true);
		});
		it('should call match.none() when calling match()', () => {
			assert.strictEqual(option.match({ some: () => 'some', none: () => 'none' }), 'none');
		});
	});
	describe('And a value is provided', () => {
		const value = 'test';
		let option: None<string>;
		beforeEach(() => (option = Option.of<string>(value)));
		it('should return true when calling isSome()', () => assert.strictEqual(option.isSome(), true));
		it('should return false when calling isNone()', () => assert.strictEqual(option.isNone(), false));
		it('should return the value when calling get()', () => assert.strictEqual(option.get(), value));
		it('should return the value  when calling getOrElse()', () => assert.strictEqual(option.getOrElse('1'), value));
		it('should return the value when calling getOrThrow()', () => {
			assert.strictEqual(option.getOrThrow(new Error()), value);
		});
		it('should return Some when calling map()', () => assert.ok(option.map((value) => value) instanceof Some));
		it('should return Some when calling flatMap()', () => {
			assert.ok(option.flatMap((value) => Option.of(value)) instanceof Some);
		});
		it('should return the value when calling getOrUndefined()', () => {
			assert.strictEqual(option.getOrUndefined(), value);
		});
		it('should return the value getOrNull()', () => assert.strictEqual(option.getOrNull(), value));
		it('should call the callback when calling ifSome()', () => {
			let called = false;
			option.ifSome((_) => (called = true));
			assert.strictEqual(called, true);
		});
		it('should not call the callback when calling ifNone()', () => {
			let called = false;
			option.ifNone(() => (called = true));
			assert.strictEqual(called, false);
		});
		it('should call match.some() when calling match()', () => {
			assert.strictEqual(option.match({ some: () => 'some', none: () => 'none' }), 'some');
		});
	});
});
