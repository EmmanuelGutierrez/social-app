import { apolloClient } from "@/graphql/client";
import { PostMyFeedDocument, PostMyFeedQuery } from "@/graphql/types/graphql";
import { useQuery } from "@apollo/client/react";

export function useMyFeed() {
  const {
    data: myFeed,
    loading,
    error,
    fetchMore,
  } = useQuery<PostMyFeedQuery>(PostMyFeedDocument, {
    client: apolloClient,
    variables: {
      params: {
        limit: 5,
        cursorDate: null,
      },
    },

    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
  });
  const loadMore = () => {
    if (!myFeed?.PostMyFeed.hasMore) {
      return;
    }

    return fetchMore({
      variables: {
        params: {
          limit: 5,
          cursorDate: myFeed.PostMyFeed.nextCursor,
          // tags,
        },
      },
      updateQuery(previousQueryResult, options) {
        const { fetchMoreResult } = options;
        if (!fetchMoreResult) {
          return previousQueryResult;
        }
        const existingIds = previousQueryResult.PostMyFeed.data.map(
          (post) => post.post._id
        );

        const data = [
          ...previousQueryResult.PostMyFeed.data,
          ...fetchMoreResult.PostMyFeed.data.filter(
            (p) => !existingIds.includes(p.post._id)
          ),
        ];
        return {
          ...previousQueryResult,
          PostMyFeed: {
            ...previousQueryResult.PostMyFeed,
            data,
            nextCursor: fetchMoreResult.PostMyFeed.nextCursor,
            hasMore: fetchMoreResult.PostMyFeed.hasMore,
          },
        };
      },
    });
  };
  return { myFeed: myFeed?.PostMyFeed, loading, error, loadMore };
}
