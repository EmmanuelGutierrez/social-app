"use client"

import { useState, useEffect, useRef, useEffectEvent } from "react"
import { useParams, useRouter } from "next/navigation"
import PostDisplay from "@/components/post/post-display"
// import { PostCreator } from "@/components/post/post-creator"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { useApp } from "@/hooks/useApp"
import { usePost } from "@/hooks/usePost"
import { CreatePostForm } from "@/components/post/create-post-form"
import { Separator } from "@/components/ui/separator"


export default function VogelPostDetailPage() {
    const params = useParams()
    const router = useRouter()
    const postId = params.id as string
    const mainPostRef = useRef<HTMLDivElement>(null)


    // const { isLoading } = useApp()
    const { getPostAndAllComments, postAndAllComments, postAndAllCommentsLoading,
        getComments, commentsLoading } = usePost()
    const getPostData = useEffectEvent((postId: string) => {
        getPostAndAllComments(postId)
    })

    useEffect(() => {
        getPostData(postId)
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

    const loadMoreReplies = async () => {
        if (postAndAllComments?.replies.nextCursor) {
            await getComments(postId, postAndAllComments?.replies.nextCursor)
        }
    }

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
                    <CreatePostForm replyTo={postAndAllComments.post.post._id} />
                </div>

                {/* Replies Section */}
                {postAndAllComments.replies.data.length > 0 && (
                    <div>
                        <h2 className="text-lg font-semibold text-foreground mb-4">Replies</h2>

                        <div className="space-y-4">
                            <AnimatePresence mode="popLayout">
                                {postAndAllComments.replies.data.map((reply, index) => (
                                    <motion.div
                                        key={reply.post._id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >

                                        <div className="flex">
                                            {/* <div className="min-h-0">
                                                <Separator orientation="vertical" className=" ml-8 mr-3" />
                                            </div> */}
                                            <PostDisplay postData={reply} variant="compact" />
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {postAndAllComments.replies.hasMore && (
                            <div className="mt-6 flex justify-center">
                                <Button
                                    variant="outline"
                                    onClick={loadMoreReplies}
                                    disabled={commentsLoading}
                                    className="rounded-full border-border text-foreground hover:bg-muted bg-transparent"
                                >
                                    {commentsLoading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                            Cargando...
                                        </>
                                    ) : (
                                        "Mostrar más respuestas"
                                    )}
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </main>}
        </div>
    )
}