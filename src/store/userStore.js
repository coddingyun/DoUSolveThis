import { create } from 'zustand';

const useUserStore = create(set => ({
  userName: '',
  userId: '',
  userImage: '',
  actions: {
    setUserName: name => set({ userName: name }),
    setUserId: id => set({ userId: id }),
    setUserImage: image => set({ userImage: image }),
  },
}));

export const useUserName = () => {
  useUserStore(state => state.userName);
};

export const useUserId = () => {
  useUserStore(state => state.userId);
};

export const useUserImage = () => {
  useUserStore(state => state.userImage);
};

// 컴포넌트에서 사용시 구조 분해 할당으로
export const useUserActions = () => {
  useUserStore(state => state.actions);
};
