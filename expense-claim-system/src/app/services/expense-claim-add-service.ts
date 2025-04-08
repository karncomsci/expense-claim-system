"use server";
import connection from "@/app/connection/connection-google-sheet";
import { ExpenseClaim } from "@/app/models/ExpenseClaim";

export const SaveExpenseClaimData = async (formData: ExpenseClaim, totalAmount: string) => {
  const { glSheets, spreadsheetId } = await connection({
    spreadsheetId: process.env.GOOGLE_SHEET_ID_ACTION || "",
  });
  try {
    const expenseClaim = await glSheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      range: "Document",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            formData.requestId,
            formData.topic,
            formData.detail,
            formData.claimDate,
            formData.employeeId,
            formData.employeeCompany,
            formData.approverId,
            totalAmount,
            formData.status,
            formData.rejectReason,
          ],
        ],
      },
    });
    if (expenseClaim.status === 200) {
      return { data: expenseClaim.data, success: true, message: "save data successfully!" };
    } else {
      return {
        data: null,
        success: false,
        error: `Failed with status code: ${expenseClaim.status}`,
      };
    }
  } catch (error) {
    console.error("Error appending data to Google Sheets:", error);
    return {
      data: null,
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
