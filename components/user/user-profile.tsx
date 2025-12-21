"use client"

import { useState, useEffect, useEffectEvent } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Pencil, UserPlus, UserMinus, Upload, Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/useAuth"
import { useUserPosts } from "@/hooks/useUserPost"
import { useUserByUsername } from "@/hooks/useUserByUsername"
import { PostContainer } from "../post/post-container"
import { useFollow } from "@/hooks/useFollow"
import { toastCustom } from "@/lib/toastCustom"
import { useLikedPosts } from "@/hooks/useLikedPosts"
import { MultimediaPost } from "../post/multimedia-post"

export default function UserProfile({ username }: { username: string }) {

    const [isFollowing, setIsFollowing] = useState(false)
    // const [isEditing, setIsEditing] = useState(false)
    const { userData, userLoading } = useUserByUsername(username)
    const { loadMore, userPosts, userPostsLoading } = useUserPosts(username)
    const { loadMoreLikedPosts, likedPosts, likedPostsLoading } = useLikedPosts(username)
    const { followUser, unfollowUser, followLoading, unfollowLoading } = useFollow()
    const { user: currentUser } = useAuth()
    // Simulated current user - replace with real auth
    const isOwnProfile = username === currentUser?.username
    const [isEditing, setIsEditing] = useState(false)

    const handleIsFollowing = useEffectEvent(() => {
        if (userData) {
            setIsFollowing(userData.isFollowing)
        }
    })

    useEffect(() => {
        handleIsFollowing()
    }, [userData])

    if (!userData || !userData.user || userLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-muted-foreground">
                    <Loader2 className="animate-spin" />
                </div>
            </div>
        )
    }

    const handleFollowToggle = async () => {
        try {
            if (isFollowing) {
                await unfollowUser(userData.user._id)
            } else {
                await followUser(userData.user._id)
            }
            setIsFollowing(!isFollowing)
        } catch (error) {
            console.log(error)
            toastCustom.error("Error al seguir", "Error al seguir")
        }
    }

    const handleBannerUpload = () => {
        console.log("Banner upload clicked")
    }



    return (
        <div className="min-h-screen">
            {/* Banner */}
            <div className="relative h-48 md:h-64 bg-linear-to-r from-primary to-primary-dark overflow-hidden group">
                {/* <Image src={"/placeholder.svg"} alt="Banner" fill className="object-cover" /> */}
                {isOwnProfile && (
                    <Button
                        size="sm"
                        variant="secondary"
                        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={handleBannerUpload}
                    >
                        <Upload className="h-4 w-4 mr-2" />
                        Cambiar banner
                    </Button>
                )}
            </div>

            {/* Profile Header */}
            <div className="max-w-5xl mx-auto px-4">
                <div className="relative">
                    {/* Avatar */}
                    <div className="absolute -top-16 md:-top-20">
                        <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-background">
                            <AvatarImage className="object-cover" src={userData.user.profileImg?.secure_url || "/placeholder.svg"} alt={userData.user.name} />
                            <AvatarFallback className="text-4xl">{userData.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end pt-4 gap-2">
                        {isOwnProfile ? (
                            <Button variant="outline" onClick={() => setIsEditing(!isEditing)} >
                                <Pencil className="h-4 w-4 mr-2" />
                                Editar perfil
                            </Button>
                        ) : (
                            <Button disabled={followLoading || unfollowLoading} className="rounded-full" onClick={handleFollowToggle} variant={"default"}>
                                {isFollowing ? (
                                    <>
                                        <UserMinus className="h-4 w-4 mr-2" />
                                        Dejar de seguir
                                    </>
                                ) : (
                                    <>
                                        <UserPlus className="h-4 w-4 mr-2" />
                                        Seguir
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </div>

                {/* User Info */}

                <div className="mt-6 space-y-4">
                    <div>
                        <h1 className="text-3xl font-bold">{userData.user.name}</h1>
                        <p className="text-muted-foreground">@{userData.user.username}</p>
                    </div>

                    {userData.user.bio && <p className="text-foreground">{userData.user.bio}</p>}

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        {/* {userData.user.location && <span>📍 {userData.user.location}</span>}
                        {userData.user.website && (
                            <Link href={userData.user.website} target="_blank" className="hover:text-primary hover:underline">
                                🔗 {userData.user.website}
                            </Link>
                        )} */}
                        <span>📅 Se unió en {new Date(userData.user.createdAt).toLocaleDateString("es", { month: "long", year: "numeric" })}</span>
                    </div>

                    <div className="flex gap-6 text-sm">
                        <button className="hover:underline">
                            <span className="font-bold text-foreground">{userData.user.followingCount}</span>
                            <span className="text-muted-foreground"> Siguiendo</span>
                        </button>
                        <button className="hover:underline">
                            <span className="font-bold text-foreground">{userData.user.followersCount}</span>
                            <span className="text-muted-foreground"> Seguidores</span>
                        </button>
                    </div>
                </div>
                {/* Edit Profile Form */}
                {isEditing && (
                    <Card className="mt-6 p-6">
                        <h2 className="text-xl font-bold mb-4">Editar perfil</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Nombre</label>
                                <input
                                    type="text"
                                    defaultValue={userData.user.name}
                                    className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Biografía</label>
                                <textarea
                                    value={userData.user.bio || ""}
                                    rows={3}
                                    className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
                                />
                            </div>
                            {/* <div>
                                <label className="text-sm font-medium">Ubicación</label>
                                <input
                                    type="text"
                                    defaultValue={userData.user.location}
                                    className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
                                />
                            </div> */}
                            <div className="flex gap-2 justify-end">
                                <Button variant="outline" onClick={() => setIsEditing(false)}>
                                    Cancelar
                                </Button>
                                <Button onClick={() => setIsEditing(false)}>Guardar cambios</Button>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Tabs */}
                <Tabs defaultValue="posts" className="mt-8">
                    <TabsList>
                        <TabsTrigger value="posts">Posts</TabsTrigger>
                        <TabsTrigger value="media">Multimedia</TabsTrigger>
                        <TabsTrigger value="likes">Me gusta</TabsTrigger>
                    </TabsList>

                    <TabsContent value="posts" className="space-y-4 mt-6">
                        <PostContainer postsData={userPosts?.userPosts} loadMore={loadMore} loading={userPostsLoading} />
                    </TabsContent>

                    <TabsContent value="media" className="mt-6">
                        <MultimediaPost username={username} />
                    </TabsContent>

                    <TabsContent value="likes" className="mt-6">
                        <p className="text-center text-muted-foreground py-8">Los posts que le gustan a {userData.user.name}</p>
                        <PostContainer postsData={likedPosts?.likedPosts} loadMore={loadMoreLikedPosts} loading={likedPostsLoading} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
