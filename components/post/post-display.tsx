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
import { MyFeedQuery } from "@/graphql/types/graphql";
import { useLikesCount } from "@/hooks/useLikesCount";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";

interface PostDisplayProps {
  postData: MyFeedQuery["myFeed"]["data"][number]
  variant?: "default" | "compact"
}

export default function PostDisplay({
  postData: { iLiked, post, replyCount }, variant = "default"
}: PostDisplayProps) {
  const router = useRouter()
  const { dislikePost, likePost, likePostLoading, dislikePostLoading } = usePost()
  const [userReaction, setUserReaction] = useState<boolean>(
    iLiked
  );
  const { likesCountData, refetch } = useLikesCount(post._id)
  const [likeCount, setLikeCount] = useState<number>(likesCountData?.getLikesCount || 0)
  const ref = useRefetch({ refetch })


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
        const res = await likePost(post._id)
        if (res.data && !res.data?.likePost.ignored) {
          setUserReaction(true)
          setLikeCount(prev => prev + 1)
        }
      } else {
        const res = await dislikePost(post._id)
        if (res.data && !res.data?.dislikePost.ignored) {
          setUserReaction(false)
          setLikeCount(prev => prev - 1)
        }
      }
    }
  };
  const handlePostClick = () => {
    router.push(`/post/${post._id}`)
  }

  return (
    <Card ref={ref} onClick={handlePostClick} className={`w-full hover:bg-primary-darker/50 transform 
    delay-75 hover:shadow-lg transition-all cursor-pointer duration-200 border border-primary/20  
    ${variant === "compact" ? "py-1" : "py-4"} gap-0 flex flex-row mt-8 rounded-sm my-6` } >
      <div className={`${variant === "compact" ? "py-2" : "py-4"} pl-4`}>
        <Avatar className="h-10 w-10">
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
              <div className="flex items-center gap-2">
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
            className={`px-4 pb-4 grid gap-2 ${post.images.length === 1
              ? "grid-cols-1"
              : post.images.length === 2
                ? "grid-cols-2"
                : post.images.length === 3
                  ? "grid-cols-3"
                  : "grid-cols-2"
              }`}
          >
            {post.images.map((image, index) => (
              <div
                key={index}
                className="relative bg-muted rounded-lg overflow-hidden aspect-square"
              >
                <Image
                  height={500}
                  width={500}
                  src={image.secure_url || "/placeholder.svg"}
                  alt={`Post image ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
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
    </Card>
  );
}
