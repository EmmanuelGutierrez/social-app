'use client'
import { useSuggestedUsers } from "@/hooks/useSuggestedUsers";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Loader2 } from "lucide-react";
import { useFollow } from "@/hooks/useFollow";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SuggestedUsers() {
    const router = useRouter()

    const { suggestedUsers, suggestedUsersLoading } = useSuggestedUsers()
    const { followUser, followLoading } = useFollow()
    const [followingUsers, setFollowingUsers] = useState<string[]>([])

    const handleFollow = async (userId: string) => {
        const res = await followUser(userId)
        if (res?.followUser) {
            setFollowingUsers((prev) => [...prev, userId])
        }
    }

    const handleRedirectUserProfile = (username: string) => (e: React.MouseEvent) => {
        e.stopPropagation()
        router.push(`/profile/${username}`)
    }

    return (
        <div className="sticky top-4 h-fit">
            {suggestedUsersLoading ? <div className="flex justify-center items-center">
                <Loader2 className="animate-spin" />
            </div> : suggestedUsers?.suggestedUsers?.length === 0 ? <p>No hay sugerencias</p> : <div>
                <Card className="border-border/20 ">
                    <CardHeader>
                        <h3 className="font-semibold text-lg">Sugerencias para ti</h3>
                    </CardHeader>
                    <CardContent>
                        {suggestedUsers?.suggestedUsers?.map((user) =>
                            <div key={user._id} className="my-4 space-x-4 flex bg-primary-dark/25 p-2 rounded-4xl justify-center items-center">
                                <Avatar className="cursor-pointer" onClick={handleRedirectUserProfile(user.username)}>
                                    <AvatarImage src={user.profileImg?.secure_url} alt={user.name} />
                                    <AvatarFallback>{`${user.name.charAt(0).toUpperCase()}${user.lastname.charAt(0).toUpperCase()}`}</AvatarFallback>
                                </Avatar>
                                <div className="cursor-pointer" onClick={handleRedirectUserProfile(user.username)}>
                                    <p className="font-semibold">{user.name}</p>
                                    <p className="text-xs text-muted-foreground">@{user.username}</p>
                                </div>
                                <Button disabled={followLoading || followingUsers.includes(user._id)}
                                    onClick={() => handleFollow(user._id)} variant="default" className={`ml-auto rounded-4xl ${followingUsers.includes(user._id) ? "bg-primary/20" : ""}`}>
                                    {followingUsers.includes(user._id) ? "Siguiendo" : "Seguir"}
                                </Button>
                            </div>)}
                    </CardContent>
                </Card>
            </div>}
        </div>
    )
}