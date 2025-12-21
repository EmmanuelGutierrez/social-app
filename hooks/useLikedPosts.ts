import { apolloClient } from "@/graphql/client";
import { LikedPostsDocument } from "@/graphql/types/graphql";
import { useQuery } from "@apollo/client/react";

export function useLikedPosts(username: string) {
  const {
    data: likedPosts,
    loading: likedPostsLoading,
    error: likedPostsError,
    fetchMore,
  } = useQuery(LikedPostsDocument, {
    client: apolloClient,
    variables: {
      params: {
        limit: 10,
        cursorDate: null,
        username,
      },
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
  });
  const loadMoreLikedPosts = () => {
    if (!likedPosts?.likedPosts.hasMore) {
      return;
    }

    return fetchMore({
      variables: {
        params: {
          limit: 10,
          cursorDate: likedPosts.likedPosts.nextCursor,
          // tags,
        },
      },
    });
  };
  return {
    likedPosts,
    likedPostsLoading,
    likedPostsError,
    loadMoreLikedPosts,
  };
}
