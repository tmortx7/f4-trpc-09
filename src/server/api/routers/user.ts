/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "~/server/db";
import bcryptjs from "bcryptjs";

const defaultUserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  name: true,
  email: true,
  password: true,
});

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure.query(({ ctx: { session, prisma } }) => {
    const user = prisma.user.findFirst({
      where: { email: session.user.email },
    });
    return user;
  }),
  findUser: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { email, password } = input;

      try {
        const user = await ctx.prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        const passwordHashed = user?.password || "";

        const verifyPassword = bcryptjs.compareSync(password, passwordHashed);

        if (!verifyPassword) {
          return null;
        }

        return user;
      } catch (error) {
        return null;
      }
    }),
  list: publicProcedure.query(() => {
    return prisma.user.findMany({
      select: defaultUserSelect,
    });
  }),
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { id } = input;
      const userx = await prisma.user.findUnique({
        where: { id },
        select: defaultUserSelect,
      });
      if (!userx) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No user with id '${id}'`,
        });
      }
      return userx;
    }),
  add: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const passwordHashed = await bcryptjs.hash(input.password, 8);
      const result = await prisma.user.create({
        data: {
          ...input,
          password: passwordHashed,
        },
        select: defaultUserSelect,
      });
      return result;
    }),
  edit: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.user.delete({
        where: { id: input.id },
      });
    }),
});
