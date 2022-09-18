/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable max-classes-per-file */
export type TOption<T> = Some<T> | None<T>;

export type Match<I, O> = { some: (value: I) => O; none: () => O };

interface Optionable<T> {
	isSome(): boolean;
	isNone(): boolean;
	get(): T;
	getOrElse(defaultValue: T): T;
	getOrThrow(error: Error): T;
	map<U>(fn: (value: T) => U): TOption<U>;
	flatMap<U>(fn: (value: T) => TOption<U>): TOption<U>;
	getOrUndefined(): T | undefined;
	getOrNull(): T | null;
	ifSome(fn: (value: T) => void): TOption<T>;
	ifNone(fn: () => void): TOption<T>;
	match<U>(match: Match<T, U>): U;
}

class OptionStatic {
	public of<T>(value: T | undefined | null): TOption<T> {
		if (value === undefined || value === null) {
			return this.none<T>();
		}

		return this.some<T>(value);
	}

	public some<T>(value: T): TOption<T> {
		return new Some(value);
	}

	public none<T>(): TOption<T> {
		return new None();
	}
}

export class None<T> implements Optionable<T> {
	isSome(): boolean {
		return false;
	}

	isNone(): boolean {
		return true;
	}

	get(): T {
		throw new Error('Cannot get value from None');
	}

	getOrElse(defaultValue: T): T {
		return defaultValue;
	}

	getOrThrow(error: Error): T {
		throw error;
	}

	map<U>(_: (value: T) => U): TOption<U> {
		return new None();
	}

	flatMap<U>(_: (value: T) => TOption<U>): TOption<U> {
		return new None();
	}

	getOrUndefined(): T | undefined {
		return undefined;
	}

	getOrNull(): T | null {
		return null;
	}

	ifSome(_: (value: T) => void): TOption<T> {
		return this;
	}

	ifNone(fn: () => void): TOption<T> {
		fn();

		return this;
	}

	match<U>(match: Match<T, U>): U {
		return match.none();
	}
}

export class Some<T> implements Optionable<T> {
	constructor(private readonly value: T) {}

	isSome(): boolean {
		return true;
	}

	isNone(): boolean {
		return false;
	}

	get(): T {
		return this.value;
	}

	getOrElse(_: T): T {
		return this.value;
	}

	getOrThrow(_: Error): T {
		return this.value;
	}

	map<U>(fn: (value: T) => U): TOption<U> {
		return new Some(fn(this.value));
	}

	flatMap<U>(fn: (value: T) => TOption<U>): TOption<U> {
		return fn(this.value);
	}

	getOrUndefined(): T | undefined {
		return this.value;
	}

	getOrNull(): T | null {
		return this.value;
	}

	ifSome(fn: (value: T) => void): TOption<T> {
		fn(this.value);

		return this;
	}

	ifNone(_: () => void): TOption<T> {
		return this;
	}

	match<U>(match: Match<T, U>): U {
		return match.some(this.value);
	}
}

export const Option = new OptionStatic();
