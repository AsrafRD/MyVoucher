"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const ListVoucher = ({ category }) => {
  const [vouchers, setVouchers] = useState([]);
  const [filteredVouchers, setFilteredVouchers] = useState([]);

  useEffect(() => {

    const fetchVouchers = async () => {
      try {
        const res = await fetch("/api/voucher");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setVouchers(data);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      }
    };

    fetchVouchers();
  }, []);

  useEffect(() => {
    if (category) {
      setFilteredVouchers(vouchers.filter((voucher) => voucher.kategori === category));
    } else {
      setFilteredVouchers(vouchers);
    }
  }, [category, vouchers]);

  const handleClaim = async (voucherId) => {
    try {
      const res = await fetch(`/api/claim-voucher`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ voucherId }),
      });

      if (!res.ok) {
        throw new Error("Failed to claim voucher");
      }

      setFilteredVouchers((prevVouchers) =>
        prevVouchers.filter((voucher) => voucher.id !== voucherId)
      );
    } catch (error) {
      console.error("Error claiming voucher:", error);
    }
  };

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 px-4">
      {filteredVouchers.map((voucher) => (
        <div key={voucher.id} className="p-4 border rounded-lg">
          <Image
            src={`/images/vouchers/${voucher.foto}`}
            alt={voucher.nama}
            width={625}
            height={525}
            className="w-full h-auto max-w-full md:max-w-[625px] object-cover rounded-md"
          />
          <h2 className="text-lg font-semibold mt-2 text-center md:text-left">
            {voucher.nama}
          </h2>
          <h4 className="text-sm font-semibold mt-2 text-center md:text-left">
            {voucher.kategori}
          </h4>
          <p className="text-sm text-gray-700 mt-1 text-center md:text-left">
            Status: {voucher.status === "unclaimed" ? "Unclaimed" : "Claimed"}
          </p>
          <button
            onClick={() => handleClaim(voucher.id)}
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded w-full md:w-auto hover:bg-blue-600 transition-colors"
          >
            Claim
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListVoucher;
