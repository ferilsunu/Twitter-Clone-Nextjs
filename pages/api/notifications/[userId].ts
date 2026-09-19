import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    const { userId } = req.query;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({ error: "Invalid ID" });
    }

    // IDOR / BOLA Prevention: users can only fetch their own notifications
    if (currentUser.id !== userId) {
      return res.status(403).json({ error: "Forbidden: Cannot access another user notifications" });
    }

    const notifications = await prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        hasNotification: false,
      }
    });

    return res.status(200).json(notifications);
  } catch (error) {
    console.error("Notifications error:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
}
