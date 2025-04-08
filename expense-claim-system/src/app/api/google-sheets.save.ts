"use server"
import { ExpenseClaim } from "@/app/models/ExpenseClaim";
import { google } from "googleapis";
import { readFileSync } from 'fs';
import { join } from 'path';
import dotenv from "dotenv";

if(process.env.NODE_ENV == 'production'){
    dotenv.config({ path: ".env.production" });
}else{
    dotenv.config({ path: ".env.local" });
}

interface Prop {
    formData: ExpenseClaim
    totalAmount: string
}
export async function saveRequestExpenseClaimData({formData,totalAmount} : Prop) { 
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

const saveExpenseClaim = {
    requestId: formData.requestId,
    topic: formData.topic,
    detail: formData.detail,
    claimDate: formData.claimDate,
    //claimedMonth: formData.claimedMonth,
    //claimedYear: formData.claimedYear,
    employeeId: formData.employeeId,
    employeeCompany: formData.employeeCompany,
    approverId: formData.approverId,
    totalAmount: totalAmount,
    status: formData.status,
    rejectReason: formData.rejectReason
}
/*const formattedData = rowData.map(row => {
    const orderedRow = {
        requestId: row.requestId,
        requestDate: row.requestDate,
        topic: row.topic,
        detail: row.detail,
        category: row.category,
        clientName: row.clientName,
        requester: row.requester,
        requesterEmail: row.requesterEmail,
        approver: row.approver,
        approverEmail: row.approverEmail,
        receipt: row.receipt,
        approvalDate: row.approvalDate,
        status: row.status,
        rejectReason: row.rejectReason
    };
    return Object.values(orderedRow);
}); */
try {
    const data = await glSheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID_ACTION,
        range: 'Document',
        valueInputOption: "RAW",
        requestBody: { values: [Object.values(saveExpenseClaim)] },
    });

    if (data.status === 200) {
        return { data: data.data, success: true };
    } else {
        return { data: null, success: false, error: `Failed with status code: ${data.status}` };
    }
} catch (error) {
    console.error("Error appending data to Google Sheets:", error);
    return { data: null, success: false, error: error instanceof Error ? error.message : "An unknown error occurred" };
}
    
}




/*const data = await glSheets.spreadsheets.values.append({
    spreadsheetId: "1-wYtFbv9aysqdviMXgwL0jHpc7kbg98gW07jKp0MiKQ",
    range: 'Document',
    valueInputOption: "RAW",
    requestBody: { values: formattedData },
});*/