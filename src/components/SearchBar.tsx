'use client';
import { useUser } from '@/context/userProvider';
import { createComment, createUser, getUserByTwitchId } from '@/core/comment/service/commentService';
import { Comment } from '@/core/comment/type';
import React, { useActionState, useEffect } from 'react'

interface CommentFormState {
  comment: string;

}

const handleSubmit = async (
  previousState: CommentFormState | undefined,
  formData: FormData
): Promise<CommentFormState> => {
  // The previousState variable contains the last saved form state
  console.log('previous saved state ', previousState);
  // Use get to extract a value from a FormData object
  const comment = formData.get('comment') as string;
  // The returned value will become our new formState
  return { comment };
};


export function SearchBar() {
  const [state, formAction] = useActionState(handleSubmit, {
    comment: '',
  });
  const {user} = useUser();
  useEffect(() => {
   const init = async () => {
    const comment: Comment = {
      comment: state.comment,
      user_id: user?.id ?? '',
      username: user?.displayName ?? '',
    };

    if (state.comment.length > 0 && user?.id) {
      let user = await getUserByTwitchId(comment.user_id);
      if (!user) {
        user = await createUser(comment.user_id);
      }
      comment.user_id = user.id;
      const newComment = createComment(comment);
      console.log(newComment);
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
