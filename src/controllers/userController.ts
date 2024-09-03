import { Request, Response } from 'express';
import prisma from '../utils/db';

export const checkUserExists = async (req: Request, res: Response) => {
  const { username }: { username: string } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (user) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(404).json({ exists: false, message: 'User not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const authenticateUser = async (req: Request, res: Response) => {
  const { username, password }: { username: string; password: string } =
    req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Assuming passwords are hashed
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Authentication successful
      res.status(200).json({ message: 'Authentication successful' });
    } else {
      // Password does not match
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};
