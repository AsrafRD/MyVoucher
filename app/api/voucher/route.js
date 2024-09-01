// app/api/voucher/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const vouchers = await prisma.voucher.findMany();
    return new Response(JSON.stringify(vouchers), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching vouchers:', error);
    return new Response('Error fetching vouchers', { status: 500 });
  }
}
