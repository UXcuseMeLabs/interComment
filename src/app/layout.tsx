import "./globals.css";
import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";
import { Suspense } from "react";
import Head from "next/head";
import localFont from "next/font/local";

const satoshi = localFont({
  src: '../../public/fonts/Satoshi-Variable.woff2',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.className} antialiased`}
      >
        <Head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@1&f[]=cabinet-grotesk@1&display=swap" rel="stylesheet"/>
        </Head>
        <Suspense>
        <Providers>
        <Header />
        {children}
        </Providers>
        </Suspense>
      </body>
    </html>
  );
}
