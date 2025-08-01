import { create } from 'zustand';

export type File = {
	slug: string;
	title: string;
	content: string;
	tags?: string[];
	createdAt?: string;
	image?: string;
};

type State = {
	notes: File[];
	addNote: (note: File) => void;
};

export const useNoteStore = create<State>((set) => ({
	notes: [
		{
			slug: 'welcome',
			title: 'Welcome to Noctura',
			content: '# Welcome\n\nLet the shadows remember.',
			tags: ['intro'],
			createdAt: new Date().toISOString(),
		},
	],
	addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
}));
