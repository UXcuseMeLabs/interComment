'use client';

import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function ErrorPage() {
    const router = useRouter()
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            user: { value: string };
          };
          router.push('/board/' + target.user.value)
    }

  return (
    <main className="w-full flex flex-col gap-4 justify-center max-w-screen-lg mx-auto">
        <h1 className="text-4xl font-semibold">Error, no pudimos encontrar lo que buscabas</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
        <input 
          type="text"
          name="user"
          placeholder="Ingrese el nombre del streamer" 
          className="text-paragraph bg-transparent p-2 rounded-lg border border-neutral-200 w-full"
        />
        </form>
    </main>
  )
}
