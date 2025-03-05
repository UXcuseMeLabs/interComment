'use client';
import { useUser } from "@/context/userProvider";
import { createBoard, getBoardByTwichId } from "@/core/board/service/boardService";
import { Board } from "@/core/board/type";
import { getUserByTwitchId } from "@/core/comment/service/commentService";
import localFont from "next/font/local";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const cabinet = localFont({
  src: '../../public/fonts/CabinetGrotesk-Variable.woff2',
})

export default function Home() {
  const {user} = useUser();
  const [board, setBoard] = useState<Board|null| undefined>(undefined);
  const router = useRouter()

  const handleCreateBoard = async () => {
    try {
      console.log('userid', user?.id);
      const userBD = await getUserByTwitchId(user?.id ?? '');
      await createBoard({
      name : 'Tablero de ' + user?.displayName,
      user_id: userBD?.id ?? '',
      isLocked: false,
      background: '',
      theme_id: '896d015a-1beb-4e3a-b136-6381428fa740'
  
      });
      toast.success('Tablero creado con éxito 🎉');
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('Ocurrió un error al crear el tablero',);
      
    }
  }

  useEffect(() => {
    const init = async () => {
      if (!user) return;
      const board = await getBoardByTwichId(user?.displayName ?? '');
      setBoard(board);
    }
    init();
  }, [user])
  

  return (
    <main className="max-w-screen-md mx-auto">
      <h1 className={`text-5xl font-black ${cabinet.className} mb-10`}>Crea tu propio tablero de <span className="text-purple-700">ideas</span></h1>
      {
        (board !== undefined && board) ? <Link href={`/board/${user?.displayName} `}>Ir a mi tablero</Link> : (
          user && <button onClick={handleCreateBoard} className="bg-purple-700 text-white p-2 rounded-md">Crear tablero</button>
        )
      }
    </main>
  );
}
