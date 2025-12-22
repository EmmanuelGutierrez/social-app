"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"

export default function UserCard() {
    const { user } = useAuth()
    return (
        <>
            {user ? <Card className="sticky top-4 h-fit border-border/20">
                <CardHeader className="space-y-4">
                    <div className="flex flex-col items-center text-center">
                        <Avatar className="h-20 w-20 mb-3">
                            <AvatarImage className="object-cover" src={user?.profileImg?.secure_url || "/placeholder.svg"} alt={user?.name} />
                            <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <Link href={`/profile/${user?.username}`} className="hover:underline">
                            <h3 className="font-semibold text-lg">{user?.name}</h3>
                        </Link>
                        <p className="text-sm text-muted-foreground">@{user?.username}</p>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* {user.bio && <p className="text-sm text-muted-foreground text-center">{user.bio}</p>} */}

                    <div className="flex justify-around py-3 border-t border-border/20">
                        <div className="text-center">
                            <p className="text-2xl font-bold">{user.followersCount}</p>
                            <p className="text-xs text-muted-foreground">Seguidores</p>
                        </div>
                        <div className="h-auto w-px bg-border/20" />
                        <div className="text-center">
                            <p className="text-2xl font-bold">{user.followingCount}</p>
                            <p className="text-xs text-muted-foreground">Siguiendo</p>
                        </div>
                    </div>

                    {/* <Button asChild className="w-full bg-transparent" variant="outline">
                        <Link href={`/profile/${user.username}`}>Ver perfil</Link>
                    </Button> */}
                </CardContent>
            </Card> : <></>}
        </>
    )
}
