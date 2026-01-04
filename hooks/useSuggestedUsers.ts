import { apolloClient } from "@/graphql/client"
import { UserSuggestedUsersDocument } from "@/graphql/types/graphql"
import { useQuery } from "@apollo/client/react"

export const useSuggestedUsers = () => {
    const { data: suggestedUsers, loading: suggestedUsersLoading, error: suggestedUsersError } =
        useQuery(UserSuggestedUsersDocument, { client: apolloClient, fetchPolicy: "cache-first" })
    return { suggestedUsers: suggestedUsers?.UserSuggestedUsers, suggestedUsersLoading, suggestedUsersError }
}