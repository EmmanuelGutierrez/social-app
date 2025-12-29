import { apolloClient } from "@/graphql/client";
import { MyFeedDocument, MyFeedQuery } from "@/graphql/types/graphql";
import { useQuery } from "@apollo/client/react";

export function useMyFeed() {
  const {
    data: myFeed,
    loading,
    error,
    fetchMore,
  } = useQuery<MyFeedQuery>(MyFeedDocument, {
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
    if (!myFeed?.myFeed.hasMore) {
      return;
    }

    return fetchMore({
      variables: {
        params: {
          limit: 5,
          cursorDate: myFeed.myFeed.nextCursor,
          // tags,
        },
      },
      updateQuery(previousQueryResult, options) {
        const { fetchMoreResult, } = options;
        if (!fetchMoreResult) {
          return previousQueryResult;
        }
        const existingIds = previousQueryResult.myFeed.data.map(
          (post) => post.post._id
        );

        const data = [
          ...previousQueryResult.myFeed.data,
          ...fetchMoreResult.myFeed.data.filter(
            (p) => !existingIds.includes(p.post._id)
          ),
        ];
        return {
          ...previousQueryResult,
          myFeed: {
            ...previousQueryResult.myFeed,
            data,
            nextCursor: fetchMoreResult.myFeed.nextCursor,
            hasMore: fetchMoreResult.myFeed.hasMore,
          },
        };
      },
    });
  };
  return { myFeed, loading, error, loadMore };
}
