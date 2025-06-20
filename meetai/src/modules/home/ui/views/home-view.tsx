"use client"

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";


const HomeView = () =>{
  const router = useRouter()
  const {data: session} = authClient.useSession();

  if(!session){
    return(
      <p>Loading...</p>
    )
  }
  return(
    <div className="flex flex-col p-4 gap-y-4">
      <p>Logged in as {session.user.name}</p>
      <Button
      onClick={() => authClient.signOut({
        fetchOptions : { onSuccess: async () => { await router.push("/sign-in"); } }
      })}
      >Sign Out</Button>
    </div>
  )
}

export default HomeView;