"use client";
import Head from "next/head";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleStart = () => {
    router.push("/home");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-black">
      <Head>
        <title>microsoft employees</title>
        <meta name="description" content="A catchy description of the app" />
      </Head>
      <div></div>
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-center sm:text-5xl">Microsoft Employees</h1>
      </header>
      <main className="flex flex-col items-center text-center px-4 sm:px-0">
        <h2 className="text-2xl font-semibold mb-4 sm:text-3xl">
          Bienvenido al sitio para administrar a los empleados de microsoft
        </h2>
        <p className="text-lg sm:text-xl">
          administra los nuevos, cambia datos y elimina a empleados 
        </p>
        <button onClick={handleStart} className="bg-blue-500 text-white px-6 py-3 rounded-lg mt-8 hover:bg-blue-400 transition duration-300 ease-in-out">
          Comenzar
        </button>
      </main>
    </div>
  );
}
