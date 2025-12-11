"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import PostDisplay from "@/components/post/post-display"
// import { PostCreator } from "@/components/post/post-creator"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { useApp } from "@/hooks/useApp"
import { usePost } from "@/hooks/usePost"
import { CreatePostForm } from "@/components/post/create-post-form"


export default function VogelPostDetailPage() {
    const params = useParams()
    const router = useRouter()
    const postId = params.id as string
    const mainPostRef = useRef<HTMLDivElement>(null)

    const [loadingMoreReplies, setLoadingMoreReplies] = useState(false)
    const [hasMoreReplies, setHasMoreReplies] = useState(true)
    const [showMoreParents, setShowMoreParents] = useState(false)

    // const { isLoading } = useApp()
    const { getPostAndAllComments, postAndAllComments,postAndAllCommentsLoading } = usePost()
    useEffect(() => {
        getPostAndAllComments(postId)
    }, [postId])

    // useEffect(() => {
    //     if (!loading && mainPost && mainPostRef.current) {
    //         const timeout = setTimeout(() => {
    //             mainPostRef.current?.scrollIntoView({
    //                 behavior: "smooth",
    //                 block: "center",
    //             })
    //         }, 100)
    //         return () => clearTimeout(timeout)
    //     }
    // }, [loading, mainPost])

    // const loadMoreReplies = async () => {
    //     setLoadingMoreReplies(true)
    //     await new Promise((resolve) => setTimeout(resolve, 500))
    //     const newReplies = generateReplies(postId, 4)
    //     setReplies((prev) => [...prev, ...newReplies])
    //     if (replies.length >= 12) setHasMoreReplies(false)
    //     setLoadingMoreReplies(false)
    // }

    // const handleNewReply = (content: string, images: string[]) => {
    //     const newReply: VogelPost = {
    //         id: `reply-new-${Date.now()}`,
    //         body: content,
    //         author: {
    //             id: "current",
    //             name: "Tu Usuario",
    //             handle: "tuusuario",
    //             avatar: "/current-user.jpg",
    //             verified: false,
    //         },
    //         createdAt: new Date(),
    //         images: images.length > 0 ? images : undefined,
    //         likes: 0,
    //         comments: 0,
    //         reposts: 0,
    //         parentId: postId,
    //     }
    //     setReplies((prev) => [newReply, ...prev])
    // }
    console.log("postAndAllComments", postAndAllComments,  postAndAllCommentsLoading)

    if (postAndAllCommentsLoading || !postAndAllComments) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-accent" />
                </div>
            </div>
        )
    }

    // if ((!postAndAllComments || !postAndAllComments.post) && !postAndAllCommentsLoading) {
    //     return (
    //         <div className="min-h-screen  flex items-center justify-center">
    //             <div className="text-center">
    //                 <h2 className="text-xl font-bold text-foreground mb-2">Post not found</h2>
    //                 <Button variant="outline" onClick={() => router.back()}>
    //                     Go back
    //                 </Button>
    //             </div>
    //         </div>
    //     )
    // }

    // const visibleParents = showMoreParents ? parentPosts : parentPosts.slice(-2)
    // const hiddenParentsCount = parentPosts.length - 2

    return (
        <div className="h-full">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
                <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-full text-foreground hover:bg-muted"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-xl font-bold text-foreground">Post</h1>
                </div>
            </header>

            {postAndAllComments && <main className="max-w-2xl mx-auto px-4 py-6">
                {/* Parent Posts (Thread above) */}
                {/* parentPosts.length > 0 && (
                    <div className="mb-4">
                        {hiddenParentsCount > 0 && !showMoreParents && (
                            <button
                                onClick={() => setShowMoreParents(true)}
                                className="w-full py-3 text-sm text-accent hover:underline mb-4"
                            >
                                Show {hiddenParentsCount} more {hiddenParentsCount === 1 ? "reply" : "replies"} above
                            </button>
                        )}

                        <div className="space-y-4">
                            <AnimatePresence>
                                {visibleParents.map((parent, index) => (
                                    <motion.div
                                        key={parent.id}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <VogelPostCard post={parent} variant="compact" />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <div className="flex justify-start pl-9 my-2">
                            <div className="w-0.5 h-4 bg-border" />
                        </div>
                    </div>
                ) */}

                {/* Main Post */}
                <motion.div
                    ref={mainPostRef}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mb-3"
                >
                    <PostDisplay postData={postAndAllComments.post} />
                </motion.div>

                {/* Reply Creator */}
                <div className="mb-6">
                    <CreatePostForm />
                </div>

                {/* Replies Section */}
                {/* {replies.length > 0 && (
                    <div>
                        <h2 className="text-lg font-semibold text-foreground mb-4">Replies</h2>

                        <div className="space-y-4">
                            <AnimatePresence mode="popLayout">
                                {replies.map((reply, index) => (
                                    <motion.div
                                        key={reply.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <VogelPostCard post={reply} variant="compact" />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {hasMoreReplies && (
                            <div className="mt-6 flex justify-center">
                                <Button
                                    variant="outline"
                                    onClick={loadMoreReplies}
                                    disabled={loadingMoreReplies}
                                    className="rounded-full border-border text-foreground hover:bg-muted bg-transparent"
                                >
                                    {loadingMoreReplies ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                            Loading...
                                        </>
                                    ) : (
                                        "Show more replies"
                                    )}
                                </Button>
                            </div>
                        )}
                    </div>
                )} */}
            </main>}
        </div>
    )
}