import type { Exclusive } from '@core';
import { utilsLocal } from '@utils//utilsLocal';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { z } from 'zod';

const { t } = utilsLocal(); // Placeholder for translation function

// noinspection JSUnusedGlobalSymbols
export function utilsValidate() {
	// Define

	interface MinMaxOptions {
		min?: number;
		max?: number;
	}
	interface PasswordValidatorOptions extends MinMaxOptions {
		reset?: boolean | Exclusive<{ isConfirmation: true }>;
	}
	interface PinValidatorOptions extends MinMaxOptions {
		isCaseSensitive?:
			| boolean
			| Exclusive<{
					toUpperCase: true;
					toLowerCase: true;
			  }>;
	}

	// Data
	const MIN_LENGTH = 0;
	const MAX_LENGTH = 255;

	// Methods
	/**
	 * Validates and sanitizes a string input, removing HTML tags, normalizing whitespace,
	 * and ensuring it meets length constraints. Optionally, HTML characters are escaped.
	 *
	 * @param {MinMaxOptions} [options] - Optional settings for the password validator.
	 * @param {number} [options.min=0] - Minimum number of characters allowed after cleaning.
	 * @param {number} [options.max=255] - Maximum number of characters allowed after cleaning.
	 * @returns z.ZodString - A Zod schema for the string validation with sanitization.
	 */
	function htmlValidator(options?: MinMaxOptions) {
		return z
			.string()
			.trim()
			.min(options?.min || MIN_LENGTH, {
				message: t('error.invalid:field_min_length', {
					length: options?.min || MIN_LENGTH,
				}),
			})
			.max(options?.max || MAX_LENGTH, {
				message: t('error.invalid:field_max_length', {
					length: options?.max || MAX_LENGTH,
				}),
			})
			.transform((value) => {
				value = value.replace(/<\/?[^>]+(>|$)/g, ''); // Remove HTML tags
				value = value.replace(/\s+/g, ' ').trim(); // Normalize whitespace
				value = escapeHTML(value); // Escape special HTML characters
				return value;
			});
	}

	/**
	 * Escapes special HTML characters in a string to prevent HTML injection.
	 *
	 * @param str - The string to escape.
	 * @returns - The escaped string.
	 */
	function escapeHTML(str: string): string {
		return str.replace(/[&<>"']/g, (match) => {
			const map: Record<string, string> = {
				'&': '&amp;',
				'<': '&lt;',
				'>': '&gt;',
				'"': '&quot;',
				"'": '&#39;',
			};
			return map[match] || match;
		});
	}

	/**
	 * Sanitizes and validates an email address by removing leading/trailing spaces,
	 * normalizing the casing, and ensuring it matches a valid email format.
	 *
	 * @param {MinMaxOptions} [options] - Optional settings for the password validator.
	 * @param {number} [options.min=0] - Minimum number of characters allowed after cleaning.
	 * @param {number} [options.max=255] - Maximum number of characters allowed after cleaning.
	 * @returns ZodSchema - A Zod schema for validating and sanitizing the email.
	 */
	function emailValidator(options?: MinMaxOptions) {
		return z
			.string()
			.trim()
			.min(options?.min || MIN_LENGTH, {
				message: t('error.invalid:email_min_length', {
					min: options?.min || MIN_LENGTH,
				}),
			})
			.max(options?.max || MAX_LENGTH, {
				message: t('error.invalid:email_max_length', {
					max: options?.max || MAX_LENGTH,
				}),
			})
			.transform((value) => value.toLowerCase())
			.refine(
				(value) => {
					const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
					return emailRegex.test(value);
				},
				{ message: t('error.invalid:email_format') }
			);
	}

	/**
	 * Validates and sanitizes a phone number using libphonenumber-js.
	 * Strips non-numeric characters and ensures the phone number is valid.
	 *
	 * @returns ZodSchema - A Zod schema for validating and sanitizing the phone number.
	 */
	function phoneNumberValidator() {
		return z
			.string()
			.trim()
			.refine(
				(value) => {
					const cleanedValue = value.replace(/[^+\d]/g, '');
					if (['', '0000000000'].includes(cleanedValue)) {
						return true;
					}

					const phone = parsePhoneNumberFromString(cleanedValue);
					return !!(phone && phone.isValid());
				},
				{ message: t('error.invalid:phone_format') }
			)
			.transform((value) => {
				return value.replace(/[^+\d]/g, '');
			});
	}

	/**
	 *  Validates and sanitizes a string date input, ensuring it is a valid date format and in the future.
	 *	@returns ZodSchema - A Zod schema for validating and sanitizing the date string.
	 */
	function stringDateValidator() {
		return z
			.string()
			.trim()
			.refine((value) => !isNaN(new Date(value).getTime()), {
				message: t('error.invalid:date_format'),
			})
			.refine((value) => new Date(value).getTime() > Date.now(), {
				message: t('error.invalid:date_passed'),
			})
			.transform((value) => new Date(value).toISOString());
	}

	/**
	 * Validates and sanitizes a PIN input, ensuring it meets length constraints and is case-sensitive.
	 *
	 * @param {PinValidatorOptions} [options] - Optional settings for the PIN validator.
	 * @returns ZodSchema - A Zod schema for validating and sanitizing the PIN.
	 */
	function pinValidator(options?: PinValidatorOptions) {
		return z
			.string()
			.trim()
			.min(options?.min || MIN_LENGTH, {
				message: t('error.invalid:field_min_length', {
					length: options?.min || MIN_LENGTH,
				}),
			})
			.max(options?.max || MAX_LENGTH, {
				message: t('error.invalid:field_max_length', {
					length: options?.max || MAX_LENGTH,
				}),
			})
			.transform((value) => {
				if (!options?.isCaseSensitive) return value;

				if (typeof options?.isCaseSensitive === 'object') {
					const { toUpperCase, toLowerCase } = options.isCaseSensitive;

					if (toLowerCase) return value.toLowerCase();
					if (toUpperCase) return value.toUpperCase();
				}

				return value.toLowerCase();
			});
	}

	/**
	 * Validates and sanitizes a password input, ensuring it meets length constraints and contains required characters.
	 *
	 * @param {PasswordValidatorOptions} [options] - Optional settings for the password validator.
	 * @returns ZodSchema - A Zod schema for validating and sanitizing the password.
	 */
	function passwordValidator(options?: PasswordValidatorOptions) {
		return z
			.string()
			.trim()
			.min(options?.min || MIN_LENGTH, {
				message: t('error.invalid:field_min_length', {
					length: options?.min || MIN_LENGTH,
				}),
			})
			.max(options?.max || MAX_LENGTH, {
				message: t('error.invalid:field_max_length', {
					length: options?.max || MAX_LENGTH,
				}),
			})

			.refine(
				(value) => {
					if (options?.reset !== true) return true;
					const hasLowerCase = /[a-z]/.test(value);
					const hasUpperCase = /[A-Z]/.test(value);
					const hasNumber = /\d/.test(value);
					const hasSpecial = /[!"#$%&'()*+,\-.:;=?@^_|~]+/.test(value);

					return hasLowerCase && hasUpperCase && (hasNumber || hasSpecial);
				},
				{
					message: !(
						typeof options?.reset === 'object' && options.reset.isConfirmation
					)
						? t('error.invalid:password_format')
						: '',
				}
			)
			.refine(
				(value) => {
					const hasInvalidChars = /[&<>"']/g.test(value);
					return !hasInvalidChars;
				},
				{ message: t('error.invalid:password_chars', { chars: '&<>"\'' }) }
			);
	}

	return {
		html: htmlValidator,
		email: emailValidator,
		phoneNumber: phoneNumberValidator,
		stringDate: stringDateValidator,
		pin: pinValidator,
		password: passwordValidator,
	};
}
