"use client";
import { useState, ChangeEvent, useRef, FormEvent } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Categories } from "@/app/models/Categories";
import { ClientNames } from "@/app/models/ClientNames";
import { Users } from "@/app/models/Users";
import { Upload, X } from "lucide-react";
import { SheetDataRow } from "@/app/models/SheetDataRow";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";
import { enGB } from "date-fns/locale";

interface DataCategoryDropDownProps {
  rowCategory: Categories[]; // Accept an array of SheetDataRow objects
  rowClientName: ClientNames[];
  rowRequester: Users[];
  rowApprover: Users[];
  addItemClaim: (item: SheetDataRow) => void;
  requestId?: string;
}
export default function FormAddClaim({
  rowCategory,
  rowClientName,
  rowRequester,
  rowApprover,
  addItemClaim,
  requestId
}: DataCategoryDropDownProps) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    requestId: requestId,
    requestDate: format(new Date(), "dd/MM/yyyy"),
    topic: "",
    detail: "",
    category: "",
    clientName: "",
    receipt: "",
    requester: "",
    requesterEmail: "",
    approver: "",
    approverEmail: "",
    approvalDate: "",
    status: "New",
    rejectReason: "",
  });
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      //requestDate: formatDate().formatDateToDisplay(e.target.value),
    });

    rowRequester
      .filter((item) => item.userName === e.target.value)
      .map((item) =>
        setFormData({
          ...formData,
          requesterEmail: item.email,
          requester: item.userName,
        })
      );
    rowApprover
      .filter((item) => item.userName === e.target.value)
      .map((item) =>
        setFormData({
          ...formData,
          approverEmail: item.email,
          approver: item.userName,
        })
      );
  };

  const handleUpload = (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    const newFile =
      "files" in e.target
        ? e.target.files?.[0]
        : (e as React.DragEvent<HTMLDivElement>).dataTransfer.files?.[0];
    if (newFile) {
      setFile(newFile);
      setFormData({ ...formData, receipt: newFile.name });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    /*addItemClaim(formData);

    setFormData({
      requestId: requestId,
      requestDate: format(new Date(), "dd/MM/yyyy"),
      topic: "",
      detail: "",
      category: "",
      clientName: "",
      receipt: "",
      requester: "",
      requesterEmail: "",
      approver: "",
      approverEmail: "",
      approvalDate: "",
      status: "New",
      rejectReason: "",
    });*/
  };

  return (
    <>
      <div className="max-w-full mx-auto p-6 bg-white rounded-lg">
        <h2 className="text-base/7 font-semibold text-gray-900">Add Claim</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12">
            <div className="sm:col-span-3">
              <label
                htmlFor="requestDate"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Request Date
              </label>
              <div className="mt-2 flex flex-col gap-2">
                <DatePicker
                  locale={enGB}
                  selected={
                    formData.requestDate
                      ? parse(formData.requestDate, "dd/MM/yyyy", new Date())
                      : null
                  }
                  onChange={(date) =>
                    setFormData({
                      ...formData,
                      requestDate: date ? format(date, "dd/MM/yyyy") : "",
                    })
                  }
                  dateFormat="dd/MM/yyyy"
                  placeholderText="DD/MM/YYYY"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
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
                  onChange={handleChange}
                  autoComplete="topic"
                  placeholder="Topic"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-6"></div>
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
                  onChange={handleChange}
                  autoComplete="detail"
                  placeholder="Detail"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
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
                  {rowCategory.map((item, index) => (
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
            <div className="sm:col-span-6"></div>
            <div className="sm:col-span-3">
              <label
                htmlFor="clientName"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Client Name
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="clientName"
                  name="clientName"
                  value={formData.clientName}
                  autoComplete="clientName"
                  onChange={handleChange}
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option value="">Select Category</option>
                  {rowClientName.map((item, index) => (
                    <option value={item.clientName} key={index}>
                      {item.clientName}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="status"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Status
              </label>
              <div className="mt-2">
                <input
                  disabled={true}
                  id="status"
                  name="status"
                  type="text"
                  value={formData.status}
                  onChange={handleChange}
                  autoComplete="status"
                  placeholder="Status"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-6"></div>
            <div className="sm:col-span-3">
              <label
                htmlFor="receipt"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Receipt
              </label>
              <div className="mt-2">
                <div
                  className="border-2 border-dashed border-gray-400 bg-gray-50 p-2 rounded-xl cursor-pointer hover:bg-gray-100 transition flex flex-col items-center gap-2"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleUpload}
                >
                  <Upload className="w-4 h-4 text-gray-500" />
                  <p className="text-gray-600 font-medium">
                    Drag & drop or{" "}
                    <span className="text-blue-500 underline">browse</span>
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleUpload}
                  />
                </div>

                {/* File Preview */}
                {file && (
                  <div className="mt-4 flex items-center gap-4 bg-white shadow-md p-4 rounded-lg">
                    <p className="text-gray-700 truncate max-w-[200px]">
                      {file.name}
                    </p>
                    <button
                      onClick={() => setFile(null)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="sm:col-span-9"></div>
            <div className="sm:col-span-3">
              <label
                htmlFor="clientName"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Requester
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="requester"
                  name="requester"
                  value={formData.requester}
                  autoComplete="requester"
                  onChange={handleChange}
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option value="">Select Requester</option>
                  {rowRequester.map((item, index) => (
                    <option value={item.userName} key={index}>
                      {item.userName}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="requesterEmail"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Requester Email
              </label>
              <div className="mt-2">
                <input
                  disabled={true}
                  id="requesterEmail"
                  name="requesterEmail"
                  type="text"
                  value={formData.requesterEmail}
                  onChange={handleChange}
                  autoComplete="requesterEmail"
                  placeholder="requesterEmail"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-6"></div>
            <div className="sm:col-span-3">
              <label
                htmlFor="approver"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Approver
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="approver"
                  name="approver"
                  value={formData.approver}
                  autoComplete="approver"
                  onChange={handleChange}
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option value="">Select Approver</option>
                  {rowApprover.map((item, index) => (
                    <option value={item.userName} key={index}>
                      {item.userName}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="approverEmail"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Approver Email
              </label>
              <div className="mt-2">
                <input
                  disabled={true}
                  id="approverEmail"
                  name="approverEmail"
                  type="text"
                  value={formData.approverEmail}
                  onChange={handleChange}
                  autoComplete="approverEmail"
                  placeholder="approverEmail"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-6"></div>
            <div className="sm:col-span-6">
              <div className="flex justify-center items-center mt-5">
                <button className="p-2 rounded bg-green-300 hover:bg-green-500 transition text-white">
                  Add Claim
                </button>
              </div>
            </div>
            <div className="sm:col-span-6"></div>
          </div>
        </form>
      </div>

    </>
  );
}
