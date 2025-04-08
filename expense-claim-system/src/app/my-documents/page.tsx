"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchExpenseClaim from "@/app/components/search-expense-claim";
import DataTable from "@/app/components/data-table";
import { ExpenseClaim } from "@/app/models/ExpenseClaim";
import { Employees } from "@/app/models/Employees";
import LayoutMain from "@/app/components/layouts/layout-main";
import { ExpenseClaimService } from "@/app/services/expense-claim-service";
import { DeleteExpenceClaimById } from "../services/expense-claim-delete-service";
import { DeleteExpenceClaimDetailById } from "@/app/services/expense-claim-detail-delete-service";
// Ensure Categories is an array type or adjust its definition if needed
export default function MyDocuments() {
  const router = useRouter();
  const [dataExpenseClaim, setDataExpenseClaim] = useState<ExpenseClaim[]>([]);
  const [user, setUser] = useState<Employees>({
    employeeId: "",
    employeeName: "",
    email: "",
    position: "",
    firstName: "",
    lastName: "",
    employeeStatus: "",
  });

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const expenseClaim = await ExpenseClaimService();
    if (expenseClaim.document) {
      setDataExpenseClaim(expenseClaim.document as ExpenseClaim[]);
    }
    const getUser = localStorage.getItem("login");
    if (getUser) {
      setUser(JSON.parse(getUser) as Employees);
    }
  };

  const handleClickDeleteItemById = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this data?");
    if (confirmDelete) {
      DeleteExpenceClaimById(id)
        .then((res) => {
          if (res.success) {
            deleteExpenseClaimDetail(id);
            alert("Delete item successfully!");
            fetchData(); // Refresh the data after deletion
          }
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
        });
        
    }
  };
  const deleteExpenseClaimDetail = async (requestId: string) => {
      if(requestId){
        DeleteExpenceClaimDetailById(requestId)
          .then((res) => {
            if (res.success) {
              console.log("Delete item :", res.message);
            }
          })
          .catch((error) => {
            console.error("Error deleting item:", error);
          });
      }
  }
  return (
    <>
      <LayoutMain>
        <div className="container mx-auto p-6 bg-white rounded-lg">
          <SearchExpenseClaim />
          <div className="flex justify-end items-center">
            <button
              type="submit"
              className="p-2 rounded bg-green-300 hover:bg-green-500 transition w-15 text-white"
              onClick={() => router.push("/add-expense-claim")}
            >
              <p>Add</p>
            </button>
          </div>
          <DataTable
            rowData={dataExpenseClaim}
            user={user}
            onClickDeleteItemById={handleClickDeleteItemById}
          />
        </div>
      </LayoutMain>
    </>
  );
}
