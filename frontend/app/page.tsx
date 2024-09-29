import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const data = await getServerSession(authOptions);
    return (
        <main className="w-screen h-screen">
            <header className="text-center w-full p-3 bg-gradient-to-r from-white via-purple-200 via-purple-600 via-purple-200 to-white">
                <h1 className="text-xl text-white font-semibold">Enigma</h1>
            </header>
            <div>
                {
                   data && <h1>{JSON.stringify(data)}</h1>
                }
            </div>
        </main>
    );
}
