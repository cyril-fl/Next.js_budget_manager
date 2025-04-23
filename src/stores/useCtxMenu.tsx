// Imports
import { CalendarRecord } from '@/models/Calendar';
import { create } from 'zustand';

// Define
const VIEW_KEYS = ['overview'] as const;
export type CtxMenuViewKey = (typeof VIEW_KEYS)[number];

interface CtxMenuView {
	overview: CalendarRecord[];
	// futureKey: OtherType[];
}

type CtxMenuState = {
	ctx: CtxMenuView;
	setCtxMenu: <K extends keyof CtxMenuView>(
		key: K,
		data: CtxMenuView[K]
	) => void;
};

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
