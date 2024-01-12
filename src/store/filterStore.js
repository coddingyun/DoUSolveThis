import { create } from 'zustand';

const useFilterStore = create(set => ({
  studyArea: '지역 선택',
  setStudyArea: area => set({ studyArea: area }),
}));

export default useFilterStore;
