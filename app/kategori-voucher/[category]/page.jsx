"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ListVoucher from "@/components/ListVoucher";

const ListVoucherPage = () => {
  const { category } = useParams(); // Mendapatkan kategori dari URL

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Voucher List</h1>
      <ListVoucher category={category} />
    </div>
  );
};

export default ListVoucherPage;
