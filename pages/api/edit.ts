import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { currentUser } = await serverAuth(req, res);

    const { name, username, bio, profileImage, coverImage } = req.body;

    if (!name || typeof name !== "string" || name.trim().length === 0 || name.length > 100) {
      return res.status(400).json({ error: "Invalid name (max 100 characters)" });
    }

    if (!username || typeof username !== "string" || username.trim().length < 2 || username.length > 50) {
      return res.status(400).json({ error: "Invalid username (2-50 characters)" });
    }

    const cleanUsername = username.trim();

    // Check if username taken by another user
    const existing = await prisma.user.findFirst({
      where: {
        username: cleanUsername,
        NOT: {
          id: currentUser.id
        }
      }
    });

    if (existing) {
      return res.status(409).json({ error: "Username already taken" });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name: name.trim(),
        username: cleanUsername,
        bio: typeof bio === "string" ? bio.slice(0, 500) : "",
        profileImage: typeof profileImage === "string" ? profileImage : null,
        coverImage: typeof coverImage === "string" ? coverImage : null
      }
    });

    const { hashedPassword, ...safeUser } = updatedUser;

    return res.status(200).json(safeUser);
  } catch (error) {
    console.error("Edit user error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
