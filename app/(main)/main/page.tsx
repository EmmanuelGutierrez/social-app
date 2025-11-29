import { CreatePostForm } from "@/components/post/create-post-form";
import { PostContainer } from "@/components/post/post-container";

export default function MainPage() {
  return (
    <main className="grid grid-cols-9 max-w-full">
      <div
        className="col-start-1 col-end-10 md:col-start-2 md:col-end-9 
      lg:col-start-3 lg:col-end-8 xl:col-start-4 xl:col-end-7 h-full border-x border-border/20
      *:border-b *:border-border/20 *:py-8 *:px-8
      "
      >
        <CreatePostForm />
        <PostContainer />
      </div>
    </main>
  );
}
