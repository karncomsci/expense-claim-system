"use client"
import { ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar, { SidebarItem } from "@/app/components/sidebars";
import {
  FolderOpen,
  BriefcaseBusiness,
  FolderClock,
  Settings,
  Store,
} from "lucide-react";
import Header from "@/app/components/headers"; // Adjust the path as needed

export default function MyDocumentsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <div className="flex">
        <Sidebar>
          <SidebarItem
            icon={<FolderClock size={20} />}
            text="เอกสารรออนุมัติ"
            //active={pathname === "./"}
            count={2}
            path="./"
          />
          <SidebarItem
            icon={<BriefcaseBusiness size={20} />}
            text="เอกสารของฉัน"
            alert
            count={1}
            active={pathname === "/my-documents"}
            path="./my-documents"
          />
          <SidebarItem
            icon={<FolderOpen size={20} />}
            text="เอกสารทั้งหมด"
            alert
            path="./all-documents"
          />
          <hr className="my-3" />
          <SidebarItem
            icon={<Settings size={20} />}
            text="ตั้งค่า"
            path="./settings"
          />
          <SidebarItem
            icon={<Store size={20} />}
            text="เกี่ยวกับเรา"
            path="./about-us"
          />
        </Sidebar>
        <main className="flex-1">
          <Header />
          {children}
        </main>
      </div>
    </>
  );
}
