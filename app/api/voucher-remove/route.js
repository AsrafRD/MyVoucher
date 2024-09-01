import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const { voucherId } = body;

    console.log('Received voucherId:', voucherId); // Debug log

    if (!voucherId) {
      return NextResponse.json({ message: "Voucher ID is required" }, { status: 400 });
    }

    // Find voucher claims by id_voucher
    const voucherClaims = await prisma.voucher_Claim.findMany({
      where: { id_voucher: voucherId },
    });

    if (voucherClaims.length === 0) {
      return NextResponse.json({ message: "Voucher claim not found" }, { status: 404 });
    }

    // Delete all voucher claims with the specified id_voucher
    await prisma.voucher_Claim.deleteMany({
      where: { id_voucher: voucherId },
    });

    // Check if voucher exists in voucher table
    const existingVoucher = await prisma.voucher.findUnique({
      where: { id: voucherId },
    });

    if (!existingVoucher) {
      return NextResponse.json({ message: "Voucher not found in vouchers table" }, { status: 404 });
    }

    // Update status to 'unclaimed' in vouchers table
    await prisma.voucher.update({
      where: { id: voucherId },
      data: { status: "unclaimed" },
    });

    return NextResponse.json({ message: "Voucher removed and returned to available vouchers" });
  } catch (error) {
    console.error("Error removing voucher:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
