import { create } from 'zustand';

const useAppStore = create(set => ({
  curMenu: 1, // 1: 스터디 찾기, 2: 내 스터디, 3: 마이페이지

  actions: {
    setCurMenu: menu => set({ curMenu: menu }),
  },
}));

export const useAppCurMenu = () => useAppStore(state => state.curMenu);
export const useAppActions = () => useAppStore(state => state.actions);
