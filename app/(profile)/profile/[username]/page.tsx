import UserProfile from "@/components/user/user-profile"

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params
    return <UserProfile username={username} />
}