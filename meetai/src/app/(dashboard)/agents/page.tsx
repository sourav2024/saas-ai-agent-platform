import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { auth } from "@/lib/auth";
import { AgentsListHeader } from "@/modules/agents/ui/components/list-header";
import { AgentsView } from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import {ErrorBoundary} from "react-error-boundary"
const Page = async  () =>{
     const session = await auth.api.getSession({
       headers: await headers()
     });
   
     if(!session){
       redirect("/sign-in")
     }
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

    return(
      <>
      <AgentsListHeader />
   <HydrationBoundary state={dehydrate(queryClient)}>
    <Suspense fallback={
      <LoadingState title="Loading Agetns"  description="This may take a few secongs" 
   /> }>
    <ErrorBoundary fallback ={<ErrorState title="Error loading Agetns" description="Something went wrong" />}>
       <AgentsView/>
       </ErrorBoundary>
       </Suspense>
       </HydrationBoundary>
       </>
    )
};

export default Page;