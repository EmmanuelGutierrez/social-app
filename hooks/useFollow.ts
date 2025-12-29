import { apolloClient } from "@/graphql/client";
import {
  UserFollowUserDocument,
  UserUnfollowDocument,
} from "@/graphql/types/graphql";
import { useMutation } from "@apollo/client/react";

export const useFollow = () => {
  const [fetchFollow, { loading: followLoading }] = useMutation(
    UserFollowUserDocument,
    { client: apolloClient }
  );

  const [fetchUnfollow, { loading: unfollowLoading }] = useMutation(
    UserUnfollowDocument,
    { client: apolloClient }
  );
  const followUser = async (userId: string) => {
    const res = await fetchFollow({ variables: { userToFollowId: userId } });
    return res.data;
  };

  const unfollowUser = async (userId: string) => {
    const res = await fetchUnfollow({
      variables: { userToUnfollowId: userId },
    });
    return res.data;
  };
  return { followUser, followLoading, unfollowUser, unfollowLoading };
};
