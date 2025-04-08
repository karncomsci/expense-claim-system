"use server";
import connection from "@/app/connection/connection-google-sheet";
import mapData from "@/app/mapper/map-data";

export async function ExpenseClaimService() {
  const { glSheets, spreadsheetId } = await connection({
    spreadsheetId: process.env.GOOGLE_SHEET_ID_ACTION || "",
  });

  const response = await glSheets.spreadsheets.values.batchGet({
    spreadsheetId: spreadsheetId,
    ranges: ["Document", "DocumentDetail"],
  });

  const valueRanges = response.data.valueRanges ?? [];
  const documents = valueRanges[0].values || [];

  // mapping data
  const document = mapData().mapSheetData(documents as string[][]);

  return { document: document };
}
