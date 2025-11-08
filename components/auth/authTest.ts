import { useStore } from "@/hooks/useStore";
import { AuthStore, createAuthStore } from "@/zustand/useAuthStore";

export const useAuthTest = <T>(selector: (store: AuthStore) => T): T => {
  const result = useStore(createAuthStore, selector);
  // if (result === undefined) {
  //   throw new Error(
  //     "useAuthStore returned undefined. Make sure the provider is set up correctly."
  //   );
  // }
  return result as T;
};
