import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init";
import { agentsInsertSchema } from "../schemas";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {eq} from "drizzle-orm"
export const agentsRouter = createTRPCRouter({
   
    getOne : protectedProcedure.input(z.object({id: z.string()})).query(async ({input}) =>{
        const [existingAgents] = await db.select()
        .from(agents)
        .where(eq(agents.id, input.id))
        return existingAgents
    }),
    getMany: protectedProcedure.query(async () =>{
        const data = await db.select().from(agents);
        return data;
    }),

    create : protectedProcedure.input(agentsInsertSchema)
    .mutation(async ({input, ctx}) =>{
       const [createdAgent] = await db.insert(agents)
       .values({
        ...input,
        userId: ctx.auth.user.id
       })
       .returning();

       return createdAgent;
    })
})