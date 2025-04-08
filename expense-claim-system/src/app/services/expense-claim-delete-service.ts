"use server";
import connection from "@/app/connection/connection-google-sheet";

export const DeleteExpenceClaimById = async (id: string) => {
  const { glSheets, spreadsheetId } = await connection({
    spreadsheetId: process.env.GOOGLE_SHEET_ID_ACTION || "",
  });

  const expenseClaim = await glSheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range: "Document",
  });
  try {
    const rows = expenseClaim.data.values || [];
    const header = rows[0];
    const idIndex = header.indexOf("RequestId");
    const targetIndex = rows.findIndex((row) => row[idIndex] === id);

    if (targetIndex === -1) {
      return { success: false, message: "ID not found" };
    }
    await glSheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: 0, // ใช้ sheetId แทนชื่อ sheet
                dimension: "ROWS",
                startIndex: targetIndex,
                endIndex: targetIndex + 1,
              },
            },
          },
        ],
      },
    });

    return { success: true, message: "delete successfully" };
  } catch (error) {
    console.error("Error deleting row:", error);
    return { success: false, message: "Error deleting row" };
  }
};
