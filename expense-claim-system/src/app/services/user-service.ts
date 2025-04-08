"use server";
import connection from "@/app/connection/connection-google-sheet";
import mapData from "@/app/mapper/map-data";

export async function userService() {
    const { glSheets, spreadsheetId } = await connection({
        spreadsheetId: "1_Q81crViTMCfug_ojH07u5mWT07oR2DEGlfpL0yvS-0",
    });
    const employees = await glSheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: "Employee",
    });

    const employee = mapData().mapSheetDataUserLogin(
        employees.data.values as string[][]
    );

    return { employee: employee };
}