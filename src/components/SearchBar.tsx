'use client';
import { useUser } from '@/context/userProvider';
import { createComment, createUser, getUserByTwitchId } from '@/core/comment/service/commentService';
import { Comment } from '@/core/comment/type';
import { useRouter } from 'next/navigation';
import React, { useActionState, useEffect, useRef } from 'react'
import { toast } from 'sonner';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Filter } from 'lucide-react';

interface CommentFormState {
  comment: string;

}

const handleSubmit = async (
  previousState: CommentFormState | undefined,
  formData: FormData
): Promise<CommentFormState> => {
  const comment = formData.get('comment') as string;
  return { comment };
};

interface SearchBarProps {
  board_id: string;
}


export function   SearchBar({board_id}: SearchBarProps) {
  const [state, formAction] = useActionState(handleSubmit, {
    comment: '',
  });
  const {user} = useUser();
  const router = useRouter()
  const isFirstRender = useRef(true);
  useEffect(() => {
   const init = async () => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Marcar como inicializado después del primer render
      return;
    }
    const comment: Comment = {
      comment: state.comment,
      user_id: user?.id ?? '',
      username: user?.displayName ?? '',
      createdAt: new Date().toDateString(),
      board_id: board_id
    };

    if (state.comment.length > 0 && user?.id) {
      let user = await getUserByTwitchId(comment.user_id);
      if (!user) {
        user = await createUser(comment.user_id);
      }
      comment.user_id = user.id;
      await createComment(comment);
      router.refresh()
    } else {
      toast.error('Necesitas ingresar con tu cuenta de twitch para comentar')
    }
   }
    init();
  }, [state.comment]);

  // TODO: Implementar bien la logica para eliminar comentarios por un usuario administrador o similar
  // const handleDeleteaAllComments = async () => {
  //    await deleteComments()
  //    router.refresh();
  // }

  return (
      <>
      {/* <button onClick={() => handleDeleteaAllComments()}>Eliminar los comentarios</button> */}
          <form action={formAction} className='w-full flex relative'>
        <input
        name='comment'
        className='h-16 p-4 py-2 border-b bg-transparent flex-1 border-paragraph/60 text-xl text-paragraph/60 rounded-md'
        type="text" placeholder="Escribe tu idea... max 50 caracteres" />
        <Popover>
          <PopoverTrigger className='absolute right-3 top-1/3 font-bold text-sm flex items-center gap-2'>Filtrar por <Filter size={20}/></PopoverTrigger>
            <PopoverContent>Place content for the popover here.</PopoverContent>
          </Popover>
    </form>
      </>
  )
}
