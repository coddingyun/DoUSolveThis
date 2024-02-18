import { create } from 'zustand';

const useStudyStore = create(set => ({
  studyName: '',
  description: '',
  kakaoUrl: '',
  language: '',
  level: '',
  solvedProblemNumber: null,

  actions: {
    setStudyName: s => set({ studyName: s }),
    setDescription: s => set({ description: s }),
    setKakaoUrl: s => set({ kakaoUrl: s }),
    setLanguage: s => set({ language: s }),
    setLevel: s => set({ level: s }),
    setSolvedProblemNumber: s => set({ solvedProblemNumber: s }),
  },
}));

export const useStudyName = () => useStudyStore(state => state.studyName);
export const useStudyDescription = () =>
  useStudyStore(state => state.description);
export const useStudyKakaoUrl = () => useStudyStore(state => state.kakaoUrl);
export const useStudyLanguage = () => useStudyStore(state => state.language);
export const useStudyLevel = () => useStudyStore(state => state.level);
export const useStudySolvedProblemNumber = () =>
  useStudyStore(state => state.solvedProblemNumber);
export const useStudyActions = () => useStudyStore(state => state.actions);
