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
    console.log(userPosts?.userPosts.hasMore);
    if (!userPosts?.userPosts.hasMore) {
      return;
    }

    return fetchMore({
      variables: {
        params: {
          limit: 5,
          cursorDate: userPosts.userPosts.nextCursor,
          username,
          // tags,
        },
      },
      updateQuery(previousQueryResult, options) {
        const { fetchMoreResult } = options;
        if (!fetchMoreResult) {
          return previousQueryResult;
        }
        const existingIds = previousQueryResult.userPosts.data.map(
          (post) => post.post._id
        );

        const data = [
          ...previousQueryResult.userPosts.data,
          ...fetchMoreResult.userPosts.data.filter(
            (p) => !existingIds.includes(p.post._id)
          ),
        ];
        return {
          ...previousQueryResult,
          userPosts: {
            ...previousQueryResult.userPosts,
            data,
            nextCursor: fetchMoreResult.userPosts.nextCursor,
            hasMore: fetchMoreResult.userPosts.hasMore,
          },
        };
      },
    });
  };
  return { userPosts, userPostsLoading, userPostsError, loadMore };
}
