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
      });
    };
    return { myFeed, loading, error, loadMore };
  }
