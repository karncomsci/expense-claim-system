'use server';
import { google } from "googleapis";
import { readFileSync } from 'fs';
import { join } from 'path';
//import dotenv from "dotenv";

//dotenv.config({ path: ".env.production" });
export async function getSheetData() { 
    
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

    const data = await glSheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID_ACTION,
        range: 'Document',
    });


    return { data: data.data.values };
}