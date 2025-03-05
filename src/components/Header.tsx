'use client';
import React from 'react'
import TwitchButton from './TwitchButton'
import { useTwitch } from '@/hooks/useTwitch'
import { useSearchParams } from 'next/navigation';
import { ProfileAvatar } from './ProfileAvatar';
import { useUser } from '@/context/userProvider';
export function Header() {
  const  params = useSearchParams();
  const code = params.get('code') ?? '';
  const {loginTwitchUrl, isLoggedIn, logout} = useTwitch({ code });
  const {user} = useUser();
  




  return (
    <header className='flex flex-col md:flex-row items-center justify-between py-4 mb-20 text-white max-w-screen-md mx-auto'>
        <form className='md:w-2/4 w-full'>
        <input 
          type="text" 
          placeholder="Ingrese el nombre del streamer" 
          className="text-paragraph bg-transparent p-2 rounded-lg md:w-2/4 w-full"
        />
        </form>
    <div className='flex flex-col sm:flex-row items-center gap-4'>
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
