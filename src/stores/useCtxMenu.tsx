// Imports
import { create } from 'zustand';

// Define
const VIEW_KEYS = ['overview'] as const;
export type ViewKey = (typeof VIEW_KEYS)[number];

type CtxMenuState = {
	ctx: Record<ViewKey, any[]>;
	setCtxMenu: <T = any>(key: ViewKey, data: T[]) => void;
};

// Store
export const useCtxMenu = create<CtxMenuState>()((set) => ({
	ctx: {
		overview: [],
	},
	setCtxMenu: (key, data) =>
		set((state) => ({
			ctx: {
				...state.ctx,
				[key]: data,
			},
		})),
}));
