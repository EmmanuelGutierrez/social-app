import { useAppStore } from "@/zustand/useAppStore";

export const useApp = () => {
  const {
    isLoading,
    setIsLoading,
  } = useAppStore();
  return {
    isLoading,
    setIsLoading,
  };
};
