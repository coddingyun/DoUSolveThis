import { create } from 'zustand';

const useWithdrawStore = create(set => ({
  managerChangedId: [],

  actions: {
    setManagerChangedId: id =>
      set(state => ({ managerChangedId: [...state.managerChangedId, id] })),
  },
}));

export const useWithdrawManagerChangedId = () =>
  useWithdrawStore(state => state.managerChangedId);
export const useWithdrawActions = () =>
  useWithdrawStore(state => state.actions);
