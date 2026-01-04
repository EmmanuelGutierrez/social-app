// import { createStore } from "zustand/vanilla";
import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { UserMeQueryQuery } from "@/graphql/types/graphql";
export type AuthState = {
  user: UserMeQueryQuery["UserMeQuery"] | undefined;
  loading: boolean;
  tokenWs?: string;
  hasHydrated: boolean;
};

export type AuthAction = {
  setUser: (user: UserMeQueryQuery["UserMeQuery"] | undefined) => void;
  setTokenWs: (tokenWs: string) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  setHasHydrated: (hydrated: boolean) => void;
};

export type AuthStore = AuthState & AuthAction;

export const defaultInitState: AuthState = {
  user: undefined,
  hasHydrated: false,
  loading: false,
};

export const createAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...defaultInitState,
      setUser: (user: UserMeQueryQuery["UserMeQuery"] | undefined) =>
        set(() => ({ user })),
      setLoading: (loading: boolean) =>
        set(() => ({
          loading,
        })),
      setHasHydrated: (hydrated) => {
        set(() => ({ hasHydrated: hydrated }));
      },
      setTokenWs: (tokenWs: string) => set(() => ({ tokenWs })),
      logout() {
        set(() => ({ user: undefined }));
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state, error) => {
        if (!error && state) {
          state.setHasHydrated(true);
        }
      },
    }
  )
);
