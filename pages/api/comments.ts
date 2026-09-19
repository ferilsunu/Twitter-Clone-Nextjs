import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    const { body } = req.body;
    const { postId } = req.query;

    if (!postId || typeof postId !== "string") {
      return res.status(400).json({ error: "Invalid post ID" });
    }

    if (!body || typeof body !== "string" || body.trim().length === 0 || body.length > 280) {
      return res.status(400).json({ error: "Comment body must be between 1 and 280 characters" });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      }
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = await prisma.comment.create({
      data: {
        body: body.trim(),
        userId: currentUser.id,
        postId
      }
    });

    // Notify post owner if not commenting on own post
    if (post.userId && post.userId !== currentUser.id) {
      try {
        await prisma.notification.create({
          data: {
            body: `@${currentUser.username || "Someone"} replied to your tweet!`,
            userId: post.userId
          }
        });

        await prisma.user.update({
          where: {
            id: post.userId
          },
          data: {
            hasNotification: true
          }
        });
      } catch (notifErr) {
        console.error("Notification error:", notifErr);
      }
    }

    return res.status(200).json(comment);
  } catch (error) {
    console.error("Comment error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
