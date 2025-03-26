/*import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState, ChangeEvent } from "react"
import {Month} from "@/app/models/Month"
export default function SelectDropDown({formData}: Month) {
    const [formData, setFormData] = useState({});
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            setFormData({
              ...formData,
              [e.target.name]: e.target.value
            });
          };
  return (
    <div>
      <select
        id="category"
        name="category"
        value={formData.category}
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
  );
} */