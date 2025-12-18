import { apolloClient } from "@/graphql/client"
import { RandomSuggestedUsersDocument } from "@/graphql/types/graphql"
import { useQuery } from "@apollo/client/react"

export const useSuggestedUsers = () => {
    const { data: suggestedUsers, loading: suggestedUsersLoading, error: suggestedUsersError } =
        useQuery(RandomSuggestedUsersDocument, { client: apolloClient, fetchPolicy: "cache-first" })
    return { suggestedUsers, suggestedUsersLoading, suggestedUsersError }
}