"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State untuk cek login status
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/voucher");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      } else {
        console.error("Failed to fetch categories");
      }
    };

    fetchCategories();

    const token = localStorage.getItem("auth-token"); // Contoh menggunakan token dari localStorage
    // Cek apakah user sudah login (misalnya dengan mengecek localStorage atau cookies)
    setIsLoggedIn(!!token); // Set status login berdasarkan ada tidaknya token
  }, []);

  const handleCategoryClick = (category) => {
    router.push(`/kategori-voucher/${category}`); // Mengarahkan ke URL dinamis
  };
  

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  
  // localStorage.setItem("authToken", "123456789");
  // localStorage.setItem("userName", "John Doe");

  const handleLogout = () => {
    // Menghapus token dari localStorage
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user");
  };

  return (
    <div className="relative">
    <button
      onClick={toggleSidebar}
      className="p-4 text-2xl text-gray-800 md:hidden focus:outline-none sidebar-button"
    >
      {isOpen ? <HiX /> : <HiMenu />}
    </button>

    <div
      className={`fixed top-16 left-0 h-full w-64 bg-gray-900 text-white transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:w-64 md:bg-gray-800 md:text-gray-200 md:h-screen md:overflow-y-auto`}
    >
      <div className="flex flex-col justify-between h-full p-4">
        <div>
          <h1 className="text-xl font-bold text-gray-200 mb-8">
            Filter berdasar kategori
          </h1>
          <ul>
            {categories.map((category) => (
              <li key={category.id} className="mb-4">
                <button
                  onClick={() => handleCategoryClick(category.kategori)}
                  className="w-full text-left text-lg text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded transition-colors"
                >
                  {category.kategori}
                </button>
              </li>
            ))}
          </ul>
          {isLoggedIn && (
            <div className="flex justify-center mt-auto">
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white py-3 px-4 rounded hover:bg-red-500 transition-colors focus:outline-none"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  );
};

export default Sidebar;
