"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const Navbar = ({ title }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Cek apakah user sudah login (misalnya dengan mengecek localStorage atau cookies)
    const token = localStorage.getItem("auth-token"); // Contoh menggunakan token dari localStorage
    const storedUserName = localStorage.getItem("user"); // Nama pengguna dari localStorage

    if (token) {
      setIsLoggedIn(true);
      setUserName(storedUserName || "User");
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-white z-10 shadow-md">
      <div>
        {isLoggedIn ? (
          <span className="text-lg text-color-primary">
            Welcome, {userName}
          </span>
        ) : (
          <Link
            href="/login"
            className="md:text-xl text-sm underline hover:text-color-accent text-color-primary transition-all"
          >
            Login
          </Link>
        )}
      </div>
      <Link href={"/"} className="text-2xl font-bold text-color-primary">{title}</Link>
      <div>
        {isLoggedIn && (
          <Link
            href="/history" // Ganti dengan URL yang sesuai untuk halaman History
            className="text-sm md:text-lg text-color-primary underline hover:text-color-accent transition-all"
          >
            History
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
