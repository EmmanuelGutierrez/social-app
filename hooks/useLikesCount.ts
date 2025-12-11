import { apolloClient } from "@/graphql/client";
import { GetLikesCountDocument } from "@/graphql/types/graphql";
import { useQuery } from "@apollo/client/react";

export function useLikesCount(postId: string) {
  const {
    data: likesCountData,
    loading: likesCountLoading,
    refetch,
  } = useQuery(GetLikesCountDocument, {
    client: apolloClient,
    variables: {
      postId,
    },
  });
  return { likesCountData, likesCountLoading, refetch };
}
