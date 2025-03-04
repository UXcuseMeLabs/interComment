'use client';

import { useUser } from '@/context/userProvider';
import { Board } from '@/core/board/type';
import { createUser, getUserByTwitchId, upVote } from '@/core/comment/service/commentService';
import { Comment, Vote } from '@/core/comment/type';
import { generatePaletteColors } from '@/utils/generatePaletteColors';
import { ThumbsUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { memo, startTransition, useOptimistic } from 'react';
import { toast } from 'sonner';

interface CommentCardProps {
    comment: Comment;
    theme: Board['theme'];
    isEven: boolean;
}

export const  CommentCard = memo(function Card({ comment, isEven, theme }: CommentCardProps){
    const { user } = useUser();
    const router = useRouter();
    const palette= generatePaletteColors(theme.color);

    const votesLength = comment.votes?.filter(vote => vote.value === true).length ?? 0

    const [optimisticVotes, addOptimisticVote] = useOptimistic(
        votesLength,
        (state) => state + 1
    );

    const handleUpVote = async () => {
        startTransition(async () => {
            addOptimisticVote(votesLength + 1); 
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
            toast.success("👍");
        });
    };

    return (
        <article 
        style={{backgroundColor: isEven ? palette['200'] : palette['100']}}
        className={`p-6 flex flex-col gap-3 rounded-md text-paragraph font-medium text-xl w-full lg:w-[60%] ${isEven ? 'self-end' : 'self-start'}`}>
            <p>{comment.comment}</p>
            <div className='flex items-center justify-between text-lg'>
            <p className='self-end font-bold'>{comment.username}</p>
                <div style={{color: palette[900]}} className='flex items-center gap-2 font-semibold text-lg'>
                    <button onClick={handleUpVote} className='flex gap-2'>
                        <ThumbsUp style={{color: palette[900]}} className='w-5' />
                    </button>
                    <p>{optimisticVotes}</p>
                </div>
            </div>
        </article>
    );
}, (prevProps , nextProps) => {
    return prevProps.comment.id !== nextProps.comment.id
})



