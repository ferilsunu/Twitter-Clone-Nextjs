import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userId } = req.body;
    const { currentUser } = await serverAuth(req, res);

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    if (currentUser.id === userId) {
      return res.status(400).json({ error: "Cannot follow yourself" });
    }

    const targetUser = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!targetUser) {
      return res.status(404).json({ error: "User not found" });
    }

    let updatedFollowingIds = [...(currentUser.followingIds || [])];

    if (req.method === "POST") {
      if (!updatedFollowingIds.includes(userId)) {
        updatedFollowingIds.push(userId);

        try {
          await prisma.notification.create({
            data: {
              body: `@${currentUser.username || "Someone"} followed you!`,
              userId,
            },
          });

          await prisma.user.update({
            where: {
              id: userId,
            },
            data: {
              hasNotification: true,
            }
          });
        } catch (error) {
          console.error("Notification error:", error);
        }
      }
    }

    if (req.method === "DELETE") {
      updatedFollowingIds = updatedFollowingIds.filter((followingId) => followingId !== userId);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        followingIds: updatedFollowingIds
      }
    });

    const { hashedPassword, ...safeUser } = updatedUser;

    return res.status(200).json(safeUser);
  } catch (error) {
    console.error("Follow error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
