"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import { ExpenseClaim } from "@/app/models/ExpenseClaim";
import SelectDropDownEmployee from "@/app/components/drop-down/employee/select-drop-down";
import SelectDropDownEmployeeCompany from "@/app/components/drop-down/employee-company/select-drop-down";
import SelectDropDownApprover from "@/app/components/drop-down/approver/select-drop-down";
import { Employees } from "../../models/Employees";
import { ClientNames } from "@/app/models/ClientNames";
import TableRequestClaimDetail from "@/app/components/data-table/table-request-claim-detail";
import ModalExpenseClaimDetail from "../modal/modal-expense-claim-detail";
import { ExpenseClaimDetail } from "@/app/models/ExpenseClaimDetail";
import { format, parse } from "date-fns";
import { enGB } from "date-fns/locale";
import ErrorAlert from "@/app/components/alert/error-alert";
import { SaveExpenseClaimData } from "@/app/services/expense-claim-add-service";
import { SaveExpenseClaimDetail } from "@/app/services/expense-claim-add-detail-service";
import Loading from "@/app/components/modal/loading";
import { masterService } from "@/app/services/master-service";

export default function FormExpenseClaim() {
  const router = useRouter();
  const generateId = (): string => {
    return `R-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isErrorMessage, setErrorMessage] = useState<boolean>(false);
  const [formData, setFormData] = useState<ExpenseClaim>({
    requestId: generateId(),
    topic: "",
    detail: "",
    claimDate: format(new Date(), "dd/MM/yyyy"),
    claimedMonth: "",
    claimedYear: "",
    employeeId: "",
    employeeCompany: "",
    requester: "",
    requesterEmail: "",
    approverId: "",
    approver: "",
    approverEmail: "",
    totalAmount: "",
    status: "Pending Approve",
    rejectReason: "",
  });
  const [formDetailData, setFormDetailData] = useState<ExpenseClaimDetail[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
    const master = await masterService();
    localStorage.setItem('employee', JSON.stringify(master.employee ? master.employee : []));
    localStorage.setItem('clientName', JSON.stringify(master.clientName ? master.clientName : []));
    localStorage.setItem('approver', JSON.stringify(master.approver ? master.approver : []));
    localStorage.setItem('category', JSON.stringify(master.category ? master.category : []));
    localStorage.setItem('month', JSON.stringify(master.month ? master.month : []));
    localStorage.setItem('year', JSON.stringify(master.year ? master.year : []));
  };
  fetchData();
}, []);
    

  const handleSelectChangeEmployee = (data: Employees) => {
    if (data) {
      if (data.employeeId) {
        setFormData((prev) => ({
          ...prev,
          employeeId: data.employeeId,
          requester: data.employeeName,
          requesterEmail: data.email,
        }));
        if (formDetailData.length > 0) {
          setFormDetailData((prev) =>
            prev.map((item) => ({
              ...item,
              from: data.email,
            }))
          );
        }
      }
    }
  };
  const handleSelectChangeEmployeeCompany = (data: ClientNames) => {
    if (data) {
      if (data.clientName) {
        setFormData((prev) => ({
          ...prev,
          employeeCompany: data.clientName,
        }));
        if (formDetailData.length > 0) {
          setFormDetailData((prev) =>
            prev.map((item) => ({
              ...item,
              client: data.clientName,
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
        if (formDetailData.length > 0) {
          setFormDetailData((prev) =>
            prev.map((item) => ({
              ...item,
              to: data.email,
            }))
          );
        }
      }
    }
  };

  const handleAddItemDetail = (newItem: ExpenseClaimDetail) => {
    setFormDetailData((prev) => [...prev, newItem]); // Append newItem to the array
    //alert("Item added successfully!");

    setModalOpen(false);
  };

  const handleSubmit = async () => {
    if (formDetailData.length <= 0) {
      setErrorMessage(true);
      await clearData();
    } else {
      setDataSave();
      const totalAmount = formDetailData.reduce(
        (sum, item) => sum + parseFloat(item.amount),
        0
      );
      saveExpenseClaim(totalAmount.toFixed(2));
      setErrorMessage(false);
    }
  };

  const clearData = async () => {
    setFormData({
      requestId: generateId(),
      topic: "",
      detail: "",
      claimDate: format(new Date(), "dd/MM/yyyy"),
      claimedMonth: "",
      claimedYear: "",
      employeeId: "",
      employeeCompany: "",
      requester: "",
      requesterEmail: "",
      approverId: "",
      approver: "",
      approverEmail: "",
      totalAmount: "",
      status: "Pending Approve",
      rejectReason: "",
    });
  };

  const setDataSave = async () => {

    setFormDetailData((prev) =>
      prev.map((item) => ({
        ...item,
        requestId: formData?.requestId,
      }))
    );
  };
  const saveExpenseClaim = async (totalAmount: string) => {

    setLoading(true);
    SaveExpenseClaimData(formData, totalAmount)
      .then((res) => {
        if (res.success) {
          saveExpenseClaimDetail(formDetailData, formData.requestId ? formData.requestId : "")
        } else {
          console.log("Error saving data:", res.error);
        }
      })
      .catch((error) => {
        console.log("Error saving data:", error);
      });
    
    
   
    //
  };
  const saveExpenseClaimDetail = async (formExpenseClaimDetail : ExpenseClaimDetail[], requestId: string) => {
       SaveExpenseClaimDetail(formExpenseClaimDetail, requestId)
      .then((res) => {
        if (res.success) {
          setLoading(false);
          alert("Save data successfully!");
          router.push("/my-documents");
        } else {
          console.log("Error saving data:", res.error);
        }
      })
      .catch((error) => {
        console.log("Error saving data:", error);
      });
  }

  const deleteItem = (id: string) => {
    // ลบ item ที่มี id ตรงกัน
    const updatedItems = formDetailData.filter(
      (item) => item.requestDetailId !== id
    );
    setFormDetailData(updatedItems); // refresh ด้วย setState
  };
  return (
    <>
      <div className="max-w-full mx-auto p-6 bg-white rounded-lg">
        <h2 className="text-base/7 font-semibold text-gray-900">
          Add Expense Claim
        </h2>
        {/*<form onSubmit={handleSubmit} className="space-y-4"> */}
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
              Claim Date
            </label>
            <div className="mt-2 grid grid-cols-1">
              <DatePicker
                locale={enGB}
                selected={
                  formData.claimDate
                    ? parse(formData.claimDate, "dd/MM/yyyy", new Date())
                    : null
                }
                onChange={(date) =>
                  setFormData({
                    ...formData,
                    claimDate: date ? format(date, "dd/MM/yyyy") : "",
                  })
                }
                dateFormat="dd/MM/yyyy"
                placeholderText="dd/MM/yyyy"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
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
          <div className="sm:col-span-6"></div>

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
                onSelectChangeClientNames={handleSelectChangeEmployeeCompany}
              />
            </div>
          </div>
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
          <div className="sm:col-span-6"></div>
        </div>
        {isErrorMessage && (
          <ErrorAlert message="Please Add Another Expense Item!" />
        )}
        <div className="sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
          <div className="flex justify-end items-end mt-5">
            <button
              onClick={() => {
                setModalOpen(true);
                clearData();
                setErrorMessage(false);
              }}
              className="p-2 rounded bg-green-300 hover:bg-green-500 transition text-white"
            >
              Add Another Expense
            </button>
          </div>

          <TableRequestClaimDetail
            rowData={formDetailData}
            onClickDeleteItem={deleteItem}
          />
        </div>
        <div className="flex flex-row justify-center items-center pt-4 space-x-4">
          <button
            onClick={() => router.push("/my-documents")}
            className="p-2 bg-red-300 hover:bg-red-500 transition text-white rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-20 p-2 border roundedw-full bg-blue-400 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            save
          </button>
        </div>
        {/*</form>*/}
        <ModalExpenseClaimDetail
          isOpen={isModalOpen}
          onClose={() => {
            setModalOpen(false);
            //setFormDetailData([]);
          }}
          addItemDetail={handleAddItemDetail}
        />
      </div>

      {/* Popup Loading */}
      <Loading loading={loading} />
      
    </>
  );
}
