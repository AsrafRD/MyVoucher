import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const saltRounds = 10;

export async function POST(req) {
  const { username, password, name, email } = await req.json();

  // Simple validation
  if (!username || !password || !name || !email) {
    return new Response(
      JSON.stringify({ success: false, message: 'All fields are required' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    // Check if the username or email already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email },
        ],
      },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ success: false, message: 'Username or email already exists' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        nama: name,  // Adjust field name according to your Prisma schema
        email,
      },
    });

    return new Response(
      JSON.stringify({ success: true, user: newUser }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
