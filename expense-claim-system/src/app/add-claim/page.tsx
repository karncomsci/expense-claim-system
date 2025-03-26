"use client"
import { useState, useEffect } from "react"
import FormAddClaim from "@/app/components/FormAddClaim";
import { getSheetMasterData } from "@/app/api/google-sheets.master";
import { Categories } from '@/app/models/Categories';
import { ClientNames } from "@/app/models/ClientNames";
export default function addClaim() {
    const [dataCategory, setDataCategory] = useState<Categories[]>([]);
    const [dataClientName, setDataClientName] = useState<ClientNames[]>([]);
    useEffect(() => {
        const fetchData = async () => {
          const res = await getSheetMasterData();

          if (res.category && Array.isArray(res.category)) {
            const categoryData: Categories[] = mapSheetDataCategory(res.category as string[][]);
            setDataCategory(categoryData);
          } else {
            console.error("Invalid data format received:", res.category);
          }
          if (res.clientName && Array.isArray(res.clientName)) {
            const clientNameData: ClientNames[] = mapSheetDataClientName(res.clientName as string[][]);
            setDataClientName(clientNameData);
          } else {
            console.error("Invalid data format received:", res.clientName);
          }
        }
        fetchData();
    
        //console.log(data);
      }, []);
    return (
            <FormAddClaim rowMonth={dataCategory}/>
    )
}
const mapSheetDataCategory = (data: string[][]): Categories[] => {
  const headers = data[0]; // First row contains headers
  const rows = data.slice(1); // Remaining rows are data rows

  return rows.map(row => {
    // Create an object for each row, using the headers for keys
    const mappedRow: Categories = {
      category: row[0]?? "",
    };

    return mappedRow;
  });
};
const mapSheetDataClientName = (data: string[][]): ClientNames[] => {
  const headers = data[0]; // First row contains headers
  const rows = data.slice(1); // Remaining rows are data rows

  return rows.map(row => {
    // Create an object for each row, using the headers for keys
    const mappedRow: ClientNames = {
      clientName: row[0]?? "",
    };

    return mappedRow;
  });
}