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

// Utils

export type Callback = <T = unknown>(...args: any[]) => T | void;

export type Timeout = ReturnType<typeof setTimeout> | null;

// Emits
export type EmitClick = <T = unknown>(
	e: React.MouseEvent<HTMLButtonElement>
) => T | void | Promise<T | void>;
