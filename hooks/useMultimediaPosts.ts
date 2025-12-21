import { apolloClient } from "@/graphql/client";
import { MultimediaPostDocument } from "@/graphql/types/graphql";
import { useQuery } from "@apollo/client/react";

export function useMultimediaPosts(username: string) {
  const {
    data: multimediaPosts,
    loading: multimediaPostsLoading,
    error: multimediaPostsError,
    fetchMore,
  } = useQuery(MultimediaPostDocument, {
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
    if (!multimediaPosts?.userPosts.hasMore) {
      return;
    }

    return fetchMore({
      variables: {
        params: {
          limit: 10,
          cursorDate: multimediaPosts.userPosts.nextCursor,
          // tags,
        },
      },
    });
  };
  return {
    multimediaPosts,
    multimediaPostsLoading,
    multimediaPostsError,
    loadMoreMultimediaPosts,
  };
}
