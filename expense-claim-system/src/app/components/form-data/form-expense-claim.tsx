"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { ExpenseClaim } from "@/app/models/ExpenseClaim";
import SelectDropDownMonth from "@/app/components/drop-down/month/select-drop-down";
import SelectDropDownYear from "@/app/components/drop-down/year/select-drop-down";
import SelectDropDownEmployee from "@/app/components/drop-down/employee/select-drop-down";
import SelectDropDownEmployeeCompany from "@/app/components/drop-down/employee-company/select-drop-down";
import SelectDropDownApprover from "@/app/components/drop-down/approver/select-drop-down";
import { Employees } from "../../models/Employees";
import { ClientNames } from "@/app/models/ClientNames";
import TableRequestClaimDetail from "@/app/components/data-table/table-request-claim-detail";
import ModalExpenseClaimDetail from "../modal/modal-expense-claim-detail";
import { ExpenseClaimDetail } from "@/app/models/ExpenseClaimDetail";
import { format } from "date-fns";

export default function FormExpenseClaim() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<ExpenseClaim>({
    requestId: "",
    topic: "",
    detail: "",
    claimedMonth: "",
    claimedYear: "",
    employeeId: "",
    employeeCompany: "",
    requester: "",
    requesterEmail: "",
    approverId: "",
    approver: "",
    approverEmail: "",
  });
  const [formDetailData, setFormDetailData] = useState<ExpenseClaimDetail[]>([]);

  useEffect(() => {});


  const handleSelectChangeEmployee = (data: Employees) => {
    if (data) {
      if (data.employeeId) {
        setFormData((prev) => ({
          ...prev,
          employeeId: data.employeeId,
          requester: data.employeeName,
          requesterEmail: data.email,
        }));
        if(formDetailData.length>0){
          setFormDetailData((prev) =>
            prev.map((item) => ({
              ...item,
              from: data.email
            }))
          );  
        }
      }
    }
  };
  const handleSelectChangeEmployeeCompany = (data: ClientNames) => {
    if (data) {
      if (data.clientName) {
        if(formDetailData.length>0){
          setFormDetailData((prev) =>
            prev.map((item) => ({
              ...item,
              client: data.clientName
            }))
          );  
        }
      }
    }
  };
  const handleSelectChangeApprover = (data: Employees) => {
    if (data) {
      if (data.employeeId) {
        setFormData((prev) => ({
          ...prev,
          approverId: data.employeeId,
          approver: data.employeeName,
          approverEmail: data.email,
        }));
        if(formDetailData.length>0){
          setFormDetailData((prev) =>
            prev.map((item) => ({
              ...item,
              to: data.email
            }))
          );  
        }
      }
    }
  };

  const handleAddItemDetail = (newItem: ExpenseClaimDetail) => {

    setFormDetailData((prev) => [...prev, newItem]); // Append newItem to the array
    console.log(JSON.stringify(formDetailData));
    alert("Item added!");
    setModalOpen(false);

    
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.log(JSON.stringify(formData));
  };

  return (
    <>
    <div className="max-w-full mx-auto p-6 bg-white rounded-lg">
      <h2 className="text-base/7 font-semibold text-gray-900">
        Add Expense Claim
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12">
          <div className="sm:col-span-3">
            <label
              htmlFor="topic"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Topic
            </label>
            <div className="mt-2">
              <input
                id="topic"
                name="topic"
                type="text"
                value={formData.topic}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    topic: e.target.value,
                  }))
                }
                autoComplete="topic"
                placeholder="Topic"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="detail"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Detail
            </label>
            <div className="mt-2">
              <input
                id="detail"
                name="detail"
                type="text"
                value={formData.detail}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    detail: e.target.value,
                  }))
                }
                autoComplete="detail"
                placeholder="Detail"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
              />
            </div>
          </div>
          <div className="sm:col-span-6"></div>

          <div className="sm:col-span-3">
            <label
              htmlFor="requestDate"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Claimed Month
            </label>
            <div className="mt-2 grid grid-cols-1">
              <SelectDropDownMonth
                value={formData?.claimedMonth}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    claimedMonth: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="requestDate"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Claimed Year
            </label>
            <div className="mt-2 grid grid-cols-1">
              <SelectDropDownYear
                value={formData?.claimedYear}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    claimedYear: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="sm:col-span-6"></div>
          <div className="sm:col-span-3">
            <label
              htmlFor="requestDate"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Employee
            </label>
            <div className="mt-2 grid grid-cols-1">
              <SelectDropDownEmployee
                value={formData?.employeeId}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    employeeId: e.target.value,
                  }))
                }
                onSelectChangeEmployee={handleSelectChangeEmployee}
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="requestDate"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Employee Company
            </label>
            <div className="mt-2 grid grid-cols-1">
              <SelectDropDownEmployeeCompany
                value={formData?.employeeCompany}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    employeeCompany: e.target.value,
                  }))
                }
                onSelectChangeEmployeeCompany={handleSelectChangeEmployeeCompany}
              />
            </div>
          </div>
          <div className="sm:col-span-6"></div>
          <div className="sm:col-span-3">
            <label
              htmlFor="requestDate"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Approver
            </label>
            <div className="mt-2 grid grid-cols-1">
              <SelectDropDownApprover
                value={formData?.approverId}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    approverId: e.target.value,
                  }))
                }
                onSelectChangeEmployee={handleSelectChangeApprover}
              />
            </div>
          </div>
          <div className="sm:col-span-3"></div>
          <div className="sm:col-span-6"></div>
        </div>
        <div className="sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
          <div className="flex justify-end items-end mt-5">
            <button
              onClick={() => setModalOpen(true)}
              className="p-2 rounded bg-green-300 hover:bg-green-500 transition text-white"
            >
              Add Another Expense
            </button>
          </div>
          <TableRequestClaimDetail rowData={formDetailData} />
        </div>
      </form>
      <ModalExpenseClaimDetail
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setFormDetailData([]);
        }}
        addItemDetail={handleAddItemDetail}
      />
    </div>
    </>
  );
}
