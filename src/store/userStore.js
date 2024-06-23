import { create } from 'zustand';

export const useUserStore = create(set => ({
  userName: '',
  userId: '',
  userImage: '',
  userNotices: 0,
  //userBaekjoonId: '',

  actions: {
    setUserName: name => set({ userName: name }),
    setUserId: id => set({ userId: id }),
    setUserImage: image => set({ userImage: image }),
    setUserNotices: notices => set({ userNotices: notices }),
    //setUserBaekjoonId: baekjoonId => set({ userBaekjoonId: baekjoonId }),
  },
}));

export const useUserName = () => useUserStore(state => state.userName);
export const useUserId = () => useUserStore(state => state.userId);
export const useUserImage = () => useUserStore(state => state.userImage);
export const useUserNotices = () => useUserStore(state => state.userNotices);
//export const useUserBaekjoonId = () => useUserStore(state => state.userBaekjoonId);
// 컴포넌트에서 사용시 구조 분해 할당으로
export const useUserActions = () => useUserStore(state => state.actions);
