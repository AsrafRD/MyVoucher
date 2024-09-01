"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const History = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVouchers = async () => {
      const res = await fetch("/api/claim-voucher");
      if (res.ok) {
        const data = await res.json();
        setVouchers(data);
      } else {
        console.error("Failed to fetch vouchers");
      }
      setLoading(false);
    };

    fetchVouchers();
  }, []);

  const handleRemov = async (voucherId) => {
    try {
      const res = await axios.post("/api/voucher-remove", { voucherId });
      if (res.status === 200) {
        // Remove the voucher from the local state
        setVouchers(vouchers.filter((voucher) => voucher.id !== voucherId));
      }
    } catch (error) {
      console.error("Error removing voucher:", error);
    }
  };
  const handleRemove = async (voucherId) => {
    try {
      // Mengirim permintaan untuk menyimpan klaim voucher
      const res = await fetch(`/api/voucher-remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ voucherId }),
      });

      if (!res.ok) {
        throw new Error("Failed to remove voucher");
      }

      // Menghapus voucher dari daftar setelah klaim berhasil
      setVouchers((prevVouchers) =>
        prevVouchers.filter((voucher) => voucher.id !== voucherId)
      );
    } catch (error) {
      console.error("Error removing voucher:", error);
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="overflow-x-auto mt-16">
      <table className="min-w-full max-w-4xl divide-y divide-gray-200 border border-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
              Voucher
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {vouchers.map((voucher) => (
            <tr key={voucher.id} className="border-b border-gray-300">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Image
                    src={`/images/vouchers/${voucher.foto}`}
                    alt={voucher.nama}
                    width={100}
                    height={100}
                    className="w-16 h-16 object-cover rounded-md border border-gray-300"
                  />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {voucher.nama}
                    </div>
                    <div className="text-sm text-gray-500">
                      {voucher.kategori}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => handleRemove(voucher.id)}
                  className="text-red-600 hover:text-red-900 border border-red-600 py-1 px-2 rounded"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
