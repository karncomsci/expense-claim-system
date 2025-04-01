import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { SheetDataRow } from '@/app/models/SheetDataRow'

interface ConditionalProps {
    showWhen: boolean;
    children: React.ReactNode;
}
interface DataTableProps {
    rowData: SheetDataRow[]; // Accept an array of SheetDataRow objects
}
export default function DataTable({ rowData }: DataTableProps) {
    const router = useRouter()
    return (
       
        <div className="max-w-10xl mx-auto mt-2 p-6 bg-white shadow-md rounded-lg">   
         <div className="p-2 overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead className="bg-blue-400 text-white border-1">
            <tr>
            <th className="px-6 py-3 text-left border-1">No.</th>
              <th className="px-6 py-3 text-left border-1">Request Date</th>
              <th className="px-6 py-3 text-left border-1">Topic</th>
              <th className="px-6 py-3 text-left border-1">Detail</th>
              <th className="px-6 py-3 text-left border-1">Category</th>
              <th className="px-6 py-3 text-left border-1">Client Name</th>
              <th className="px-6 py-3 text-left border-1">Requester</th>
              <th className="px-6 py-3 text-left border-1">Approver</th>
              <th className="px-6 py-3 text-left border-1">Receipt</th>
              <th className="px-6 py-3 text-left border-1">Approval Date</th>
              <th className="px-6 py-3 text-left border-1">Status</th>
              <th className="px-6 py-3 text-left border-1">Reject Reason</th>
              <th className="px-6 py-3 text-left border-1">Action</th>
            </tr>
          </thead>
          <tbody>
          {rowData.map((item, index) => (
            <Conditional showWhen={item.status == "New"}  key={index}> 
              <tr 
                key={index}
                className="hover:bg-gray-50 border-gray-300 border-1"
                
              >
                <td className="px-6 py-4 text-gray-700 border-gray-300 border-1">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-gray-700 border-gray-300 border-1">
                  {item.requestDate}
                </td>
                <td className="px-6 py-4 text-gray-700 border-gray-300 border-1">
                  {item.topic}
                </td>
                <td className="px-6 py-4 text-gray-700 border-gray-300 border-1">
                  {item.detail}
                </td>
                <td className="px-6 py-4 text-gray-700 border-gray-300 border-1">
                  {item.category}
                </td>
                <td className="px-6 py-4 text-gray-700 border-gray-300 border-1">
                  {item.clientName}
                </td>
                <td className="px-6 py-4 text-gray-700 border-gray-300 border-1">
                  {item.requester}
                </td>
                <td className="px-6 py-4 text-gray-700 border-gray-300 border-1">
                  {item.approver}
                </td>
                <td className="px-6 py-4 text-gray-700 border-gray-300 border-1">
                  {item.receipt}
                </td>
                <td className="px-6 py-4 text-gray-700 border-gray-300 border-1">
                  {item.approvalDate}
                </td>
                <td className="px-6 py-4 text-gray-700 border-gray-300 border-1">
                  {item.status}
                </td>
                <td className="px-6 py-4 text-gray-700 border-gray-300 border-1">
                  {item.rejectReason}
                </td>
                <td className="px-6 py-4 text-gray-700 border-gray-300 border-1">
                  <div className="flex justify-center align-items-center space-x-1">
                    <button className="p-2 rounded bg-red-300 hover:bg-red-500 transition">
                      <Trash2 className="w-5 h-5 text-white"/>
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
