"use server";
import connection from "@/app/connection/connection-google-sheet";
import mapData from "@/app/mapper/map-data";
export async function masterService() {
  const { glSheets, spreadsheetId } = await connection({
    spreadsheetId: "1_Q81crViTMCfug_ojH07u5mWT07oR2DEGlfpL0yvS-0",
  });

  const response = await glSheets.spreadsheets.values.batchGet({
    spreadsheetId: spreadsheetId,
    ranges: ["Category", "Client Name", "Employee", "Month", "Year"],
  });
  
  const valueRanges = response.data.valueRanges ?? [];
  
  const categories = valueRanges[0].values || [];
  const clientNames = valueRanges[1].values || [];
  const employees = valueRanges[2].values || [];
  const months = valueRanges[3].values || [];
  const years = valueRanges[4].values || [];
  
  // mapping data
  const category = mapData().mapSheetDataCategory(categories as string[][]);
  const clientName = mapData().mapSheetDataClientName(clientNames as string[][]);
  const employee = mapData().mapSheetDataEmployee(employees as string[][]);
  const approver = mapData().mapSheetDataApprover(employees as string[][]);
  const month = mapData().mapSheetDataMonth(months as string[][]);
  const year = mapData().mapSheetDataYear(years as string[][]);

  return { category: category, clientName: clientName, employee: employee,approver:approver, month: month, year: year };
}
