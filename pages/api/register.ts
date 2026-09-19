import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, username, name, password } = req.body;

    if (!email || typeof email !== "string" || !email.includes("@") || email.length > 255) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    if (!username || typeof username !== "string" || username.trim().length < 2 || username.length > 50) {
      return res.status(400).json({ error: "Username must be between 2 and 50 characters" });
    }

    if (!name || typeof name !== "string" || name.trim().length === 0 || name.length > 100) {
      return res.status(400).json({ error: "Name is required (max 100 characters)" });
    }

    if (!password || typeof password !== "string" || password.length < 6 || password.length > 128) {
      return res.status(400).json({ error: "Password must be between 6 and 128 characters" });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanUsername = username.trim();

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: cleanEmail },
          { username: cleanUsername }
        ]
      }
    });

    if (existingUser) {
      return res.status(409).json({ error: "Email or username already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email: cleanEmail,
        username: cleanUsername,
        name: name.trim(),
        hashedPassword,
      }
    });

    // Never leak hashedPassword in response
    const { hashedPassword: _, ...safeUser } = user;

    return res.status(200).json(safeUser);
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
