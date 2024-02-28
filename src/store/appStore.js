import { create } from 'zustand';

const useAppStore = create(set => ({
  curMenu: 'search', // search, myStudy, myPage

  actions: {
    setCurMenu: menu => set({ curMenu: menu }),
  },
}));

export const useAppCurMenu = () => useAppStore(state => state.curMenu);
export const useAppActions = () => useAppStore(state => state.actions);
