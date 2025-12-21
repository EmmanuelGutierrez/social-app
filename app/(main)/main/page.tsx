import { CreatePostForm } from "@/components/post/create-post-form";
import { MyFeedContainer } from "@/components/post/my-feed-container";
import { NewPostsNotification } from "@/components/post/new-posts-notification";

export default function MainPage() {
  return (
    <>
      <CreatePostForm />
      <NewPostsNotification />
      <MyFeedContainer />
    </>
  )
}
