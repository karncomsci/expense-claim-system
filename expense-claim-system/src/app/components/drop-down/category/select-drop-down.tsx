"use client";
import { useState, useEffect,ChangeEvent } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Categories } from "@/app/models/Categories";
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
  const [dataCategory, setDataCategory] = useState<Categories[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getSheetMasterData();
      if (res.category && Array.isArray(res.category)) {
        const category: Categories[] = mapData().mapSheetDataCategory(
          res.category as string[][]
        );
        setDataCategory(category);
      } else {
        console.error("Invalid data format received:", res.category);
      }
        
    };
    fetchData();

    //console.log(data);
  }, []);
  return (
    <>
      <select
        id="category"
        name="category"
        value={value}
        autoComplete="category"
        onChange={onChange}
        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
      >
        <option value="">Select Category</option>
        {dataCategory.map((item, index) => (
          <option value={item.category} key={index}>
            {item.category}
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
