'use client';

import { useUser } from '@/context/userProvider';
import { createUser, getUserByTwitchId, upVote } from '@/core/comment/service/commentService';
import { Comment, Vote } from '@/core/comment/type';
import { formatDate } from '@/utils/formatCommentDate';
import { ThumbsUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { memo, startTransition, useEffect, useOptimistic } from 'react';
import { toast } from 'sonner';

interface CommentCardProps {
    comment: Comment;
}

export const  CommentCard = memo(function Card({ comment }: CommentCardProps){
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
      console.log('se actualizo el comentario')
      console.log(JSON.stringify)
    }, [comment])
    

    const votesLength = comment.votes?.filter(vote => vote.value === true).length ?? 0

    const [optimisticVotes, addOptimisticVote] = useOptimistic(
        votesLength,
        (state) => state + 1
    );

    const handleUpVote = async () => {
        // Envuelve la actualización optimista en startTransition
        startTransition(() => {
            addOptimisticVote(null); 
        });
        if (!user?.id) {
            toast.error("Necesitas ingresar con Twitch");
            return;
        }
    
        let userdb = await getUserByTwitchId(user.id);
        if (!userdb) userdb = await createUser(user.id);
    
    
        const vote: Vote = {
            comment_id: comment.id ?? "",
            user_id: userdb.id,
            value: true,
        };
    
        await upVote(vote);
        router.refresh();
        toast.success("🥵🥵🥵🥵🥵🥵🥵");
    };

    return (
        <article className='p-6 border-stroke border flex flex-col gap-[18px] rounded-md text-[#1F2310] font-medium text-xl'>
            <p>{comment.comment}</p>
            <div className='flex justify-between'>
                <div className='flex gap-2 font-semibold text-greenseph'>
                    <button onClick={handleUpVote} className='flex gap-2'>
                        <ThumbsUp className='text-greenseph' />
                    </button>
                    <p>{optimisticVotes}</p>
                </div>
                <p className='self-end'>{comment.username}</p>
            </div>
            <p className='self-end'>{formatDate(comment.createdAt)}</p>
        </article>
    );
}, (prevProps , nextProps) => {
    return prevProps.comment.id !== nextProps.comment.id
})



