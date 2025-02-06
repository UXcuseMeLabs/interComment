'use client';
import { useUser } from '@/context/userProvider';
import { createComment, createUser, getUserByTwitchId } from '@/core/comment/service/commentService';
import { Comment } from '@/core/comment/type';
import { useRouter } from 'next/navigation';
import React, { useActionState, useEffect, useRef } from 'react'
import { toast } from 'sonner';

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


export function SearchBar() {
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
      createdAt: new Date().toDateString()
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

  return (
    <form action={formAction} className='w-full flex'>
        <input
        name='comment'
        className='h-16 p-4 py-2 border flex-1 border-stroke text-paragraph/60 rounded-md'
        type="text" placeholder="Escribe tu idea... max 50 caracteres" />
        <input type='submit' className='px-4 py-2 text-white bg-paragraph/60'/>
    </form>
  )
}
