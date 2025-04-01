"use client"
import { MoreVertical, ChevronLast, AlignJustify} from "lucide-react"
import { useContext, createContext, useState } from "react"
import Image from "next/image"
import img from '@/app/assets/images/nityo-infotech.png'
import logo from '@/app/assets/images/logo-nityo.png'
import { useRouter } from 'next/navigation'
import { isNumber } from "util"
interface SidebarContextProps {
  expanded: boolean;
  setExpanded?: (expanded: boolean) => void;
}

const SidebarContext = createContext<SidebarContextProps>({
    expanded: false,
    setExpanded: () => {},
});

interface SidebarProps {
  children: React.ReactNode;
}
export default function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState(true)
  
  
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          
          <Image src={img} alt='' className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
             width={80} height={80} />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <AlignJustify /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded, setExpanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <Image src={logo} alt='' className="w-10 h-10 rounded-md"/>
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Nityo Infotech</h4>
              <span className="text-xs text-gray-600">getintouch@nityo.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  )
}


interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
  count?: number;
  path?: string;
}

export function SidebarItem({ icon, text, active, alert,count,path }: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext)
  const router = useRouter()
  return (
    <li
      onClick={() => path && router.push(path)}
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && isNumber(count) && (
        <div className="ml-auto">
        <span className="bg-blue-400 font-bold text-white text-center py-1 px-2 text-xs rounded">{count}</span>
        </div>
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6 w-max
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  )
}

/*className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}  
          
*/