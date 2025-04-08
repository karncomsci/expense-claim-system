import { useRouter } from 'next/navigation'
import { FileSearch,Pencil,Trash  } from 'lucide-react'
import { ExpenseClaim } from '@/app/models/ExpenseClaim'
import { Employees } from '@/app/models/Employees'


interface ConditionalProps {
    showWhen: boolean;
    children: React.ReactNode;
}
interface DataTableProps {
    rowData: ExpenseClaim[];
    user: Employees; // Accept an array of SheetDataRow objects
    onClickDeleteItemById: (item: string) => void;
}
export default function DataTable({ rowData, user , onClickDeleteItemById }: DataTableProps) {
    const router = useRouter()

    if(!user){
        user = {} as Employees;
    }
    return (
       
        <div className="max-w-10xl mx-auto mt-2 p-6 bg-white shadow-lg rounded-lg">   
         <div className="p-2 overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead className="bg-blue-400 text-white border-1">
            <tr>
            <th className="px-6 py-3 text-left border-1">No.</th>
              <th className="px-6 py-3 text-left border-1">Claim Date</th>
              <th className="px-6 py-3 text-left border-1">Topic</th>
              <th className="px-6 py-3 text-left border-1">Detail</th>
              <th className="px-6 py-3 text-left border-1">Employee</th>
              <th className="px-6 py-3 text-left border-1">Employee Company</th>
              <th className="px-6 py-3 text-left border-1">Approver</th>
              <th className="px-6 py-3 text-left border-1">Status</th>
              <th className="px-6 py-3 text-left border-1">Reject Reason</th>
              <th className="px-6 py-3 text-left border-1">Total Amount</th>
              <th className="px-6 py-3 text-left border-1">Action</th>
            </tr>
          </thead>
          <tbody>
          {rowData.map((item, index) => (
            <Conditional showWhen={item.status == "Pending Approve" && item.employeeId == user.employeeId}  key={index}>
              <tr 
                key={index}
                className="hover:bg-gray-50 border-gray-300 border-1"
                
              >
                <td className="px-6 py-4 text-gray-700 border-gray-300 border-1">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-gray-700 border-gray-300 border-1">
                  {item.claimDate}
                </td>
                <td className="px-6 py-4 text-gray-700 border-gray-300 border-1">
                  {item.topic}
                </td>
                <td className="px-6 py-4 text-gray-700 border-gray-300 border-1">
                  {item.detail}
                </td>
                <td className="px-6 py-4 text-gray-700 border-gray-300 border-1">
                  {item.employeeId}
                </td>
                <td className="px-6 py-4 text-gray-700 border-gray-300 border-1">
                  {item.employeeCompany}
                </td>
                <td className="px-6 py-4 text-gray-700 border-gray-300 border-1">
                  {item.approverId}
                </td>
                <td className="px-6 py-4 text-gray-700 border-gray-300 border-1">
                  {item.status}
                </td>
                <td className="px-6 py-4 text-gray-700 border-gray-300 border-1">
                  {item.rejectReason}
                </td>
                <td className="px-6 py-4 text-gray-700 border-gray-300 border-1">
                  {item.totalAmount}
                </td>
                <td className="px-6 py-4 text-gray-700 border-gray-300 border-1">
                  <div className="flex justify-center align-items-center space-x-1">
                    <button className="p-2 rounded bg-blue-300 hover:bg-blue-500 transition">
                      <FileSearch className="w-5 h-5 text-white" />
                    </button>
                    <button className="p-2 rounded bg-gray-300 hover:bg-gray-500 transition">
                      <Pencil className="w-5 h-5 text-white" />
                    </button>
                    <button onClick={ () => onClickDeleteItemById( item.requestId ? item.requestId : "" ) } className="p-2 rounded bg-red-300 hover:bg-red-500 transition">
                      <Trash className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </td>
              </tr>
              </Conditional>
              
            ))}
          </tbody>
        </table>
      </div>
    </div>
    )
}

/*
<Conditional showWhen={rowData[1].status !== "New"}>
              <tr>
                <td colSpan={12} className="text-center text-gray-700 border-gray-300 border-1">
                    No data available
                </td>
              </tr>
            </Conditional> */

function Conditional({ showWhen, children }: ConditionalProps) {
  if (showWhen) {
    return <>{children}</>;
  } else {
    return null;
  }
}
