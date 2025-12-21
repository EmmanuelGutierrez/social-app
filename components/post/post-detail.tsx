"use client"

import { useEffect, useEffectEvent } from "react"
import PostDisplay from "@/components/post/post-display"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { usePost } from "@/hooks/usePost"
import { CreatePostForm } from "@/components/post/create-post-form"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"

export const PostDetail = ({ postId }: { postId: string }) => {

    const router = useRouter()
    // const { isLoading } = useApp()
    const { getPostAndAllComments, postAndAllComments, postAndAllCommentsLoading,
        getComments, commentsLoading, getAncestorsComments, ancestorsCommentsLoading } = usePost()
    const getPostData = useEffectEvent((postId: string) => {
        getPostAndAllComments(postId)
    })

    useEffect(() => {
        getPostData(postId)
    }, [postId])

    const loadMoreReplies = async () => {
        if (postAndAllComments?.replies.nextCursor) {
            await getComments(postId, postAndAllComments?.replies.nextCursor)
        }
    }

    const loadMoreAncestors = async () => {
        if (postAndAllComments?.ancestors.nextCursor) {
            await getAncestorsComments(postAndAllComments.ancestors.nextCursor)
        }
    }

    if (postAndAllCommentsLoading || !postAndAllComments) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-accent" />
                </div>
            </div>
        )
    }

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
                {postAndAllComments.ancestors.data.length > 0 && (
                    <div className="mb-4">
                        {postAndAllComments.ancestors.hasMore && (
                            <div className="mt-6 flex justify-center">
                                <Button
                                    variant="outline"
                                    onClick={loadMoreAncestors}
                                    disabled={ancestorsCommentsLoading}
                                    className="rounded-full border-border text-foreground hover:bg-muted bg-transparent"
                                >
                                    {ancestorsCommentsLoading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                            Cargando...
                                        </>
                                    ) : (
                                        "Mostrar más ancestros"
                                    )}
                                </Button>
                            </div>
                        )}

                        <div className="space-y-4">
                            <AnimatePresence>
                                {postAndAllComments.ancestors.data.map((parent, index) => (
                                    <motion.div
                                        key={parent.post._id}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <PostDisplay postData={parent} variant="compact" />
                                        <div className="flex justify-start pl-9 my-2 w-2 h-6">
                                            <Separator orientation="vertical" />
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>


                    </div>
                )}

                {/* Main Post */}
                <motion.div
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
                        {/* <h2 className="text-lg font-semibold text-foreground mb-4">Replies</h2> */}

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

                                        <div className="flex justify-start pl-9 my-2 w-2 h-4">
                                            <Separator orientation="vertical" className="bg-border/20" />
                                        </div>
                                        <PostDisplay postData={reply} variant="compact" />

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