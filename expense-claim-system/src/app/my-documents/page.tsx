"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchClaim from "@/app/components/search-claim";
import DataTable from "@/app/components/data-table";
import { getSheetData } from "@/app/api/google-sheets.action";
import { SheetDataRow } from "@/app/models/SheetDataRow";
import LayoutMain from "@/app/components/layouts/layout-main";
import mapData from "@/app/mapper/map-data";
export default function MyDocuments() {
  const router = useRouter();

  const [data, setData] = useState<SheetDataRow[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSheetData();

      if (res.data && Array.isArray(res.data)) {
        const structuredData: SheetDataRow[] = mapData().mapSheetData(res.data as string[][]);
        setData(structuredData);
      } else {
        console.error("Invalid data format received:", res.data);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <LayoutMain>
        <div className="container mx-auto p-6 bg-white rounded-lg">
          <SearchClaim />
          <div className="flex justify-end items-center">
            <button
              type="submit"
              className="p-2 rounded bg-green-300 hover:bg-green-500 transition w-15 text-white"
              onClick={() => router.push("/add-expense-claim")}
            >
              <p>Add</p>
            </button>
          </div>
          <DataTable rowData={data} />
        </div>
      </LayoutMain>
    </>
  );
}
