import { create } from 'zustand';

const useStudyStore = create(set => ({
  studyName: '',
  description: '',
  kakaoUrl: '',
  language: 'Cpp',
  level: '입문',
  solvedProblemNumber: null,
  meetingType: '온라인',
  studyArea: {
    area: '서울특별시',
    city: '전체',
  },
  studyTime: '',
  frequencyStandard: '',
  frequencyNumber: null,
  members: [],

  actions: {
    setStudyName: s => set({ studyName: s }),
    setDescription: s => set({ description: s }),
    setKakaoUrl: s => set({ kakaoUrl: s }),
    setLanguage: s => set({ language: s }),
    setLevel: s => set({ level: s }),
    setSolvedProblemNumber: s => set({ solvedProblemNumber: s }),
    setMeetingType: s => set({ meetingType: s }),
    setStudyArea: area => set({ studyArea: area }),
    setStudyTime: s => set({ studyTime: s }),
    setFrequencyStandard: s => set({ frequencyStandard: s }),
    setFrequencyNumber: s => set({ frequencyNumber: s }),
    addMember: s => set(state => ({ members: [...state.members, s] })),
    deleteMember: s =>
      set(state => ({ members: state.members.filter(member => member !== s) })),
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
export const useStudyMeetingType = () =>
  useStudyStore(state => state.meetingType);
export const useStudyArea = () => useStudyStore(state => state.studyArea);
export const useStudyTime = () => useStudyStore(state => state.studyTime);
export const useStudyFrequencyStandard = () =>
  useStudyStore(state => state.frequencyStandard);
export const useStudyFrequencyNumber = () =>
  useStudyStore(state => state.frequencyNumber);
export const useStudyMembers = () => useStudyStore(state => state.members);

export const useStudyActions = () => useStudyStore(state => state.actions);
