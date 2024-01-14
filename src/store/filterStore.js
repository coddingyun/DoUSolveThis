import { create } from 'zustand';

const useFilterStore = create(set => ({
  studyArea: '지역 선택',

  actions: {
    setStudyArea: area => set({ studyArea: area }),
  },
}));

export const useFilterStudyArea = () =>
  useFilterStore(state => state.studyArea);
export const useFilterActions = () => useFilterStore(state => state.actions);
