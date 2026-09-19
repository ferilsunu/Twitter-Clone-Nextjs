import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const users = await prisma.user.findMany({
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
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error("Users list error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
