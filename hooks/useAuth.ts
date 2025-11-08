import { apolloClient } from "@/graphql/client";
import {
  CreateUserInput,
  LoginInput,
  LoginMutationDocument,
  MeQueryDocument,
  RegisterMutationDocument,
} from "@/graphql/types/graphql";
import { AuthStore, createAuthStore } from "@/zustand/useAuthStore";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { useStore } from "./useStore";

export const useAuthStore = <T>(selector: (store: AuthStore) => T): T => {
  const result = useStore(createAuthStore, selector);
  // if (result === undefined) {
  //   throw new Error(
  //     "useAuthStore returned undefined. Make sure the provider is set up correctly."
  //   );
  // }
  return result as T;
};

export const useAuth = () => {
  const authStore = useAuthStore((state) => state);
  const [loginMutation, loginData] = useMutation(LoginMutationDocument, {
    client: apolloClient,
  });
  const [registerMutation, registerData] = useMutation(
    RegisterMutationDocument,
    {
      client: apolloClient,
    }
  );
  const [meQuery, meData] = useLazyQuery(MeQueryDocument, {
    client: apolloClient,
  });

  if (!authStore) {
    return {
      user: null,
      login: () => {},
      register: () => {},
      logoutUser: () => {},
      getMe: () => {},
      errorLogin: undefined,
      errorRegister: undefined,
      meError: undefined,
      loadingLogin: false,
      loadingRegister: false,
      hasHydrated: false,
    };
  }
  const { user, setUser, logout, hasHydrated } = authStore;

  const getMe = async () => {
    const { data } = await meQuery();
    setUser(data?.meQuery);
  };

  const login = async (loginData: LoginInput) => {
    const data = await loginMutation({
      variables: { loginInput: loginData },
    });
    if (data.data?.login.tokenWs) {
      localStorage.setItem("tokenWs", data.data.login.tokenWs);
      await getMe();
    }
  };

  const register = async (input: CreateUserInput, file?: File) => {
    const data = await registerMutation({
      variables: { register: input, file },
    });
    if (data.data?.register.tokenWs) {
      localStorage.setItem("tokenWs", data.data.register.tokenWs);
      await getMe();
    }
  };

  const logoutUser = async () => {
    logout();
  };

  return {
    user,
    login,
    register,
    logoutUser,
    getMe,
    errorLogin: loginData.error,
    errorRegister: registerData.error,
    meError: meData.error,
    loadingLogin: loginData.loading,
    loadingRegister: registerData.loading,
    hasHydrated,
  };
};
