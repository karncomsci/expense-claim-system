"use client"
import { useState, ChangeEvent, FormEvent } from "react";
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function SearchClaim() {
const [formData, setFormData] = useState({
    claimedMonth: "",
    claimedYear: "",
    name: "",
    employeeId: "",
    employeeCompany: "", 
    approver: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    //setFormData({ claimedMonth: "", claimedYear: "", name: "", employeeId: "", employeeCompany: "", Approver: "" });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess('');

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
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg">
    <h2 className="text-base/7 font-semibold text-gray-900">Search Claim</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12">
            <div className="sm:col-span-6">
              <label htmlFor="claimedMonth" className="block text-sm/6 font-medium text-gray-900">
                Claimed Month
              </label>
                <div className="mt-2 grid grid-cols-1">
                    <select
                        id="claimedMonth"
                        name="claimedMonth"
                        value={formData.claimedMonth}
                        autoComplete="claimedMonth"
                        onChange={handleChange}
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                        <option value="">Select Month</option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>
                        <ChevronDownIcon
                            aria-hidden="true"
                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        />
                </div>
            </div>
            <div className="sm:col-span-6">
              <label htmlFor="claimedYear" className="block text-sm/6 font-medium text-gray-900">
                Claimed Year
              </label>
                <div className="mt-2 grid grid-cols-1">
                    <select
                        id="claimedYear"
                        name="claimedYear"
                        value={formData.claimedYear}
                        onChange={handleChange}
                        autoComplete="claimedYear"
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                        <option value="">Select Year</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                    </select>
                        <ChevronDownIcon
                            aria-hidden="true"
                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        />
                </div>
            </div>
            <div className="sm:col-span-6">
              <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  placeholder="Name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-6">
              <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                Employee ID
              </label>
              <div className="mt-2">
                <input
                  id="employeeId"
                  name="employeeId"
                  type="text"
                  value={formData.employeeId}
                  onChange={handleChange}
                  autoComplete="employeeId"
                  placeholder="Employee ID"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-6">
              <label htmlFor="employeeCompany" className="block text-sm/6 font-medium text-gray-900">
              Employee Company
              </label>
                <div className="mt-2 grid grid-cols-1">
                    <select
                        id="employeeCompany"
                        name="employeeCompany"
                        value={formData.employeeCompany}
                        onChange={handleChange}
                        autoComplete="employeeCompany"
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                        <option value="">Select Company</option>
                        <option value="Nityo">Nityo</option>
                    </select>
                        <ChevronDownIcon
                            aria-hidden="true"
                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        />
                </div>
            </div>
            <div className="sm:col-span-6">
              <label htmlFor="approver" className="block text-sm/6 font-medium text-gray-900">
              Approver
              </label>
                <div className="mt-2 grid grid-cols-1">
                    <select
                        id="approver"
                        name="approver"
                        value={formData.approver}
                        onChange={handleChange}
                        autoComplete="approver"
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                        <option value="">Select Approver</option>
                        <option value="Sunisa W.">Sunisa W.</option>
                    </select>
                        <ChevronDownIcon
                            aria-hidden="true"
                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        />
                </div>
            </div>
        </div>
        <button
          type="submit"
          className="w-full p-2 border roundedw-full bg-blue-400 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Search
        </button>
    </form>
    </div>
  );
};

  /*<div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              ></textarea>
            </div> */
