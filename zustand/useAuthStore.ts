
// import { createStore } from "zustand/vanilla";
import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { MeQueryQuery, } from "@/graphql/types/graphql";
export type AuthState = {
  user: MeQueryQuery["meQuery"] | undefined;
  loading: boolean;
  hasHydrated: boolean;
};

export type AuthAction = {
  setUser: (user: MeQueryQuery["meQuery"] | undefined) => void;
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
      setUser: (user: MeQueryQuery["meQuery"] | undefined) => set(() => ({ user })),
      setLoading: (loading: boolean) =>
        set(() => ({
          loading,
        })),
      setHasHydrated: (hydrated) => {
        set(() => ({ hasHydrated: hydrated }));
      },
      logout() {
        // if (typeof document !== "undefined") {
        //   document.cookie =
        //     "auth_token=; expire=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // }
        // const hanldeActivity = () => {
        //   get().updateActivity();
        // };
        // events.forEach((e) => {
        //   removeEventListener(e, hanldeActivity);
        // });
        set(() => ({ user: undefined }));
        window.location.href = "/auth";
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    }
  )
);
