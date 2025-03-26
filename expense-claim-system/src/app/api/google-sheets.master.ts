'use server';
import { google } from "googleapis";
import { readFileSync } from 'fs';
import { join } from 'path';

export async function getSheetMasterData() { 
const credentialsPath = join(process.cwd(), './credentials.json');
const credentials = JSON.parse(readFileSync(credentialsPath, 'utf-8'));

const glAuth = await google.auth.getClient({
    projectId: credentials.project_id,
    credentials: {
        type: credentials.type,
        project_id: credentials.project_id,
        private_key_id: credentials.private_key_id,
        private_key: credentials.private_key,
        client_email: credentials.client_email,
        universe_domain: credentials.universe_domain,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

    const glSheets = google.sheets({ version: "v4", auth: glAuth });

    const categories = await glSheets.spreadsheets.values.get({
        spreadsheetId: "1_Q81crViTMCfug_ojH07u5mWT07oR2DEGlfpL0yvS-0",
        range: 'Category',
    });
    const clientName = await glSheets.spreadsheets.values.get({
        spreadsheetId: "1_Q81crViTMCfug_ojH07u5mWT07oR2DEGlfpL0yvS-0",
        range: 'Client Name',
    });

    return { category: categories.data.values
        , clientName: clientName.data.values };
}