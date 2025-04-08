"use client"
import { ReactNode,useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar, { SidebarItem } from "@/app/components/sidebars";
import { Employees } from "@/app/models/Employees";
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
  const [user, setUser] = useState<Employees>({
      employeeId: "",
      employeeName : "",
      email :"",
      position: "",
      firstName:"",
      lastName:"",
      employeeStatus:""
  });
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
        const fetchData = async () => {
          const getUser = localStorage.getItem('login');
          if (getUser) {
             setUser(JSON.parse(getUser) as Employees);
          }
        };
        fetchData();
        
    }, []);
  return (
    <>
      <div className="flex">
        <Sidebar>
          <Conditional showWhen={user.employeeStatus === "Approver"}  > 
          <SidebarItem
            icon={<FolderClock size={20} />}
            text="เอกสารรออนุมัติ"
            //active={pathname === "./"}
            count={2}
            path="./"
          />
          </Conditional>
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
          <Conditional showWhen={user.employeeStatus === "Admin"}  > 
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
          </Conditional>
        </Sidebar>
        <main className="flex-1">
          <Header />
          {children}
        </main>
      </div>
    </>
  );
}
interface ConditionalProps {
  showWhen: boolean;
  children: React.ReactNode;
}
function Conditional({ showWhen, children }: ConditionalProps) {
  if (showWhen) {
    return <>{children}</>;
  } else {
    return null;
  }
}
