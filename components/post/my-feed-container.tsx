'use client'
import { PostContainer } from "./post-container"
import { useMyFeed } from "@/hooks/useMyFeed"

export const MyFeedContainer = () => {
    const { myFeed, loadMore, loading, error } = useMyFeed()

    return (
        <PostContainer postsData={myFeed} loadMore={loadMore} loading={loading} error={error} />
    )
}