import { apolloClient } from "@/graphql/client"
import { SubNewPostsDocument, SubNewPostsSubscription } from "@/graphql/types/graphql"
import { useSubscription } from "@apollo/client/react"

export const useNotificationSubscription = (
  callback: (
    data: useSubscription.OnDataResult<SubNewPostsSubscription>
  ) => void
) => {
  useSubscription(SubNewPostsDocument, {
    client: apolloClient,
    onData: ({ data }) => {
        callback(data)
    },
    onError: (error) => {
        console.log("ERROR in sub", error)
    }
  });
};