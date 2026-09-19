import { NextApiRequest, NextApiResponse } from "next";
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
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { postId } = req.query;

    if (!postId || typeof postId !== "string") {
      return res.status(400).json({ error: "Invalid post ID" });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: {
          select: userSafeSelect
        },
        comments: {
          include: {
            user: {
              select: userSafeSelect
            }
          },
          orderBy: {
            createdAt: "desc"
          }
        },
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error("Post detail error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
