import React from 'react';

// Primitives
/**
 * * `Exclusive<T>` is a utility type that ensures that **one and only one**
 * * of the properties defined in `Keys` is present in the object.
 * * If multiple properties are defined, it will produce a type error.
 * *
 * * This type is an implementation of the "exclusive OR" (XOR) idea, where only
 * * one property among a set of keys is allowed to be defined.
 *
 * Example :
 *
 * ```ts
 * interface Example {
 *   a?: boolean;
 *   b?: boolean;
 * }
 *
 * type Result = Exclusive<Example, 'a' | 'b'>;
 * ```
 * In this example, the `Result` type will be valid only if **either** `a`
 * **or** `b` is defined, but **not both**.
 *
 * This type is useful for situations where you have exclusive choices in an object.
 *
 * @typeparam T The type of the object in which the constraint is applied.
 * @typeparam Keys The specific keys on which the XOR constraint is imposed.
 */
export type Exclusive<T, Keys extends keyof T = keyof T> = {
	[K in Keys]: Required<Pick<T, K>> & { [P in Exclude<Keys, K>]?: never };
}[Keys];

/**
 * Exclut de T toutes les propriétés qui sont aussi dans U.
 * Utilisé pour empêcher la coexistence de propriétés communes dans les types XOR.
 *
 * @template T Le premier type.
 * @template U Le second type, dont les clés sont retirées de T.
 *
 * @example
 * type A = { a: string; b: number };
 * type B = { b: number; c: boolean };
 * type Result = Without<A, B>; // => { a?: never }
 */

export type Without<T, U> = {
	[P in Exclude<keyof T, keyof U>]?: never;
};

/**
 * Crée une union exclusive (XOR) entre deux types T et U.
 * Assure que seules les propriétés de T ou de U peuvent exister, mais pas les deux à la fois.
 *
 * @template T Le premier type d'entrée.
 * @template U Le second type d'entrée.
 *
 * @example
 * type A = { type: 'a'; value: number };
 * type B = { type: 'b'; label: string };
 * type Result = XOR<A, B>;
 *
 * const test1: Result = { type: 'a', value: 42 }; // ✅
 * const test2: Result = { type: 'b', label: 'ok' }; // ✅
 * const test3: Result = { type: 'a', value: 42, label: 'wrong' }; // ❌ Erreur
 */
export type XOR<T, U> = T | U extends object
	? (Without<T, U> & U) | (Without<U, T> & T)
	: T | U;

export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
	return Object.fromEntries(keys.map((k) => [k, obj[k]])) as Pick<T, K>;
}

// Utils
export type Callback = <T = unknown>(...args: any[]) => T | void;

export type Timeout = ReturnType<typeof setTimeout> | null;

// Emits
export type EmitClick = <T = unknown>(
	e: React.MouseEvent<HTMLButtonElement>
) => T | void | Promise<T | void>;

export type EmitLink = <T = unknown>(
	e: React.MouseEvent<HTMLAnchorElement>
) => T | void | Promise<T | void>;
