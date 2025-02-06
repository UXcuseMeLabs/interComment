'use client';

import { UserProvider } from "@/context/userProvider";
import { ReactNode } from "react";
import { Toaster } from "sonner";

export function Providers({children}: {
    children: ReactNode
}) {
  return (
    <>
    <UserProvider>
    <Toaster richColors position='top-right' />
    {children}
    </UserProvider>
    </>
  )
}
