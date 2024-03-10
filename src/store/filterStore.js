import { create } from 'zustand';

const useFilterStore = create(set => ({
  studyArea: {
    area: '전국',
    city: '전체',
  },

  actions: {
    setStudyArea: area => set({ studyArea: area }),
  },
}));

export const useFilterStudyArea = () =>
  useFilterStore(state => state.studyArea);
export const useFilterActions = () => useFilterStore(state => state.actions);
