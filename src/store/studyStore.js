import { create } from 'zustand';

const initialState = {
  studyName: '',
  description: '',
  kakaoUrl: '',
  language: 'Python',
  level: '입문',
  solvedProblemNumber: '',
  meetingType: '온·오프라인',
  studyArea: {
    area: '전국',
    city: '전체',
  },
  studyTime: '',
  frequencyStandard: '월',
  frequencyNumber: '1회',
  members: [],
};

export const useStudyStore = create(set => ({
  ...initialState,

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
    reset: () => {
      set(initialState);
    },
  },
}));

export const useEditStudyStore = create(set => ({
  ...initialState,
  manager: {
    userId: 0,
    username: '',
  },

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
    setManager: s => set({ manager: s }),
    setMembers: s => set({ members: s }),
    addMember: s => set(state => ({ members: [...state.members, s] })),
    deleteMember: s =>
      set(state => ({ members: state.members.filter(member => member !== s) })),
    reset: () => {
      set(initialState);
    },
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

export const useEditStudyName = () =>
  useEditStudyStore(state => state.studyName);
export const useEditStudyDescription = () =>
  useEditStudyStore(state => state.description);
export const useEditStudyKakaoUrl = () =>
  useEditStudyStore(state => state.kakaoUrl);
export const useEditStudyLanguage = () =>
  useEditStudyStore(state => state.language);
export const useEditStudyLevel = () => useEditStudyStore(state => state.level);
export const useEditStudySolvedProblemNumber = () =>
  useEditStudyStore(state => state.solvedProblemNumber);
export const useEditStudyMeetingType = () =>
  useEditStudyStore(state => state.meetingType);
export const useEditStudyArea = () =>
  useEditStudyStore(state => state.studyArea);
export const useEditStudyTime = () =>
  useEditStudyStore(state => state.studyTime);
export const useEditStudyFrequencyStandard = () =>
  useEditStudyStore(state => state.frequencyStandard);
export const useEditStudyFrequencyNumber = () =>
  useEditStudyStore(state => state.frequencyNumber);
export const useEditStudyManager = () =>
  useEditStudyStore(state => state.manager);
export const useEditStudyMembers = () =>
  useEditStudyStore(state => state.members);

export const useEditStudyActions = () =>
  useEditStudyStore(state => state.actions);

const useExitStudyStore = create(set => ({
  lead: '',

  actions: {
    setLead: s => set({ lead: s }),
  },
}));

export const useExitLead = () => useExitStudyStore(state => state.lead);
export const useExitActions = () => useExitStudyStore(state => state.actions);
