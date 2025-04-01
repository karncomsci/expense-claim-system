"use client";
import { useState, useEffect, FormEvent } from "react";
import LayoutMain from "@/app/components/layouts/layout-main";
import { useRouter, redirect } from "next/navigation";
import FormAddClaim from "@/app/components/form-add-claim";
import { getSheetMasterData } from "@/app/api/google-sheets.master";
import { getSheetSaveData } from "@/app/api/google-sheets.save";
import { Categories } from "@/app/models/Categories";
import { ClientNames } from "@/app/models/ClientNames";
import { Users } from "@/app/models/Users";
import DataTableAddClaim from "@/app/components/data-table-add-claim";
import { SheetDataRow } from "@/app/models/SheetDataRow";
import mapData from "@/app/mapper/map-data";

export default function addClaim() {
  const router = useRouter();
  const [dataCategory, setDataCategory] = useState<Categories[]>([]);
  const [dataClientName, setDataClientName] = useState<ClientNames[]>([]);
  const [dataRequester, setDataRequester] = useState<Users[]>([]);
  const [dataApprover, setDataApprover] = useState<Users[]>([]);
  const [rowData, setRowData] = useState(SheetDataRow[])([])                                                                                              ;
  const [loading, setLoading] = useState(false);
  const requestId = `r-${Date.now()}-${Math.floor(Math.random() * 10000)}`

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSheetMasterData();

      if (res.category && Array.isArray(res.category)) {
        const categoryData: Categories[] = mapData().mapSheetDataCategory(
          res.category as string[][]
        );
        setDataCategory(categoryData);
      } else {
        console.error("Invalid data format received:", res.category);
      }
      if (res.clientName && Array.isArray(res.clientName)) {
        const clientNameData: ClientNames[] = mapData().mapSheetDataClientName(
          res.clientName as string[][]
        );
        setDataClientName(clientNameData);
      } else {
        console.error("Invalid data format received:", res.clientName);
      }
      if (res.user && Array.isArray(res.user)) {
        const requesterData: Users[] = mapData().mapSheetDataRequest(
          res.user as string[][]
        );
        setDataRequester(requesterData);
      } else {
        console.error("Invalid data format received:", res.user);
      }
      if (res.user && Array.isArray(res.user)) {
        const ApproverData: Users[] = mapData().mapSheetDataApprover(
          res.user as string[][]
        );
        setDataApprover(ApproverData);
      } else {
        console.error("Invalid data format received:", res.user);
      }
    };
    fetchData();

    //console.log(data);
  }, []);

  const handleAddItem = (newItem: SheetDataRow) => {
    // Define the behavior on button click
    setRowData((prev) => [...prev, newItem]);
  };
  const newRowData: SheetDataRow[] = [];

  const handleSubmitClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent the default button behavior
    setLoading(true);
    
    if (rowData.length > 0) {
      rowData.map((row) => {
        row.status = "Pending Approve"; // Example of updating a field
      });
      setRowData(rowData);
    }
    //await new Promise((resolve) => setTimeout(resolve, 2000));
    const res = await getSheetSaveData({ rowData });
    if(res.success){
      setLoading(false);
      alert("Save Completed!");
      redirect("../my-documents")
    }else{
      setLoading(false);
      alert("Save Failed!");
    }
    
  };
  return (
    <>
    
    <LayoutMain>
      <FormAddClaim
        rowCategory={dataCategory}
        rowClientName={dataClientName}
        rowRequester={dataRequester}
        rowApprover={dataApprover}
        addItemClaim={handleAddItem}
        requestId={requestId}
      />
      <div className="max-w-full container mx-auto p-2 bg-white rounded-lg">
        <DataTableAddClaim rowData={rowData} />

        <div className="flex justify-center align-items-center mt-10 space-x-1">
          <button
            onClick={() => router.push("./my-documents")}
            className="p-2 rounded bg-white hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitClick}
            className="p-2 rounded bg-blue-400 hover:bg-blue-700 transition text-white"
          >
            Submit
          </button>
        </div>
        {/* Popup Loading */}
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 font-medium">Loading...</p>
          </div>
        </div>
      )}
      </div>
      </LayoutMain>
    </>
  );
}


