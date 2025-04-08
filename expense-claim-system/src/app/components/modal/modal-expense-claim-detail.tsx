import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";
import { enGB } from "date-fns/locale";
import { useState, FormEvent, useRef } from "react";
import { ExpenseClaimDetail } from "@/app/models/ExpenseClaimDetail";
import SelectDropDownCategory from "@/app/components/drop-down/category/select-drop-down";

interface ModalExpenseClaimDetailProps {
  isOpen: boolean;
  onClose: () => void;
  //onSubmit: () => void;
  addItemDetail: (item: ExpenseClaimDetail) => void;
}

export default function ModalExpenseClaimDetail({
  isOpen,
  onClose,
  //onSubmit,
  addItemDetail,
}: ModalExpenseClaimDetailProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const generateId = (): string => {
    return `RD-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  };

  const [formData, setFormData] = useState<ExpenseClaimDetail>({
    requestDetailId: generateId(),
    requestDate: format(new Date(), "dd/MM/yyyy"),
    category: "",
    client: "",
    from: "",
    to: "",
    amount: "",
    receiptFile: "",
    receiptName: "",
    requestId: "",
  });
  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addItemDetail(formData);

    setFormData({
      requestDetailId: generateId(),
      requestDate: format(new Date(), "dd/MM/yyyy"),
      category: "",
      client: "",
      from: "",
      to: "",
      receiptFile: "",
      receiptName: "",
      amount: "",
      requestId: "",
    });
  };

  /*const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      receiptFile: event.target.files ? event.target.files[0] : "",
    }));
    console.log(formData.receiptFile);
  };*/

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newFile = (e.target as HTMLInputElement).files ? (e.target as HTMLInputElement).files?.[0] : "";
    if (newFile) 
      setFormData((prev) => ({
        ...prev,
        receiptFile: newFile ? newFile : "", 
        receiptName: newFile ? newFile.name : "",
      }));
      //console.log(formData.receiptName);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2">
      <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
          <h2 className="text-base/7 font-semibold text-gray-900">
            Add Another Expense
          </h2>
          <br />
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="sm:col-span-12">
              <label
                htmlFor="topic"
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
            <div className="sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
              <label
                htmlFor="requestDate"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Category
              </label>
              <div className="mt-2 grid grid-cols-1">
                <SelectDropDownCategory
                  value={formData?.category}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
              <label
                htmlFor="amount"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Amount
              </label>
              <div className="mt-2">
                <input
                  id="amount"
                  name="amount"
                  type="text"
                  value={formData.amount}
                  onChange={(e) => {
                    const rawValue = e.target.value;
                    if (rawValue === "" || /^-?\d*\.?\d*$/.test(rawValue)) {
                      setFormData((prev) => ({
                        ...prev,
                        amount: rawValue,
                      }));
                    }
                  }}
                  onBlur={() => {
                    if (formData.amount !== "") {
                      setFormData((prev) => ({
                        ...prev,
                        amount: parseFloat(formData.amount).toFixed(2),
                      }));
                    }
                  }}
                  autoComplete="amount"
                  placeholder="Amount"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
              <label
                htmlFor="amount"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Receipt
              </label>
              <div className="mt-2">
                <div className="max-w-lg mx-auto text-center sm:col-span-12">
                  <div
                    className="border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer hover:bg-gray-100"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleUpload}
                  >
                    <input type="file" className="hidden" ref={fileInputRef} onChange={handleUpload} />
                    <p className="text-gray-500">Select <span className="text-blue-500 underline">Browse</span></p> 
                  </div>
                  {formData.receiptFile && <p className="mt-2 text-left text-gray-700">{formData.receiptName}</p>}
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  onClose();
                  setFormData({
                    requestDetailId: generateId(),
                    requestDate: format(new Date(), "dd/MM/yyyy"),
                    category: "",
                    client: "",
                    from: "",
                    to: "",
                    receiptFile: "",
                    receiptName: "",
                    amount: "",
                    requestId: "",
                  })
                }}
                className="p-2  bg-gray-300 hover:bg-gray-500 transition text-white rounded "
              >
                Cancel
              </button>
              <button className="p-2 bg-blue-300 hover:bg-blue-500 transition text-white rounded">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
