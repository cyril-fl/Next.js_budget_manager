import { Callback, EmitClick } from '@core';
import React from 'react';

interface EmitsProps {
	disabled?: boolean;
	onClick?: EmitClick;
}

export function emitsClick(
	e: React.MouseEvent<HTMLButtonElement>,
	props: EmitsProps,
	callback?: Callback
) {
	if (props.disabled) return;
	e.preventDefault();
	e.stopPropagation();
	props.onClick?.(e);
	callback?.(e);
}
