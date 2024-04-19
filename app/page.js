import Image from "next/image";
import NavBar from "./(components)/NavBar";
import { getServerSession } from "next-auth";
import {redirect} from "next/navigation"
import { options } from "./api/auth/[...nextauth]/options";
export default async function Home() {
  const session = await getServerSession(options)
  console.log("seoooooooooo",session)
  if(!session)return redirect("/auth/signIn")
  return (
    <main>
        {session?.user && <NavBar></NavBar>}
    </main>
  );
}
