
export interface ExpenseClaim {
    requestId: string;
    topic:string;
    detail:string;
    claimedMonth: string;
    claimedYear: string;
    employeeId?: string;
    employeeCompany: string;
    requester?: string;
    requesterEmail: string;
    approverId?: string;
    approver: string;
    approverEmail: string;
}