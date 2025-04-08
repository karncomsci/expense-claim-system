import Image from "next/image";
import logo from "@/app/assets/images/nityo-infotech.png";

import { useRouter } from "next/navigation";

export default function header() {
  const router = useRouter();

  const handleLogout = () => {
    // สามารถเพิ่ม logic logout เช่น clear token ได้ที่นี่
    console.log("User logged out");
    // Clearing all items from local storage
    localStorage.clear();
    router.push("./"); // เปลี่ยนเส้นทางไปที่ page.tsx
  };
  return (
    <header>
      <nav className="bg-blue-300 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-row justify-center items-center">
          <div className="text-center w-full">
            <a href="#">
              <span className="self-center text-xl font-sans whitespace-nowrap dark:text-white">
                Expense Claim System
              </span>
            </a>
          </div>
          <div className="ml-auto">
            <button
              onClick={handleLogout}
              className="text-24 font-mono dark:text-white bg-transparent border-none cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>
  );

  //<img src="img" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
}
