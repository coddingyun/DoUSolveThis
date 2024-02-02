import { create } from 'zustand';

const useSuggestionStore = create(set => ({
  status: null, // solved / not_solved / not_existed
  solvePeople: [],

  actions: {
    setStatus: s => set({ status: s }),
    setSolvePeople: s => set({ solvePeople: s }),
  },
}));

export const useSuggestionStatus = () =>
  useSuggestionStore(state => state.status);
export const useSuggestionSolvePeople = () =>
  useSuggestionStore(state => state.solvePeople);
export const useSuggestionActions = () =>
  useSuggestionStore(state => state.actions);
