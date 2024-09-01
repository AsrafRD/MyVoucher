const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const vouchers = [
    {
      nama: "Food Voucher",
      kategori: "Food",
      foto: "food_voucher.jpg",
      status: "unclaimed",
    },
    {
      nama: "Electronics Voucher",
      kategori: "Electronics",
      foto: "electronics_voucher.jpg",
      status: "unclaimed",
    },
    {
      nama: "Fashion Voucher",
      kategori: "Fashion",
      foto: "fashion_voucher.jpg",
      status: "unclaimed",
    },
    {
      nama: "Books Voucher",
      kategori: "Books",
      foto: "books_voucher.jpg",
      status: "unclaimed",
    },
    {
      nama: "Travel Voucher",
      kategori: "Travel",
      foto: "travel_voucher.jpg",
      status: "unclaimed",
    },
    {
      nama: "Health Voucher",
      kategori: "Health",
      foto: "health_voucher.jpg",
      status: "unclaimed",
    },
    {
      nama: "Beauty Voucher",
      kategori: "Beauty",
      foto: "beauty_voucher.jpg",
      status: "unclaimed",
    },
  ];

  for (const voucher of vouchers) {
    await prisma.voucher.create({
      data: voucher,
    });
  }

  console.log("Data dummy untuk tabel Voucher telah berhasil dibuat.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
