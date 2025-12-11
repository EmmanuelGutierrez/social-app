import { CreatePostForm } from "@/components/post/create-post-form";
import { PostContainer } from "@/components/post/post-container";

export default function MainPage() {
  return (
    <>
      <CreatePostForm />
      <PostContainer />
    </>
  )
}
