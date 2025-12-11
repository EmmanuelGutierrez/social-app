import { apolloClient } from "@/graphql/client";
import {
  CreateUserInput,
  LoginInput,
  LoginMutationDocument,
  LogoutMutationDocument,
  MeQueryDocument,
  RegisterMutationDocument,
} from "@/graphql/types/graphql";
import {  createAuthStore } from "@/zustand/useAuthStore";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { useApp } from "./useApp";

// export const useAuthStore = <T>(selector: (store: AuthStore) => T): T => {
//   const result = useStore(createAuthStore, selector);
//   return result as T;
// };

export const useAuth = () => {
  const { hasHydrated, user, setTokenWs, logout, setUser } =
    createAuthStore();
  const {setIsLoading}=useApp()
  const [registerMutation, registerData] = useMutation(
    RegisterMutationDocument,
    {
      client: apolloClient,
      onCompleted: async (data) => {
        if (data?.register.tokenWs) {
          setTokenWs(data.register.tokenWs);
          const meRes = await meQuery();
          setUser(meRes.data?.meQuery);
        }
      },
    }
  );
  
  const [meQuery, meData] = useLazyQuery(MeQueryDocument, {
    client: apolloClient,
    fetchPolicy:"network-only"
  });
  const [loginMutation, loginData] = useMutation(LoginMutationDocument, {
    client: apolloClient,
    onCompleted: async (data) => {
      if (data?.login.tokenWs) {
        setTokenWs(data.login.tokenWs);
        const meRes = await meQuery();
        setUser(meRes.data?.meQuery);
      }
    },
  });
  const [logoutMutation] = useMutation(LogoutMutationDocument, {
    client: apolloClient,
  });

  // if (!authStore) {
  //   return {
  //     user: null,
  //     login: () => {},
  //     register: () => {},
  //     logoutUser: () => {},
  //     getMe: () => {},
  //     errorLogin: undefined,
  //     errorRegister: undefined,
  //     meError: undefined,
  //     loadingLogin: false,
  //     loadingRegister: false,
  //     hasHydrated: false,
  //   };
  // }
  // const { user, setUser, logout, hasHydrated } = authStore;

  const getMe = async () => {
    setIsLoading(true)
    const { data } = await meQuery();
    setUser(data?.meQuery);
    setIsLoading(false)
  };

  const login = (loginData: LoginInput) => {
    setIsLoading(true)
    return loginMutation({ variables: { loginInput: loginData } });
    setIsLoading(false)
  };

  const register = (input: CreateUserInput, file?: File) => {
    setIsLoading(true)
    return registerMutation({
      variables: {
        register: input,
        file: {
          file,
        },
      },
    });
    setIsLoading(false)
  };

  const logoutUser = async () => {
    setIsLoading(true)
    await logoutMutation();
    logout();
    setIsLoading(false)
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
