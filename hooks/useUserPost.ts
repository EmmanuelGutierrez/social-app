import { apolloClient } from "@/graphql/client";
import { PostUserPostsDocument } from "@/graphql/types/graphql";
import { useQuery } from "@apollo/client/react";

export function useUserPosts(username: string) {
  const {
    data: userPosts,
    loading: userPostsLoading,
    error: userPostsError,
    fetchMore,
  } = useQuery(PostUserPostsDocument, {
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
    console.log(userPosts?.PostUserPosts.hasMore);
    if (!userPosts?.PostUserPosts.hasMore) {
      return;
    }

    return fetchMore({
      variables: {
        params: {
          limit: 5,
          cursorDate: userPosts.PostUserPosts.nextCursor,
          username,
          // tags,
        },
      },
      updateQuery(previousQueryResult, options) {
        const { fetchMoreResult } = options;
        if (!fetchMoreResult) {
          return previousQueryResult;
        }
        const existingIds = previousQueryResult.PostUserPosts.data.map(
          (post) => post.post._id
        );

        const data = [
          ...previousQueryResult.PostUserPosts.data,
          ...fetchMoreResult.PostUserPosts.data.filter(
            (p) => !existingIds.includes(p.post._id)
          ),
        ];
        return {
          ...previousQueryResult,
          PostUserPosts: {
            ...previousQueryResult.PostUserPosts,
            data,
            nextCursor: fetchMoreResult.PostUserPosts.nextCursor,
            hasMore: fetchMoreResult.PostUserPosts.hasMore,
          },
        };
      },
    });
  };
  return { userPosts:userPosts?.PostUserPosts, userPostsLoading, userPostsError, loadMore };
}
