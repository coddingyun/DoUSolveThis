import { create } from 'zustand';

const useAppStore = create(set => ({
  studyIdx: '',
  setStudyIdx: cnt => set({ studyIdx: cnt }),

  curMenu: 1, // 1: 스터디 찾기, 2: 내 스터디, 3: 마이페이지
  setCurMenu: menu => set({ curMenu: menu }),
}));

export default useAppStore;
