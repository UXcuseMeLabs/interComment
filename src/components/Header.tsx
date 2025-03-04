'use client';
import React from 'react'
import TwitchButton from './TwitchButton'
import { useTwitch } from '@/hooks/useTwitch'
import { useSearchParams } from 'next/navigation';
import { ProfileAvatar } from './ProfileAvatar';
import { useUser } from '@/context/userProvider';
import { createBoard } from '@/core/board/service/boardService';
import { getUserByTwitchId } from '@/core/comment/service/commentService';
import { toast } from 'sonner';
export function Header() {
  const  params = useSearchParams();
  const code = params.get('code') ?? '';
  const {loginTwitchUrl, isLoggedIn, logout} = useTwitch({ code });
  const {user} = useUser();
  

  const handleCreateBoard = async () => {
    try {
      const userBD = await getUserByTwitchId(user?.id ?? '');
      await createBoard({
      name : 'Tablero de ' + user?.displayName,
      user_id: userBD?.id ?? '',
      isLocked: false,
      background: '',
      theme_id: '896d015a-1beb-4e3a-b136-6381428fa740'
  
      });
      toast.success('Tablero creado con éxito 🎉');
    } catch (error) {
      console.error(error);
      toast.error('Ocurrió un error al crear el tablero',);
      
    }
  }


  return (
    <header className='flex flex-col md:flex-row items-center justify-between py-4 mb-20 text-white max-w-screen-md mx-auto'>
        <input 
          type="text" 
          placeholder="Ingrese el nombre del streamer" 
          className="text-paragraph bg-transparent p-2 rounded-lg md:w-2/4 w-full"
        />
    <div className='flex flex-col sm:flex-row items-center gap-4'>
    <button onClick={handleCreateBoard} className="bg-purple-700 text-white text-base font-semibold px-4 py-2 rounded-lg">Crear Tablero</button>
      {isLoggedIn && user ? (
        <ProfileAvatar onLogout={() => logout()} user={user} />
      ): (
        <TwitchButton as={'a'} href={loginTwitchUrl}>
        Sign in with Twitch
      </TwitchButton>
      )}
    </div>
    </header>
  )
}
