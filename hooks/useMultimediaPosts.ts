import { apolloClient } from "@/graphql/client";
import { PostMultimediaPostDocument } from "@/graphql/types/graphql";
import { useQuery } from "@apollo/client/react";

export function useMultimediaPosts(username: string) {
  const {
    data: multimediaPosts,
    loading: multimediaPostsLoading,
    error: multimediaPostsError,
    fetchMore,
  } = useQuery(PostMultimediaPostDocument, {
    client: apolloClient,
    variables: {
      params: {
        limit: 10,
        cursorDate: null,
        onlyMultimedia: true,
        username,
      },
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
  });
  const loadMoreMultimediaPosts = () => {
    if (!multimediaPosts?.PostUserPosts.hasMore) {
      return;
    }

    return fetchMore({
      variables: {
        params: {
          limit: 10,
          cursorDate: multimediaPosts.PostUserPosts.nextCursor,
          // tags,
        },
      },
    });
  };
  return {
    multimediaPosts: multimediaPosts?.PostUserPosts,
    multimediaPostsLoading,
    multimediaPostsError,
    loadMoreMultimediaPosts,
  };
}
