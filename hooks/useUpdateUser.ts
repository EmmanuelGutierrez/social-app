import { apolloClient } from "@/graphql/client";
import { UserUpdateDocument, UpdateUserInput } from "@/graphql/types/graphql";
import { useAuth } from "./useAuth";
import { useMutation } from "@apollo/client/react";

export const useUpdateUser = () => {
  const { setUser, user } = useAuth();
  const [updateUserMutation, updateUserData] = useMutation(UserUpdateDocument, {
    client: apolloClient,
    fetchPolicy: "network-only",
    onCompleted: async (data) => {
      if (data?.UserUpdate) {
        //    const meRes = await meQuery();
        const userData = {
          ...data?.UserUpdate,
          followers: user?.followers,
          following: user?.following,
        };
        setUser(userData);
      }
    },
  });

  const updateUser = async (
    input: UpdateUserInput,
    profileImg?: File | null,
    bannerImg?: File | null
  ) => {
    const res = await updateUserMutation({
      variables: {
        updateUserInput: input,
        bannerImg,
        profileImg,
      },
    });
    return res;
  };

  return {
    updateUser,
    updateUserLoading: updateUserData.loading,
    updateUserError: updateUserData.error,
  };
};
