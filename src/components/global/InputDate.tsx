'use client';
// Imports
import { InputProps, theme } from '@/components/global/Input';
import { useGenerateID } from '@/hooks/useGenerateID';
import { Icon, IconifyIcon } from '@iconify/react';
import { utilsIcons } from '@utils/utilsIcons';
import { utilsInput } from '@utils/utilsInput';
import React, {
	ChangeEvent,
	createRef,
	Fragment,
	RefObject,
	useMemo,
	useState,
} from 'react';

// Define
type YearSegment = 'yyyy' | 'yy';
type MonthSegment = 'mm';
type DaySegment = 'dd';
type SegmentKey = 'day' | 'month' | 'year' | 'unknown';
type Granularity =
	| `${DaySegment}-${MonthSegment}-${YearSegment}`
	| `${MonthSegment}-${YearSegment}`;

interface InputDateProps<T extends object, K extends keyof T>
	extends Omit<InputProps<T, K>, 'placeholder'> {
	granularity?: Granularity;
	placeholder?: boolean;
}

export default function InputDate<T extends object, K extends keyof T>(
	props: InputDateProps<T, K>
) {
	// Data
	const icons = utilsIcons();
	// TODO Implement in et input
	const { handleKey, handleIconClick } = utilsInput(props);
	// TODO Implement in switch et input
	const id = useGenerateID(props);
	const [isHovered, setIsHovered] = useState(props.isHovered);
	const [isFocus, setIsFocus] = useState(props.isFocused);

	const iconName = useMemo(
		(): string | IconifyIcon =>
			props.isLoading && props.icon ? icons.loading : (props.icon ?? ''),
		[icons.loading, props.icon, props.isLoading]
	);
	const ui = useMemo(
		() =>
			theme({
				color: props.color,
				size: props.size,
				variant: props.variant,
				fit: props.sizeFit,
				focus: isFocus,
				loading: props.isLoading,
				hover: isHovered,
			}),
		[
			props.color,
			props.size,
			props.variant,
			props.sizeFit,
			props.isLoading,
			isFocus,
			isHovered,
		]
	);

	const segments = useMemo(
		() =>
			(props.granularity ?? 'dd-mm-yyyy').split('-').map((segment) => {
				let key: SegmentKey = 'unknown';
				let placeholder;
				if (segment.includes('d')) {
					key = 'day';
					placeholder = 'dd';
				}
				if (segment.includes('m')) {
					key = 'month';
					placeholder = 'mm';
				}
				if (segment.includes('y')) {
					key = 'year';
					placeholder = segment;
				}

				return { key, placeholder, maxLength: segment.length };
			}),

		[props.granularity]
	);

	const inputRefs = useMemo(
		() => segments.map(() => createRef<HTMLInputElement>()),
		[segments]
	);

	const objectInputRef = useMemo(() => {
		segments.map(() => createRef<HTMLInputElement>());
		return segments.reduce(
			(acc, segment, index) => {
				acc[segment.key] = inputRefs[index];
				return acc;
			},
			{} as Record<SegmentKey, RefObject<HTMLInputElement | null>>
		);
	}, [segments, inputRefs]);

	// Methods
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		const currentIndex = inputRefs.findIndex(
			(input) => input.current === target
		);
		if (currentIndex === -1) return;

		handleKey(e);

		if (e.key === 'Backspace' && target.value.length === 0) {
			handleFocusBackward(currentIndex, target);
		}
		if (e.key !== 'Backspace' && target.value.length === target.maxLength) {
			handleFocusForward(currentIndex, target);
		}
	};
	/*
 GERER LE FAIS Que lq data ne doit pas etre invalide
 Jour de 1 à 31 max, check la max leng ou réequilibrer
 Mois de 1 à 12
 Année oK
*/
	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		const target = e.target;
		const currentIndex = inputRefs.findIndex(
			(input) => input.current === target
		);
		console.log('currentIndex', currentIndex);

		if (currentIndex === -1) return;

		handleFocusForward(currentIndex, target);
		handleFocusBackward(currentIndex, target);
	};

	const handleFocusForward = (
		index: number,
		input: EventTarget & HTMLInputElement
	) => {
		if (input.value.length !== input.maxLength) return;
		if (index + 1 >= inputRefs.length) return;
		inputRefs[index + 1].current?.focus();
	};

	const handleFocusBackward = (
		index: number,
		input: EventTarget & HTMLInputElement
	) => {
		if (input.value.length !== 0) return;
		if (index <= 0) return;
		inputRefs[index - 1].current?.focus();
	};

	const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
		setIsFocus(false);
		const target = e.target;
		const currentIndex = inputRefs.findIndex(
			(input) => input.current === target
		);
		if (currentIndex === -1) return;
		const value = target.value;

		if (value.length < target.maxLength) {
			target.value = value.padStart(target.maxLength, '0');
		}
		if (value.length === 0) {
			target.value = '';
		}
	};

	// Render
	const Label = props.label && !props.noLabel && (
		<label htmlFor={id} className={ui.label({ className: props.ui?.label })}>
			<span>{props.label}</span>
			{props.isLabelError && props.errors && (
				<span className={ui.errors()}>{props.errors.value as string}</span>
			)}
		</label>
	);

	const Error = props.errors && !props.isLabelError && (
		<span className={ui.errors()}>{props.errors.value as string}</span>
	);

	const IconElement = props.icon && (
		<button
			type="button"
			onClick={handleIconClick}
			className={ui.icon({ className: props.ui?.icon })}
		>
			<Icon icon={iconName} />
		</button>
	);

	return (
		<div className={ui.wrapper({ className: props.ui?.wrapper })}>
			{Label}

			<div
				className={ui.base({
					className: ['justify-start', props.className, props.ui?.base],
				})}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{props.leading && IconElement}

				{segments.map((segment, index) => (
					<Fragment key={segment.key}>
						<input
							id={`${id}-${segment.key}`} // unique id par champ
							ref={objectInputRef[segment.key]}
							disabled={props.disabled}
							placeholder={props.placeholder ? segment.placeholder : undefined}
							required={props.required}
							maxLength={segment.maxLength}
							className="w-8 text-center focus:ring-0 focus:outline-none"
							onFocus={() => setIsFocus(true)}
							onBlur={handleBlur}
							onKeyDown={handleKeyDown}
							onInput={handleInput}
						/>
						{index !== segments.length - 1 && <span>/</span>}
					</Fragment>
				))}
				{props.trailing && IconElement}
			</div>
			{Error}
		</div>
	);
}
