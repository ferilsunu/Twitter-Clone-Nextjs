import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

const userSafeSelect = {
  id: true,
  name: true,
  username: true,
  bio: true,
  image: true,
  profileImage: true,
  coverImage: true,
  createdAt: true,
  followingIds: true,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);
      const { body } = req.body;

      if (!body || typeof body !== "string" || body.trim().length === 0 || body.length > 280) {
        return res.status(400).json({ error: "Post body must be between 1 and 280 characters" });
      }

      const post = await prisma.post.create({
        data: {
          body: body.trim(),
          userId: currentUser.id
        },
        include: {
          user: {
            select: userSafeSelect
          },
          comments: {
            select: {
              id: true
            }
          }
        }
      });

      return res.status(200).json(post);
    }

    if (req.method === "GET") {
      const { userId } = req.query;

      res.setHeader('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');

      let posts;

      if (userId && typeof userId === "string") {
        posts = await prisma.post.findMany({
          where: {
            userId
          },
          include: {
            user: {
              select: userSafeSelect
            },
            comments: {
              select: {
                id: true
              }
            }
          },
          orderBy: {
            createdAt: "desc"
          },
          take: 60,
        });
      } else {
        posts = await prisma.post.findMany({
          include: {
            user: {
              select: userSafeSelect
            },
            comments: {
              select: {
                id: true
              }
            }
          },
          orderBy: {
            createdAt: "desc"
          },
          take: 80,
        });
      }

      return res.status(200).json(posts);
    }
  } catch (error) {
    console.error("Posts error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
