import { Callback, EmitClick, EmitLink } from '@core';
import React from 'react';

interface EmitsProps {
	disabled?: boolean;
	onClick?: EmitClick | EmitLink;
}

export function emitsClick(
	e: React.MouseEvent<HTMLButtonElement>,
	props: EmitsProps,
	callback?: Callback
) {
	if (props.disabled) return;
	e.preventDefault();
	e.stopPropagation();
	(props.onClick as EmitClick)?.(e as React.MouseEvent<HTMLButtonElement>);
	callback?.(e);
}

export function emitsLink(
	e: React.MouseEvent<HTMLAnchorElement>,
	props: EmitsProps,
	callback?: Callback
) {
	if (props.disabled) return;
	(props.onClick as EmitLink)?.(e as React.MouseEvent<HTMLAnchorElement>);
	callback?.(e);
}
