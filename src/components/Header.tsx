'use client';
import React, { FormEvent } from 'react'
import TwitchButton from './TwitchButton'
import { useTwitch } from '@/hooks/useTwitch'
import { useRouter, useSearchParams } from 'next/navigation';
import { ProfileAvatar } from './ProfileAvatar';
import { useUser } from '@/context/userProvider';
import { Search } from 'lucide-react';
export function Header() {
  const  params = useSearchParams();
  const code = params.get('code') ?? '';
  const {loginTwitchUrl, logout} = useTwitch({ code });
  const {user} = useUser();
      const router = useRouter()
      const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const target = event.target as typeof event.target & {
              user: { value: string };
            };
            router.push('/board/' + target.user.value)
      }




  return (
    <header className='flex flex-col md:flex-row items-center justify-between py-4 mb-20 text-white max-w-screen-md mx-auto'>
        <form onSubmit={(e) => handleSubmit(e)} className='md:w-2/4 w-full'>
        <div className='flex gap-2 items-center'>
          <Search className='text-neutral-500'/>
        <input 
          type="text" 
          name='user'
          placeholder="Ingrese el nombre del streamer" 
          className="text-paragraph bg-transparent p-2 rounded-lg  w-full"
        />
        </div>
        </form>
    <div className='flex flex-col sm:flex-row items-center gap-4'>
      { user ? (
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
