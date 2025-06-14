"use client"

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";


const HomeView = () =>{
  const trpc = useTRPC();
  const {data} = useQuery(trpc.hello.queryOptions({text: "Antonio"}))
  return(
    <div className="flex flex-col p-4 gap-y-4">
    {data?.greeting}
    </div>
  )
}

export default HomeView;