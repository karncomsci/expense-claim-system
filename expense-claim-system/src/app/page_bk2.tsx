"use client"
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import SearchClaim from "./components/search-claim"
import DataTable from "./components/data-table"
import { getSheetData } from "@/app/api/google-sheets.action";
import { SheetDataRow } from "@/app/models/SheetDataRow";

export default function Home() {
  const router = useRouter()
 
  const [data, setData] = useState<SheetDataRow[]>([]);
  

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSheetData();
      
      if (res.data && Array.isArray(res.data)) {
        const structuredData: SheetDataRow[] = mapSheetData(res.data as string[][]);
        setData(structuredData);
      } else {
        console.error("Invalid data format received:", res.data);
      }
    }
    fetchData();
  }, []);
  
    return (
        <div className="container mx-auto p-6 bg-white rounded-lg">
            <SearchClaim />
            <div className="flex justify-end items-center">
              <button
                type="submit"
                className="p-2 rounded bg-green-300 hover:bg-green-500 transition w-15 text-white"
                onClick={() => router.push('/add-claim')}
              >
              <p>Add</p>
              </button>
            </div>
            <DataTable rowData={data}/>
        </div>
    )
}
const mapSheetData = (data: string[][]): SheetDataRow[] => {
  const headers = data[0]; // First row contains headers
  const rows = data.slice(1); // Remaining rows are data rows

  return rows.map(row => {
    // Create an object for each row, using the headers for keys
    const mappedRow: SheetDataRow = {
      requestDate: row[0]?? "",
      topic: row[1] ?? "",
      detail: row[2] ?? "",
      category: row[3] ?? "",
      clientName: row[4] ?? "",
      requester: row[5] ?? "",
      requesterEmail: row[6] ?? "",
      approver: row[7] ?? "",
      approverEmail: row[8] ?? "",
      receipt:row[9] ?? "",
      approvalDate: row[10] ?? "", // Check if Approval Date is undefined
      status: row[11] ?? "",
      rejectReason: row[12] ?? "" // Check if Reject Reason is undefined
    };

    return mappedRow;
  });
};

