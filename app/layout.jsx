import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MyVouchers",
  description: "Website MyVouchers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col h-screen`}>
        <Navbar title="MyVouchers" />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 p-4">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
