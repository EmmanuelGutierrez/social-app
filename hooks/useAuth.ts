import { apolloClient } from "@/graphql/client";
import {
  CreateUserInput,
  LoginInput,
  LoginMutationDocument,
  LogoutMutationDocument,
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
  const [registerMutation, registerData] = useMutation(
    RegisterMutationDocument,
    {
      client: apolloClient,
      onCompleted: async (data) => {
        if (authStore && data?.register.tokenWs) {
          localStorage.setItem("tokenWs", data.register.tokenWs);
          const meRes = await meQuery();
          setUser(meRes.data?.meQuery);
        }
      },
    }
  );
  const [meQuery, meData] = useLazyQuery(MeQueryDocument, {
    client: apolloClient,
  });
  const [loginMutation, loginData] = useMutation(LoginMutationDocument, {
    client: apolloClient,
    onCompleted: async (data) => {
      if (authStore && data?.login.tokenWs) {
        localStorage.setItem("tokenWs", data.login.tokenWs);
        const meRes = await meQuery();
        setUser(meRes.data?.meQuery);
      }
    },
  });
  const [logoutMutation] = useMutation(LogoutMutationDocument, {
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

  const login = (loginData: LoginInput) => {
    return loginMutation({ variables: { loginInput: loginData } });
  };

  const register =  (input: CreateUserInput, file?: File) => {
    return registerMutation({
      variables: {
        register: input,
        file: {
          file,
        },
      },
    });
  };

  const logoutUser = async () => {
    await logoutMutation();
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
