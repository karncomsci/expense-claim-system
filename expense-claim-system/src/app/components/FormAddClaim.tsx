"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Categories } from "@/app/models/Categories";

interface DataCategoryDropDownProps {
  rowMonth: Categories[]; // Accept an array of SheetDataRow objects
}
export default function FormAddClaim({ rowMonth }: DataCategoryDropDownProps) {
  const [formData, setFormData] = useState({
    requestDate: "",
    topic: "",
    detail: "",
    category: "",
    clientName: "",
    requester: "",
    requesterEmail: "",
    approver: "",
    approverEmail: "",
    approvalDate: "",
    status: "",
    rejectReason: "",
  });
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg">
      <h2 className="text-base/7 font-semibold text-gray-900">Add Claim</h2>
      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12">
        <div className="sm:col-span-6">
          <label
            htmlFor="requestDate"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Request Date
          </label>
          <div className="mt-2">
            <input
              id="requestDate"
              name="requestDate"
              type="date"
              value={formData.requestDate}
              onChange={handleChange}
              autoComplete="requestDate"
              placeholder="Request Date"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
        <div className="sm:col-span-6">
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
              onChange={handleChange}
              autoComplete="topic"
              placeholder="Topic"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
        <div className="sm:col-span-6">
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
              onChange={handleChange}
              autoComplete="detail"
              placeholder="Detail"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
        <div className="sm:col-span-6">
          <label
            htmlFor="category"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Category
          </label>
          <div className="mt-2 grid grid-cols-1">
            <select
              id="category"
              name="category"
              value={formData.category}
              autoComplete="claimedMonth"
              onChange={handleChange}
              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            >
              <option value="">Select Category</option>
              {rowMonth.map((item, index) => (
                <option value={item.category} key={index}>
                  {item.category}
                </option>
              ))}
            </select>
            <ChevronDownIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            />
          </div>
        </div>
        <div className="sm:col-span-6">
          <label
            htmlFor="clientName"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Client Name
          </label>
          <div className="mt-2 grid grid-cols-1">
            <select
              id="clientName"
              name="category"
              value={formData.clientName}
              autoComplete="clientName"
              onChange={handleChange}
              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            >
              <option value="">Select Category</option>
              {rowMonth.map((item, index) => (
                <option value={item.category} key={index}>
                  {item.category}
                </option>
              ))}
            </select>
            <ChevronDownIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
