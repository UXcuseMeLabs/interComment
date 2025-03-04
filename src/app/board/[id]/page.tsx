import { CommentCard } from "@/components/CommentCard";
import { SearchBar } from "@/components/SearchBar";
import { getBoardByTwichId } from "@/core/board/service/boardService";
import { Comment } from "@/core/comment/type";
import { generatePaletteColors } from "@/utils/generatePaletteColors";
import localFont from "next/font/local";

const cabinet = localFont({
  src: '../../../../public/fonts/CabinetGrotesk-Variable.woff2',
})

export const dynamic = "force-dynamic";
export default async function BoardUser({params}: {params: Promise<{ id: string }>}) {
  const { id } = await params;
  const board = await getBoardByTwichId(id)
  const palette = generatePaletteColors(board?.theme.color);

  //last word separated in array
  const lastWord = board?.name.split(' ').pop()
  const boardTitle = board?.name.replace(lastWord!, '');

  return (    <main className="max-w-screen-md mx-auto">
        <h1 className={`text-5xl  font-black ${cabinet.className} mb-10`}>{boardTitle} <span style={{color: palette[500]}}>{lastWord}</span></h1>
        <SearchBar board_id={board?.id} />
      <section className="flex flex-col gap-3 mt-8">
        {board?.interComments.map((comment: Comment, index) => (
          <CommentCard theme={board.theme} isEven={index % 2 == 0} key={comment.id} comment={comment} />
        ))}
      </section>
      </main>)
}