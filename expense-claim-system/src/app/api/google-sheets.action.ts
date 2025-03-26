'use server';
import { google } from "googleapis";
import { readFileSync } from 'fs';
import { join } from 'path';

export async function getSheetData() { 
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

    const data = await glSheets.spreadsheets.values.get({
        spreadsheetId: "1-wYtFbv9aysqdviMXgwL0jHpc7kbg98gW07jKp0MiKQ",
        range: 'Document',
    });

    return { data: data.data.values };
}