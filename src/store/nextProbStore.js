import { create } from 'zustand';

const useNextProbStore = create(set => ({
  nextProbs: [],

  actions: {
    setNextProbs: probs => set({ nextProbs: probs }),
    deleteNextProbs: id => {
      set(state => ({
        nextProbs: state.nextProbs.filter(prob => prob.probNum !== id),
      }));
    },
    deleteAllNextProbs: () => set({ nextProbs: [] }),
    addNextProbs: prob => {
      set(state => ({
        nextProbs: [...state.nextProbs, prob],
      }));
    },
  },
}));

export const useNextProbs = () => useNextProbStore(state => state.nextProbs);
export const useNextProbsActions = () =>
  useNextProbStore(state => state.actions);
