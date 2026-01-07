import { apolloClient } from "@/graphql/client";
import { UserFindUserDocument } from "@/graphql/types/graphql";
import { useLazyQuery } from "@apollo/client/react";

export const useFindUser = () => {
  const [findUserFetch, { data, loading, error }] = useLazyQuery(
    UserFindUserDocument,
    {
      client: apolloClient,
      fetchPolicy: "network-only",
    }
  );
  const findUser = async (query: string) => {
    if (query.trim() === "") {
      return;
    }
    const res = await findUserFetch({
      variables: {
        query,
        limit: 10,
      },
    });
    return res;
  };
  return {
    findUser,
    findUserLoading: loading,
    findUserError: error,
    findUserData: data?.UserFindUser,
  };
};
