export interface SheetDataRow {
    requestId?: string;
    requestDate: string;
    topic: string;
    detail: string;
    category: string;
    clientName: string;
    requester: string;
    requesterEmail: string;
    approver: string;
    approverEmail: string;
    receipt:string;
    approvalDate?: string; 
    status: string;
    rejectReason?: string; 
};
