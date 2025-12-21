'use client'
import { PostContainer } from "./post-container"
import { useMyFeed } from "@/hooks/useMyFeed"

export const MyFeedContainer = () => {
    const { myFeed, loadMore, loading } = useMyFeed()

    return (
        <PostContainer postsData={myFeed?.myFeed} loadMore={loadMore} loading={loading} />
    )
}