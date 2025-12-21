import { apolloClient } from "@/graphql/client";
import { UserPostsDocument } from "@/graphql/types/graphql";
import { useQuery } from "@apollo/client/react";

export function useUserPosts(username: string) {
  const {
    data: userPosts,
    loading: userPostsLoading,
    error: userPostsError,
    fetchMore,
  } = useQuery(UserPostsDocument, {
    client: apolloClient,
    variables: {
      params: {
        limit: 5,
        cursorDate: null,
        username,
      },
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
  });
  const loadMore = () => {
    if (!userPosts?.userPosts.hasMore) {
      return;
    }

    return fetchMore({
      variables: {
        params: {
          limit: 5,
          cursorDate: userPosts.userPosts.nextCursor,
          // tags,
        },
      },
    });
  };
  return { userPosts, userPostsLoading, userPostsError, loadMore };
}
