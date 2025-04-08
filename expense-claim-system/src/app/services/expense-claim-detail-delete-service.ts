"use server";
import connection from "@/app/connection/connection-google-sheet";

export const DeleteExpenceClaimDetailById = async (requestId: string) => {
  const { glSheets, spreadsheetId } = await connection({
    spreadsheetId: process.env.GOOGLE_SHEET_ID_ACTION || "",
  });

  const sheetName = "DocumentDetail";

  try {
    // 1. ดึง sheetId จากชื่อ sheet
    const sheetMetadata = await glSheets.spreadsheets.get({
      spreadsheetId,
    });

    const sheet = sheetMetadata.data.sheets?.find(
      (s) => s.properties?.title === sheetName
    );

    if (!sheet || sheet.properties?.sheetId === undefined) {
      return { success: false, message: `Sheet "${sheetName}" not found` };
    }

    const sheetId = sheet.properties.sheetId;

    // 2. ดึงข้อมูลจาก sheet
    const expenseClaimDetail = await glSheets.spreadsheets.values.get({
      spreadsheetId,
      range: sheetName,
    });

    const rows = expenseClaimDetail.data.values || [];
    const header = rows[0];
    const idIndex = header.indexOf("RequestId");

    // 3. หา index ของแถวที่ต้องลบ
    const targetIndexes = rows
      .map((row, index) => (index > 0 && row[idIndex] === requestId ? index : -1))
      .filter((index) => index !== -1)
      .sort((a, b) => b - a); // ลบจากล่างขึ้นบน

    if (targetIndexes.length === 0) {
      return { success: false, message: `RequestId '${requestId}' not found` };
    }

    const deleteRequests = targetIndexes.map((index) => ({
      deleteDimension: {
        range: {
          sheetId,
          dimension: "ROWS",
          startIndex: index,
          endIndex: index + 1,
        },
      },
    }));

    // 4. ลบแถว
    await glSheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: deleteRequests,
      },
    });


    return { success: true, message: "delete successfully" };
  } catch (error) {
    console.error("Error deleting row:", error);
    return { success: false, message: "Error deleting row" };
  }
}