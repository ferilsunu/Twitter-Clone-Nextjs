import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userId } = req.query;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true,
        name: true,
        username: true,
        bio: true,
        image: true,
        profileImage: true,
        coverImage: true,
        createdAt: true,
        followingIds: true,
        hasNotification: true
      }
    });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId
        }
      }
    });

    return res.status(200).json({ ...existingUser, followersCount });
  } catch (error) {
    console.error("User details error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
