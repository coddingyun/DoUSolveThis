import { create } from 'zustand';

const useAppStore = create(set => ({
  studyIdx: '',
  setStudyIdx: cnt => set({ studyIdx: cnt }),
}));

export default useAppStore;
