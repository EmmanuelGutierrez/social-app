import { apolloClient } from "@/graphql/client";
import { PostGetLikesCountDocument } from "@/graphql/types/graphql";
import { useQuery } from "@apollo/client/react";

export function useLikesCount(postId: string) {
  const {
    data: likesCountData,
    loading: likesCountLoading,
    refetch,
  } = useQuery(PostGetLikesCountDocument, {
    client: apolloClient,
    variables: {
      postId,
    },
  });
  return { likesCountData, likesCountLoading, refetch };
}
