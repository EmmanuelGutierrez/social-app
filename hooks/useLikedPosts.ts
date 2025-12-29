import { apolloClient } from "@/graphql/client";
import { PostLikedPostsDocument } from "@/graphql/types/graphql";
import { useQuery } from "@apollo/client/react";

export function useLikedPosts(username: string) {
  const {
    data: likedPosts,
    loading: likedPostsLoading,
    error: likedPostsError,
    fetchMore,
  } = useQuery(PostLikedPostsDocument, {
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
    if (!likedPosts?.PostLikedPosts.hasMore) {
      return;
    }

    return fetchMore({
      variables: {
        params: {
          limit: 10,
          cursorDate: likedPosts.PostLikedPosts.nextCursor,
          // tags,
        },
      },
    });
  };
  return {
    likedPosts: likedPosts?.PostLikedPosts,
    likedPostsLoading,
    likedPostsError,
    loadMoreLikedPosts,
  };
}
