"use server";
import connection from "@/app/connection/connection-google-sheet";
import { ExpenseClaimDetail } from "@/app/models/ExpenseClaimDetail";

export const SaveExpenseClaimDetail = async (formDataDetail: ExpenseClaimDetail[], requestId: string) => {
  const { glSheets, spreadsheetId } = await connection({
    spreadsheetId: process.env.GOOGLE_SHEET_ID_ACTION || "",
  });
  try {
    const values = formDataDetail.map(detail => [
        detail.requestDetailId,
        detail.requestDate,
        detail.category,
        detail.from,
        detail.to,
        detail.client,
        detail.amount,
        detail.receiptFile,
        detail.receiptName,
        requestId,
    ]);

    const expenseClaimDetail = await glSheets.spreadsheets.values.append({
        spreadsheetId: spreadsheetId,
        range: "DocumentDetail",
        valueInputOption: "RAW",
        requestBody: { values },
        /*valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            [
                formDataDetail.requestDetailId,
                formDataDetail.requestDate,
                formDataDetail.category,
                formDataDetail.from,
                formDataDetail.to,
                formDataDetail.client,
                formDataDetail.amount,
                formDataDetail.receiptFile,
                formDataDetail.receiptName,
                requestId,
            ],
          ],
        }, */
      });
      if (expenseClaimDetail.status === 200) {
        return { data: expenseClaimDetail.data, success: true, message: "save data successfully!" };
      } else {
        return {
          data: null,
          success: false,
          error: `Failed with status code: ${expenseClaimDetail.status}`,
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
  
}