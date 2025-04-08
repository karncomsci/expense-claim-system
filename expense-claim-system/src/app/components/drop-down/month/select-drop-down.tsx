"use client";
import { useState, useEffect,ChangeEvent } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Months } from "@/app/models/Months";
import { masterService } from "@/app/services/master-service";



interface SelectDropdownProps {
  value?: string;
  onChange: (value: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  type?: string;
}

const SelectDropdown = ({
  value,
  onChange,
  type,
}: SelectDropdownProps) => {
  const [dataMonth, setDataMonth] = useState<Months[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      if(localStorage.getItem('month')){
              const monthData = localStorage.getItem('month');
              if (monthData) {
                setDataMonth(JSON.parse(monthData) as Months[]);
              }
            }else{
              masterService()
              .then(res => {
                setDataMonth(res.month as Months[]);
                res.month ? localStorage.setItem('month', JSON.stringify(res.month)) : []})
            }
        
    };
    fetchData();

    //console.log(data);
  }, []);
  return (
    <>
      <select
        id="claimedMonth"
        name="claimedMonth"
        value={value}
        autoComplete="claimedMonth"
        onChange={onChange}
        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
      >
        <option value="">Select Claimed Month</option>
        {dataMonth.map((item, index) => (
          <option value={item.month} key={index}>
            {item.month}
          </option>
        ))}
      </select>
      <ChevronDownIcon
        aria-hidden="true"
        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
      />
    </>
  );
};
export default SelectDropdown;
