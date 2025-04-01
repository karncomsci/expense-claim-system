'use server';
import { google } from "googleapis";
import { readFileSync } from 'fs';
import { join } from 'path';
import dotenv from "dotenv";

dotenv.config({ path: ".env.production" });
export async function getSheetMasterData() { 
//const credentialsPath = join(process.cwd(), './api-key.json');
//const credentials = JSON.parse(readFileSync(credentialsPath, 'utf-8'));

const glAuth = await google.auth.getClient({
    projectId: process.env.PROJECT_ID,
    credentials: {
        type: process.env.TYPE,
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY,
        client_email: process.env.CLIENT_EMAIL,
        universe_domain: process.env.UNIVERSE_DOMAIN,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

    const glSheets = google.sheets({ version: "v4", auth: glAuth });
    const spreadsheetId = "1_Q81crViTMCfug_ojH07u5mWT07oR2DEGlfpL0yvS-0";

    const categories = await glSheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: 'Category',
    });
    const clientName = await glSheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: 'Client Name',
    });
    const employee = await glSheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: 'Employee',
    });
    const month = await glSheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: 'Month',
    });
    const year = await glSheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: 'Year',
    });

    return { category: categories.data.values
        , clientName: clientName.data.values
        , month: month.data.values
        , year: year.data.values
        , employee: employee.data.values
    };
}