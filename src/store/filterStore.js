import { create } from 'zustand';

const useFilterStore = create(set => ({
  studyArea: {
    area: '',
    city: '',
  },

  actions: {
    setStudyArea: area => set({ studyArea: area }),
  },
}));

export const useFilterStudyArea = () =>
  useFilterStore(state => state.studyArea);
export const useFilterActions = () => useFilterStore(state => state.actions);
