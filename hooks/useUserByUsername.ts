import { apolloClient } from "@/graphql/client";
import { UserByUsernameDocument } from "@/graphql/types/graphql";
import { useQuery } from "@apollo/client/react";

export function useUserByUsername(username: string) {
  const { data, loading, error } = useQuery(UserByUsernameDocument, {
    client: apolloClient,
    variables: { username },
  });

  return { userData: data?.UserByUsername, userLoading: loading, userError: error };
}
