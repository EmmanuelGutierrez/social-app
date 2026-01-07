'use client'
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { AnimatePresence, motion } from "motion/react"
import { useNotification } from "@/hooks/useNotifications"
import { useNotificationSubscription } from "@/hooks/useNotificationSubscription"
import { useEffect } from "react"
import { usePost } from "@/hooks/usePost"

export const NewPostsNotification = () => {
    const { notifications, setNewNotificationsData, setNotifications, clearsetNewNotificationsData } = useNotification()
    const { getPostsByIds, getPostsByIdsLoading } = usePost()
    useNotificationSubscription((data) => {
        console.log('res',data.data)
        if (data.data?.subNewPosts) {
            setNewNotificationsData({
                authorId: data.data.subNewPosts.authorId,
                authorProfileImg: data.data.subNewPosts.authorProfileImg || undefined,
                authorUsername: data.data.subNewPosts.authorUsername,
                postId: data.data.subNewPosts.postId,
            })
        }
    })

    useEffect(() => {
        const id = setInterval(() => {
            console.log('setNotifications')
            setNotifications()
        }, 1000 * 60);
        return () => clearInterval(id);
    }, [])

    const handleClose = async () => {
        await getPostsByIds(notifications.map((notification) => notification.postId))
        clearsetNewNotificationsData()
    }

    return (
        <div className="flex justify-center ">
            <AnimatePresence mode="popLayout">
                {notifications.length > 0 && <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    exit={{ opacity: 0, y: -20 }}
                >

                    <div className="relative">
                        <Button disabled={getPostsByIdsLoading} onClick={handleClose} className=" bg-primary-dark absolute h-15 w-72 top-0 -right-36 rounded-4xl">
                            <p>Nuevos posts: </p>
                            <div className="*:data-[slot=avatar]:ring-background flex -space-x-3 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                                {notifications.slice(0, 3).map((notification, i) => (
                                    <Avatar key={notification.postId} className="h-10 w-10">
                                        <AvatarImage src={notification.authorProfileImg} alt={notification.authorUsername} />
                                        <AvatarFallback>{notification.authorUsername[0]}</AvatarFallback>
                                    </Avatar>
                                ))}

                            </div>
                            <p>{notifications.length > 3 ? `+${notifications.length - 3}` : ""}</p>
                        </Button>
                    </div>
                </motion.div>}
            </AnimatePresence>
        </div>
    )
}