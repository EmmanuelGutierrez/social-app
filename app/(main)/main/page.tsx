import { CreatePostForm } from "@/components/post/create-post-form";

export default function MainPage() {
  return (
    <main className="grid grid-cols-9 max-w-full">
      <div
        className="col-start-1 col-end-10 md:col-start-2 md:col-end-9 
      lg:col-start-3 lg:col-end-8 h-full border-x border-border/20
      *:border-b *:border-border/20 *:py-8
      "
      >
        <CreatePostForm />
      </div>
    </main>
  );
}
