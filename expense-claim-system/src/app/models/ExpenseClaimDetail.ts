export interface ExpenseClaimDetail {
    requestDetailId?: string;
    requestDate: string;
    category: string;
    from: string;
    to:string;
    client:string;
    amount:string;
    receipt:string;
}