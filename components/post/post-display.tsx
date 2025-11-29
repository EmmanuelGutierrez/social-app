"use client";

import { useState } from "react";
import {
  Heart,
  MessageCircle,
  ThumbsDown,
  Sparkles,
  TrendingUp,
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

export interface User {
  id: string;
  name: string;
  avatar?: string;
  handle?: string;
}

export interface Post {
  __typename?: "Post" | undefined;
  _id: string;
  reactionsCount: number;
  body: string;
  createdAt: number;
  tags: string[];
  title?: string | null | undefined;
  authorId: {
    __typename?: "User" | undefined;
    _id: string;
    username: string;
    name: string;
    lastname: string;
    profileImg?: {
      __typename?: "File" | undefined;
      _id: string;
      secure_url: string;
      public_id: string;
    } | null | undefined;
  };
  images?: {
    __typename?: "File" | undefined;
    _id: string;
    public_id: string;
    secure_url: string;
  }[] | null | undefined;
}
interface PostDisplayProps {
  post: Post;
  iLiked: boolean;
}

// const ReactionIcon = {
//   meGusta: Heart,
//   noMeGusta: ThumbsDown,
//   meEncanta: Sparkles,
//   recomiendo: TrendingUp,
// };

// const reactionConfig = {
//   meGusta: { icon: Heart, label: "Me gusta", color: "text-red-500" },
//   noMeGusta: { icon: ThumbsDown, label: "No me gusta", color: "text-gray-500" },
//   meEncanta: { icon: Sparkles, label: "Me encanta", color: "text-yellow-500" },
//   recomiendo: {
//     icon: TrendingUp,
//     label: "Recomiendo",
//     color: "text-green-500",
//   },
// };

export default function PostDisplay({
  post,
  iLiked,
}: PostDisplayProps) {
  const { dislikePost, likePost, likePostLoading, dislikePostLoading } = usePost()
  const [userReaction, setUserReaction] = useState<boolean>(
    iLiked
  );
  // const [showReactionMenu, setShowReactionMenu] = useState(false);

  const handleReaction = (
  ) => {
    if (!dislikePostLoading && !likePostLoading) {
      if (!userReaction) {
        likePost(post._id)
        setUserReaction(true)
      } else {
        dislikePost(post._id)
        setUserReaction(false)
      }
    }
  };

  // const reactionArray = [
  //   { key: "meGusta", count: post.reactions?.meGusta || 0 },
  //   { key: "meEncanta", count: post.reactions?.meEncanta || 0 },
  //   { key: "recomiendo", count: post.reactions?.recomiendo || 0 },
  //   { key: "noMeGusta", count: post.reactions?.noMeGusta || 0 },
  // ].filter((r) => r.count > 0);

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-200 border-none rounded-sm py-2 gap-0">
      {/* Header */}
      <div className="p-4 border-b border-border/20 flex  items-start justify-between ">
        <div className="flex gap-3 flex-1">
          <Avatar>
            <AvatarImage
              src={post.authorId.profileImg?.secure_url || "/placeholder.svg"}
              alt={post.authorId.name}
            />
            <AvatarFallback>{post.authorId.name.charAt(0)}</AvatarFallback>
          </Avatar>
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
      <div className="p-4 space-y-3">
        {post.title && <h2 className="text-lg font-bold ">{post.title}</h2>}
        <p className="pt-2 pb-4 leading-relaxed whitespace-pre-wrap">{post.body}</p>

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

      {/* Reactions Summary */}
      <div className="px-4 border-t py-4 border-border/20 flex items-center justify-end">
        {/* <div className="flex items-center gap-1">
          {reactionArray.map((reaction) => {
            const Icon =
              ReactionIcon[reaction.key as keyof typeof ReactionIcon];
            const config =
              reactionConfig[reaction.key as keyof typeof reactionConfig];
            return (
              <div
                key={reaction.key}
                className="flex items-center gap-1 text-xs"
              >
                <Icon className={`h-4 w-4 ${config.color}`} />
                <span className="text-muted-foreground">{reaction.count}</span>
              </div>
            );
          })}
        </div> */}
        <span className="text-xs text-muted-foreground">
          {post.reactionsCount} reacción{post.reactionsCount !== 1 ? "es" : ""}
        </span>
      </div>

      {/* Actions */}
      <div className="px-4 py-3 border-t border-border/20 flex items-center justify-start gap-4 relative">
        {/* Like Button with Reaction Popup */}
        <div className="relative group">
          <Button
            variant={userReaction ? "default" : "ghost"}
            size="sm"
            className="gap-2 text-sm"
            onClick={() => handleReaction()}
          >
            <Heart
              className={`h-4 w-4 ${userReaction ? "fill-current" : ""
                }`}
            />
            Me gusta
          </Button>

          {/* <div className="absolute bottom-full left-0 mb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="bg-background border border-border rounded-full shadow-lg p-3 flex gap-2">
              {Object.entries(reactionConfig).map(([key, config]) => {
                const Icon = config.icon;
                const count =
                  post.reactions?.[key as keyof typeof post.reactions] || 0;
                return (
                  <button
                    key={key}
                    className="flex flex-col items-center gap-1 p-2 rounded hover:bg-muted transition-colors"
                    onClick={() =>
                      handleReaction(
                        key as
                          | "meGusta"
                          | "noMeGusta"
                          | "meEncanta"
                          | "recomiendo"
                      )
                    }
                    title={config.label}
                  >
                    <Icon className={`h-5 w-5 ${config.color}`} />
                    <span className="text-xs font-medium ">{count}</span>
                  </button>
                );
              })}
            </div>
          </div> */}
        </div>

        {/* Comment Button */}
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-sm"
          onClick={() => { console.log("comment") }}
        >
          <MessageCircle className="h-4 w-4" />
          Comentar
        </Button>
      </div>

      {/* Comments Section */}
      {/* {post.comments && post.comments.length > 0 && (
        <div className="border-t border-border p-4 space-y-4 bg-muted/30">
          <h4 className="font-semibold text-sm ">
            Comentarios ({post.comments.length})
          </h4>
          <div className="space-y-4">
            {post.comments.map((comment) => (
              <div key={comment.id} className="pl-4 border-l-2 border-border">
                <PostDisplay
                  post={comment}
                  onReact={onReact}
                  onComment={onComment}
                />
              </div>
            ))}
          </div>
        </div>
      )} */}
    </Card>
  );
}
