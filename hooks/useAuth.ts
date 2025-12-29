import { apolloClient } from "@/graphql/client";

import { createAuthStore } from "@/zustand/useAuthStore";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { useApp } from "./useApp";
import {
  AuthLoginDocument,
  AuthLogoutDocument,
  AuthRegisterDocument,
  CreateUserInput,
  LoginInput,
  UserMeQueryDocument,
} from "@/graphql/types/graphql";

// export const useAuthStore = <T>(selector: (store: AuthStore) => T): T => {
//   const result = useStore(createAuthStore, selector);
//   return result as T;
// };

export const useAuth = () => {
  const { hasHydrated, user, setTokenWs, logout, setUser } = createAuthStore();
  const { setIsLoading } = useApp();
  const [registerMutation, registerData] = useMutation(AuthRegisterDocument, {
    client: apolloClient,
    fetchPolicy: "network-only",
    onCompleted: async (data) => {
      if (data?.AuthRegister.tokenWs) {
        setTokenWs(data.AuthRegister.tokenWs);
        const meRes = await meQuery();
        setUser(meRes.data?.UserMeQuery);
      }
    },
  });

  const [meQuery, meData] = useLazyQuery(UserMeQueryDocument, {
    client: apolloClient,
    fetchPolicy: "network-only",
  });
  const [loginMutation, loginData] = useMutation(AuthLoginDocument, {
    client: apolloClient,
    fetchPolicy: "network-only",
    onCompleted: async (data) => {
      if (data?.AuthLogin.tokenWs) {
        localStorage.setItem("tokenWs", data?.AuthLogin.tokenWs);
        setTokenWs(data.AuthLogin.tokenWs);
        const meRes = await meQuery();
        setUser(meRes.data?.UserMeQuery);
      }
    },
  });
  const [logoutMutation] = useMutation(AuthLogoutDocument, {
    client: apolloClient,
  });

  const getMe = async () => {
    setIsLoading(true);
    const { data } = await meQuery();
    setUser(data?.UserMeQuery);
    setIsLoading(false);
  };

  const login = async (loginData: LoginInput) => {
    setIsLoading(true);
    const res = await loginMutation({ variables: { loginInput: loginData } });
    setIsLoading(false);
    return res;
  };

  const register = async (input: CreateUserInput, file?: File) => {
    const res = await registerMutation({
      variables: {
        register: input,
        file: file || null,
      },
    });
    return res;
  };

  const logoutUser = async () => {
    setIsLoading(true);
    await logoutMutation();
    logout();
    setIsLoading(false);
  };

  return {
    user,
    login,
    register,
    logoutUser,
    getMe,
    setUser,
    errorLogin: loginData.error,
    errorRegister: registerData.error,
    meError: meData.error,
    loadingLogin: loginData.loading,
    loadingRegister: registerData.loading,
    hasHydrated,
  };
};
