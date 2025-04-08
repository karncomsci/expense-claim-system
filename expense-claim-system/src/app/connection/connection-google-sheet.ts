'use server';
import { google } from "googleapis";
import dotenv from "dotenv";

if(process.env.NODE_ENV == 'production'){
    dotenv.config({ path: ".env.production" });
}else{
    dotenv.config({ path: ".env.local" });
}

const connectionGoogleSheet = async ({ spreadsheetId }: { spreadsheetId: string }) => {
    const glAuth = await google.auth.getClient({
        projectId: process.env.PROJECT_ID,
        credentials: {
            type: process.env.TYPE,
            project_id: process.env.PROJECT_ID,
            private_key_id: process.env.PRIVATE_KEY_ID,
            private_key: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'), // Ensure proper formatting of private key
            client_email: process.env.CLIENT_EMAIL,
            universe_domain: process.env.UNIVERSE_DOMAIN,
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const glSheets = google.sheets({ version: "v4", auth: glAuth });

    return { glSheets, spreadsheetId };
};

export default connectionGoogleSheet;