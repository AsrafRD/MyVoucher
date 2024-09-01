import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = 'your_jwt_secret'; // Ganti dengan secret key Anda

export async function POST(request) {
  const { username, password } = await request.json();

  console.log('Received credentials:', { username, password });

  try {
    // Fetch the user by username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    console.log('Fetched user:', user);

    // Check if user exists and passwords match
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      console.log('Password match:', passwordMatch);

      if (passwordMatch) {
        // Create a JWT token
        const token = jwt.sign(
          { id: user.id, username: user.username, nama: user.nama },
          JWT_SECRET,
          { expiresIn: '1h' } // Token expires in 1 hour
        );

        return new Response(
          JSON.stringify({ success: true, token, user: { id: user.id, username: user.username, nama: user.nama } }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      } else {
        return new Response(
          JSON.stringify({ success: false, message: 'Invalid credentials' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }
    } else {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid credentials' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
