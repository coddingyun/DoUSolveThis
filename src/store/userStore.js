import { create } from 'zustand';

const useUserStore = create(set => ({
  userName: '',
  userId: '',
  userImage: '',
  setUserName: name => set({ userName: name }),
  setUserId: id => set({ userId: id }),
  setUserImage: image => set({ userImage: image }),
}));

export default useUserStore;
