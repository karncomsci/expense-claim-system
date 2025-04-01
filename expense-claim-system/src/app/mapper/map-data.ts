import { SheetDataRow } from "../models/SheetDataRow";
import { Categories } from "../models/Categories"; // Import Categories type
import { ClientNames } from "../models/ClientNames"; // Import ClientNames type
import { Months } from "../models/Months";
import { Users } from "../models/Users";
import { Years } from "../models/Years";
import { Employees } from "../models/Employees";

const mapData = () => {
  const mapSheetData = (data: string[][]): SheetDataRow[] => {
    const headers = data[0]; // First row contains headers
    const rows = data.slice(1); // Remaining rows are data rows

    return rows.map((row) => {
      // Create an object for each row, using the headers for keys
      const mappedRow: SheetDataRow = {
        requestId: row[0] ?? "",
        requestDate: row[1] ?? "",
        topic: row[2] ?? "",
        detail: row[3] ?? "",
        category: row[4] ?? "",
        clientName: row[5] ?? "",
        requester: row[6] ?? "",
        requesterEmail: row[7] ?? "",
        approver: row[8] ?? "",
        approverEmail: row[9] ?? "",
        receipt: row[10] ?? "",
        approvalDate: row[11] ?? "", // Check if Approval Date is undefined
        status: row[12] ?? "",
        rejectReason: row[13] ?? "", // Check if Reject Reason is undefined
      };

      return mappedRow;
    });
  };

  const mapSheetDataCategory = (data: string[][]): Categories[] => {
    //const headers = data[0]; // First row contains headers
    const rows = data.slice(1); // Remaining rows are data rows

    return rows.map((row) => {
      // Create an object for each row, using the headers for keys
      const mappedRow: Categories = {
        category: row[0] ?? "",
      };

      return mappedRow;
    });
  };

  const mapSheetDataClientName = (data: string[][]): ClientNames[] => {
    //const headers = data[0]; // First row contains headers
    const rows = data.slice(1); // Remaining rows are data rows

    return rows.map((row) => {
      // Create an object for each row, using the headers for keys
      const mappedRow: ClientNames = {
        clientName: row[0] ?? "",
      };

      return mappedRow;
    });
  };

  const mapSheetDataMonth = (data: string[][]): Months[] => {
    const rows = data.slice(1); // Remaining rows are data rows

    return rows.map((row) => {
      const mappedRow: Months = {
        month: row[0] ?? "",
      };

      return mappedRow;
    });
  };

  const mapSheetDataYear = (data: string[][]): Years[] => {
    const rows = data.slice(1); // Remaining rows are data rows

    return rows.map((row) => {
      const mappedRow: Years = {
        year: row[0] ?? "",
      };

      return mappedRow;
    });
  };

  const mapSheetDataEmployee = (data: string[][]): Employees[] => {
    const rows = data.slice(1); // Remaining rows are data rows

    return rows
    .filter((row) => row[6] == "User")
    .map((row) => {
      const mappedRow: Employees = {
        employeeId: row[0] ?? "",
        employeeName: row[1] ?? "",
        firstName: row[2] ?? "",
        lastName: row[3] ?? "",
        email: row[4] ?? "",
        position: row[5] ?? "",
        employeeStatus: row[6] ?? "",
      };

      return mappedRow;
    });
  };
  const mapSheetDataApprover = (data: string[][]): Employees[] => {
    //const headers = data[0]; // First row contains headers
    const rows = data.slice(1); // Remaining rows are data rows

    return rows
      .filter((row) => row[6] == "Approver")
      .map((row) => {
        // Create an object for each row, using the headers for keys
        const mappedRow: Employees = {
          employeeId: row[0] ?? "",
          employeeName: row[1] ?? "",
          firstName: row[2] ?? "",
          lastName: row[3] ?? "",
          email: row[4] ?? "",
          position: row[5] ?? "",
          employeeStatus: row[6] ?? "",
        };

        return mappedRow;
      });
  };

  return {
    mapSheetData,
    mapSheetDataCategory,
    mapSheetDataClientName,
    mapSheetDataApprover,
    mapSheetDataMonth,
    mapSheetDataYear,
    mapSheetDataEmployee
  };
};

export default mapData;
