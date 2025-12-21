"use client"
import { useParams, } from "next/navigation"

import { PostDetail } from "@/components/post/post-detail"


export default function VogelPostDetailPage() {
    const params = useParams()
    const postId = params.id as string


    return <PostDetail postId={postId} />
}