import CommentCard from "@/components/CommentCard";
import { SearchBar } from "@/components/SearchBar"
import SwitchEnableComments from "@/components/SwitchEnableComments";
import { getComments } from "@/core/comment/service/commentService";
import { Comment } from "@/core/comment/type";

export default async function Home() {
  const comments = await getComments();

  return (
    <main className="p-4 mt-20 max-w-screen-xl mx-auto">
      <SwitchEnableComments/>
      <SearchBar />
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {comments.map((comment: Comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </section>
    </main>
  );
}
