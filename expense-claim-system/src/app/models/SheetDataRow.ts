export interface SheetDataRow {
    requestDate: string;
    topic: string;
    detail: string;
    category: string;
    clientName: string;
    requester: string;
    requesterEmail: string;
    approver: string;
    approverEmail: string;
    approvalDate?: string; 
    status: string;
    rejectReason?: string; 
};
