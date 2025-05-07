// Import
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define
const VIEW_KEYS = ['savings', 'templates'] as const;

type ViewStyle = 'list' | 'grid';
export type ViewKey = (typeof VIEW_KEYS)[number];

type ViewStyleState = {
	viewStyle: Record<ViewKey, ViewStyle>;
	setViewStyle: (key: ViewKey, style: ViewStyle) => void;
};

// Store
export const useViewStyle = create<ViewStyleState>()(
	persist(
		(set) => ({
			viewStyle: {
				savings: 'list',
				templates: 'list',
			},
			setViewStyle: (key, style) =>
				set((state) => {
					return {
						viewStyle: {
							...state.viewStyle,
							[key]: style,
						},
					};
				}),
		}),
		{
			name: 'view-style',
		}
	)
);
