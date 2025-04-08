"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { masterService } from "@/app/services/master-service";
import SelectDropdownMonth from "./drop-down/month/select-drop-down";
import SelectDropdownYear from "./drop-down/year/select-drop-down";
import SelectDropDownEmployeeCompany from "./drop-down/employee-company/select-drop-down";
import SelectDropDownApprover from "./drop-down/approver/select-drop-down";
import { ClientNames } from "@/app/models/ClientNames";
import { Employees } from "@/app/models/Employees";
import type { SearchExpenseClaim } from "@/app/models/SearchExpenseClaim";

export default function SearchExpenseClaim() {
  const [formData, setFormData] = useState<SearchExpenseClaim>({
    claimedMonth: "",
    claimedYear: "",
    name: "",
    employeeId: "",
    employeeCompany: "",
    approverId: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const master = await masterService();
      localStorage.setItem(
        "approver",
        JSON.stringify(master.approver ? master.approver : [])
      );
      localStorage.setItem(
        "month",
        JSON.stringify(master.month ? master.month : [])
      );
      localStorage.setItem(
        "year",
        JSON.stringify(master.year ? master.year : [])
      );
    };
    fetchData();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    //setFormData({ claimedMonth: "", claimedYear: "", name: "", employeeId: "", employeeCompany: "", Approver: "" });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess("");

    console.log(formData);

    /*try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccess("Form submitted successfully!"); 
        setFormData({ claimedMonth: "", claimedYear: "", name: "", employeeId: "", employeeCompany: "", Approver: "" });
      } else {
        setSuccess("Failed to submit the form."); 
      }
    } catch (error) {
      setSuccess("An error occurred. Please try again."); 
    }*/

    setIsSubmitting(false);
  };
  const handleSelectChangeEmployeeCompany = (data: ClientNames) => {
      if (data) {
        if (data.clientName) {
          setFormData((prev) => ({
            ...prev,
            employeeCompany: data.clientName,
          }));
        }
      }
    };
    const handleSelectChangeApprover = (data: Employees) => {
        if (data) {
          if (data.employeeId) {
            setFormData((prev) => ({
              ...prev,
              employeeId: data.employeeId,
            }));
          }
        }
      };
  return (
    <div className="max-w-full mx-auto p-2 bg-white rounded-lg">
      <h2 className="text-base/7 font-semibold text-gray-900">Search Claim</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12">
          <div className="sm:col-span-3">
            <label
              htmlFor="claimedMonth"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Claimed Month
            </label>
            <div className="mt-2 grid grid-cols-1">
              <SelectDropdownMonth
                value={formData.claimedMonth}
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
              htmlFor="claimedYear"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Claimed Year
            </label>
            <div className="mt-2 grid grid-cols-1">
              <SelectDropdownYear
                value={formData.claimedYear}
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
              htmlFor="name"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                autoComplete="name"
                placeholder="Name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="name"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Employee ID
            </label>
            <div className="mt-2">
              <input
                id="employeeId"
                name="employeeId"
                type="text"
                value={formData.employeeId}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    employeeId: e.target.value,
                  }))
                }
                autoComplete="employeeId"
                placeholder="Employee ID"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div className="sm:col-span-6"></div>
          <div className="sm:col-span-3">
            <label
              htmlFor="employeeCompany"
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
              htmlFor="approver"
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
          <div className="sm:col-span-6">
            <div className="flex justify-center items-center pt-4">
              <button
                type="submit"
                className="w-25 border roundedw-full bg-blue-400 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                Search
              </button>
            </div>
          </div>
          <div className="sm:col-span-6"></div>
        </div>
      </form>
    </div>
  );
}

