import { useRouter } from "next/navigation";
import { Trash2 , FileSearch} from "lucide-react";
import { ExpenseClaimDetail } from "@/app/models/ExpenseClaimDetail";

interface DataTableProps {
    rowData: ExpenseClaimDetail[]; // Accept an array of SheetDataRow objects
}

export default function TableRequestClaimDetail({ rowData } : DataTableProps) {
  const router = useRouter();

  return (
    <div className="max-w-10xl mx-auto mt-2 p-6 bg-white shadow-md rounded-lg">
      <div className="p-2 overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
        <thead className="bg-blue-400 text-white border-1">
            <tr>
            <th className="px-6 py-3 text-left border-1">No.</th>
              <th className="px-6 py-3 text-left border-1">Request Date</th>
              <th className="px-6 py-3 text-left border-1">Category</th>
              <th className="px-6 py-3 text-left border-1">Client Name</th>
              <th className="px-6 py-3 text-left border-1">From</th>
              <th className="px-6 py-3 text-left border-1">To</th>
              <th className="px-6 py-3 text-left border-1">Receipt</th>
              <th className="px-6 py-3 text-left border-1">Amount</th>
              <th className="px-6 py-3 text-left border-1">Action</th>
            </tr>
          </thead>
          <tbody>
          {rowData.map((item, index) => (
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
                  {item.category}
                </td>
                <td className="px-6 py-4 text-gray-700 border-gray-300 border-1">
                  {item.client}
                </td>
                <td className="px-6 py-4 text-gray-700 border-gray-300 border-1">
                  {item.from}
                </td>
                <td className="px-6 py-4 text-gray-700 border-gray-300 border-1">
                  {item.to}
                </td>
                <td className="px-6 py-4 text-gray-700 border-gray-300 border-1">
                  {item.receipt}
                </td>
                <td className="px-6 py-4 text-gray-700 border-gray-300 border-1">
                  {item.amount}
                </td>                       
                <td className="px-6 py-4 text-gray-700 border-gray-300 border-1">
                  <div className="flex justify-center align-items-center space-x-1">
                    <button className="p-2 rounded bg-blue-300 hover:bg-blue-500 transition">
                      <FileSearch className="w-5 h-5 text-white" />
                    </button>
                    <button className="p-2 rounded bg-red-300 hover:bg-red-500 transition">
                      <Trash2 className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
