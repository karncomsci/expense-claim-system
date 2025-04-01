"use client";
import { useState, useEffect,ChangeEvent } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Years } from "@/app/models/Years";
import mapData from "@/app/mapper/map-data";
import { getSheetMasterData } from "@/app/api/google-sheets.master";

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
  const [dataYear, setDataYear] = useState<Years[]>([]);

  useEffect(() => {
      const fetchData = async () => {
        const res = await getSheetMasterData();
        if (res.year && Array.isArray(res.year)) {
          const year: Years[] = mapData().mapSheetDataYear(
            res.year as string[][]
          );
          setDataYear(year);
        }else {
          console.error("Invalid data format received:", res.year);
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
        <option value="">Select Claimed Year</option>
        {dataYear.map((item, index) => (
          <option value={item.year} key={index}>
            {item.year}
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
