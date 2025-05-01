// Imports
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define
const VIEW_KEYS = ['overview', 'dashboard'] as const;
export type CtxMenuViewKey = (typeof VIEW_KEYS)[number];

interface CtxMenuView {
	index: object[];
}

type CtxMenuState = {
	ctx: CtxMenuView;
	setCtxMenu: <K extends keyof CtxMenuView>(
		key: K,
		data: CtxMenuView[K]
	) => void;
};

export const useCtxMenu = create<CtxMenuState>()(
	persist(
		(set) => ({
			ctx: {
				index: [],
			},
			setCtxMenu: (key, data) =>
				set((state) => ({
					ctx: {
						...state.ctx,
						[key]: data,
					},
				})),
		}),
		{
			name: 'ctx-menu-storage', // nom de la clé dans localStorage
			partialize: (state) => ({ ctx: state.ctx }), // facultatif : ne persister que `ctx`
		}
	)
);
