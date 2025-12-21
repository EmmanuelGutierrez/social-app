import Image from "next/image"
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog"
import { useEffect, useRef, useState } from "react"
import { useMultimediaPosts } from "@/hooks/useMultimediaPosts"
import { PostDetail } from "./post-detail"
import { Loader2 } from "lucide-react"

export const MultimediaPost = ({ username }: { username: string }) => {
    const [postId, setPostId] = useState<string | null>(null)
    const loaderRef = useRef<HTMLDivElement>(null)
    // const { postsData, loadMore, loading } = useMyFeed();

    const { loadMoreMultimediaPosts, multimediaPosts, multimediaPostsLoading } = useMultimediaPosts(username)

    useEffect(() => {
        const element = loaderRef.current
        if (!element) {
            return
        }
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadMoreMultimediaPosts()
            }
        })
        observer.observe(element)
        return () => {
            observer.unobserve(element)
        }
    }, [loadMoreMultimediaPosts, multimediaPosts?.userPosts.nextCursor])
    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 ">
                {multimediaPosts?.userPosts.data
                    .map((post, idx) => {
                        return <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer">
                            <Image
                                src={post.post?.images![0].secure_url || "/placeholder.svg"}
                                alt=""
                                onClick={() => setPostId(post.post?._id)}
                                width={400}
                                height={400}
                                className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                            />
                        </div>
                    })}

                <Dialog open={postId !== null} onOpenChange={open => !open && setPostId(null)}>
                    <DialogTitle></DialogTitle>
                    <DialogContent className="border-primary-dark/20 p-10">
                        <div className=" ">
                            {postId && <PostDetail postId={postId} />}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div ref={loaderRef} className="flex justify-center py-8">
                {(!multimediaPosts || (multimediaPosts.userPosts?.hasMore && multimediaPostsLoading)) && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <span>Cargando más archivos...</span>
                    </div>
                )}

                {
                    !multimediaPostsLoading && (!multimediaPosts || !multimediaPosts.userPosts?.hasMore && multimediaPosts.userPosts?.data.length > 0) && (
                        <div className="text-center text-muted-foreground">No hay más archivos para mostrar</div>
                    )}
            </div>
        </>
    )
}