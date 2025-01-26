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
    <header className='flex items-center justify-end p-4 text-white'>
      {isLoggedIn && user ? (
        <ProfileAvatar onLogout={() => logout()} user={user} />
      ): (
        <TwitchButton as={'a'} href={loginTwitchUrl}>
        Sign in with Twitch
      </TwitchButton>
      )}
    </header>
  )
}
