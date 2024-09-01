import ListVoucher from "@/components/ListVoucher";
import Navbar from "@/components/Navbar";
import RootLayout from "./layout";

const Page = async () => {
  return (
    <>
      <Navbar title="MyVouchers" />
      <div className="flex">
        <main className="flex-1 mt-16 p-4 h-screen">
          <ListVoucher />
        </main>
      </div>
    </>
  );
};

export default Page;
