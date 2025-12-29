import UserProfile from "@/components/user/user-profile"
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
    const { username } = await params
    return {
        title: `${username} | Linka`,
    }
}
export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params
    return <UserProfile username={username} />
}