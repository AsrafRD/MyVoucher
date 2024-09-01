import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    // Parsing body dari request
    const { voucherId } = await request.json();

    console.log("Request Body:", { voucherId }); // Log request body untuk debugging

    if (!voucherId) {
      console.error("Voucher ID is missing"); // Log error jika ID voucher tidak ada
      return new Response(JSON.stringify({ message: "Voucher ID is required" }), { status: 400 });
    }

    // Menambahkan klaim voucher ke tabel voucher_claimed
    const claim = await prisma.voucher_Claim.create({
      data: {
        id_voucher: voucherId,
      },
    });

    console.log("Voucher Claim Created:", claim); // Log klaim voucher yang berhasil dibuat

    // Mengupdate status voucher menjadi 'claimed'
    const updatedVoucher = await prisma.voucher.update({
      where: { id: voucherId },
      data: { status: "claimed" },
    });

    console.log("Voucher Updated:", updatedVoucher); // Log voucher yang berhasil diupdate

    return new Response(JSON.stringify({ message: "Voucher claimed successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error claiming voucher:", error); // Log error yang terjadi
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}

export async function GET() {
  try {
    // Ambil semua data voucher_claimed
    const claimedVouchers = await prisma.voucher_Claim.findMany({
      select: {
        id_voucher: true, // Ambil hanya id_voucher dari klaim
      },
    });

    // Ambil data voucher berdasarkan id_voucher yang sudah diklaim
    const voucherIds = claimedVouchers.map(claim => claim.id_voucher);
    const vouchers = await prisma.voucher.findMany({
      where: {
        id: { in: voucherIds },
      },
    });

    return new Response(JSON.stringify(vouchers), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching vouchers:', error);
    return new Response('Error fetching vouchers', { status: 500 });
  }
}

