import { CreatePostForm } from "@/components/post/create-post-form";
import { NewPostsNotification } from "@/components/post/new-posts-notification";
import { PostContainer } from "@/components/post/post-container";

export default function MainPage() {
  return (
    <>
      <CreatePostForm />
      <NewPostsNotification />
      <PostContainer />
    </>
  )
}
