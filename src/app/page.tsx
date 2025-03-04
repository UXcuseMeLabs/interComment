import localFont from "next/font/local";

const cabinet = localFont({
  src: '../../public/fonts/CabinetGrotesk-Variable.woff2',
})

export default async function Home() {


  return (
    <main className="max-w-screen-md mx-auto">
      <h1 className={`text-5xl font-black ${cabinet.className} mb-10`}>Tablero para ideas de <span className="text-purple-700">uwu</span></h1>
    </main>
  );
}
