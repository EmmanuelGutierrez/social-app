"use client";

import { useEffect, useEffectEvent, useState } from "react";
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import Image from "next/image";
import { usePost } from "@/hooks/usePost";
import { useRefetch } from "@/hooks/useRefetch";
import { SlidingCounter } from "../common/SlidingCounter";
import { MyFeedQuery, PostFragmentFragmentDoc } from "@/graphql/types/graphql";
import { useLikesCount } from "@/hooks/useLikesCount";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ImageLightbox } from "./ImageLightbox";
import { useFragment } from "@/graphql/types";


interface PostDisplayProps {
  postData: MyFeedQuery["myFeed"]["data"][number]
  variant?: "default" | "compact"
}

export default function PostDisplay({
  postData: { iLiked, replyCount, post: postRaw }, variant = "default"
}: PostDisplayProps) {
  const post = useFragment(PostFragmentFragmentDoc, postRaw)
  const router = useRouter()
  const { dislikePost, likePost, likePostLoading, dislikePostLoading } = usePost()
  const [userReaction, setUserReaction] = useState<boolean>(
    iLiked
  );
  const { likesCountData, refetch } = useLikesCount(postRaw._id)
  const [likeCount, setLikeCount] = useState<number>(likesCountData?.getLikesCount || 0)
  const ref = useRefetch({ refetch })

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxInitialIndex, setLightboxInitialIndex] = useState(0)

  const updateLikeCount = useEffectEvent((newValue: number) => {
    setLikeCount(newValue)
  })

  useEffect(() => {
    if (likesCountData) {
      updateLikeCount(likesCountData.getLikesCount)
    }
  }, [likesCountData])

  const handleReaction = async () => {
    // setUserReaction(prev => !prev)
    if (!dislikePostLoading && !likePostLoading) {
      if (!userReaction) {
        const res = await likePost(postRaw._id)
        if (res.data && !res.data?.likePost.ignored) {
          setUserReaction(true)
          setLikeCount(prev => prev + 1)
        }
      } else {
        const res = await dislikePost(postRaw._id)
        if (res.data && !res.data?.dislikePost.ignored) {
          setUserReaction(false)
          setLikeCount(prev => prev - 1)
        }
      }
    }
  };
  const handlePostClick = () => {
    router.push(`/post/${postRaw._id}`)
  }

  const handleImageClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setLightboxInitialIndex(index)
    setLightboxOpen(true)
  }

  const handleRedirectUserProfile = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/profile/${post.authorId.username}`)
  }

  return (
    <>
      <Card ref={ref} onClick={handlePostClick} className={`w-full hover:bg-primary-darker/50 transform 
    delay-75 hover:shadow-lg transition-all cursor-pointer duration-200 border border-primary/20  
    ${variant === "compact" ? "py-1" : "py-4"} gap-0 flex flex-row mt-8 rounded-sm my-6`} >
        <div className={`${variant === "compact" ? "py-2" : "py-4"} pl-4`}>
          <Avatar onClick={handleRedirectUserProfile} className="h-10 w-10">
            <AvatarImage className="object-cover"
              src={post.authorId.profileImg?.secure_url || "/placeholder.svg"}
              alt={post.authorId.name}
              width={48}
              height={48}
            />
            <AvatarFallback>{post.authorId.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="min-w-0 w-full">
          {/* Header */}
          <div className={`${variant === "compact" ? "py-2" : "py-4"} p-4 flex  items-start justify-between`}>
            <div className="flex gap-3 flex-1">

              <div className="flex-1">
                <div onClick={handleRedirectUserProfile} className="flex items-center gap-2">
                  <h3 className="font-semibold ">{post.authorId.name}</h3>
                  {post.authorId.username && (
                    <span className="text-sm text-muted-foreground">
                      @{post.authorId.username}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                    locale: es,
                  })}
                </p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-primary-darker" align="end">
                <DropdownMenuItem>Editar</DropdownMenuItem>
                <DropdownMenuItem>Reportar</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Content */}
          <div className="px-4 py-0 space-y-3 w-full">
            {post.title && <h2 className="text-lg font-bold ">{post.title}</h2>}
            <p className={`${variant === "compact" ? "pt-1 pb-2" : "pt-2 pb-4 "} 
          font-normal leading-relaxed whitespace-pre-wrap wrap-break-word text-sm`}>{post.body}</p>
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Images Grid */}
          {post.images && post.images.length > 0 && (
            <div
              className={`mt-4 grid gap-1 mr-14 rounded-xl overflow-hidden ${post.images.length === 1 ? "grid-cols-1" : "grid-cols-2"
                }`}
            >
              {post.images.slice(0, 4).map((image, index) => (
                <motion.div
                  key={index}
                  className={`relative bg-muted overflow-hidden cursor-pointer ${post.images!.length === 1
                    ? "aspect-16/10 rounded-xl"
                    : post.images!.length === 2
                      ? "aspect-4/3"
                      : post.images!.length === 3 && index === 0
                        ? "row-span-2 aspect-auto h-full"
                        : "aspect-square"
                    } ${post.images!.length > 1 && index === 0 ? "rounded-tl-xl" : ""} ${post.images!.length > 1 && index === 1 ? "rounded-tr-xl" : ""
                    } ${post.images!.length > 2 && index === 2 ? "rounded-bl-xl" : ""} ${post.images!.length > 2 && index === 3 ? "rounded-br-xl" : ""
                    } ${post.images!.length === 2 && index === 0 ? "rounded-l-xl" : ""} ${post.images!.length === 2 && index === 1 ? "rounded-r-xl" : ""
                    }`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => handleImageClick(index, e)}
                >
                  <Image src={image.secure_url || "/placeholder.svg"} alt="" className="w-full h-full object-cover" fill />
                </motion.div>
              ))}
            </div>
          )}


          {/* Actions */}
          <div className={`px-4 ${variant === "compact" ? "py-2" : "py-4"} flex items-center justify-start gap-4 relative hover:none`}>
            {/* Like Button with Reaction Popup */}
            <div className="relative group">
              <Button
                variant={"normal"}
                size="sm"
                className={`gap-2  hover:text-pink-600 hover:bg-pink-800/20 ${userReaction ? " text-pink-600" : ""}`}
                onClick={(e) => { e.stopPropagation(); return handleReaction() }}
              >
                <Heart
                  className={`size-5 ${userReaction ? "fill-current" : ""
                    }`}
                />
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <SlidingCounter value={likeCount || 0} />

                </span>
              </Button>

            </div>

            {/* Comment Button */}
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-sm"
              onClick={(e) => { e.stopPropagation(); }}
            >
              <MessageCircle className="size-5" />
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                {replyCount || 0}
              </span>
            </Button>
          </div>
        </div>
        {/* ImageLightbox component */}

      </Card>{
        post.images && post.images.length > 0 && (
          <ImageLightbox
            images={post.images}
            initialIndex={lightboxInitialIndex}
            isOpen={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
          />
        )
      }
    </>
  );
}
