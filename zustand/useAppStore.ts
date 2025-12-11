import { create } from "zustand";

type appStore = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const useAppStore = create<appStore>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
