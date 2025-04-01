"use client";
import { useState, useEffect,ChangeEvent } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ClientNames } from "@/app/models/ClientNames";
import mapData from "@/app/mapper/map-data";
import { getSheetMasterData } from "@/app/api/google-sheets.master";



interface SelectDropdownProps {
  value?: string;
  onChange: (value: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  type?: string;
  onSelectChangeEmployeeCompany: (data: ClientNames) => void;
}

const SelectDropdown = ({
  value,
  onChange,
  type,
  onSelectChangeEmployeeCompany
}: SelectDropdownProps) => {
  const [dataEmployeeCompany, setDataEmployeeCompany] = useState<ClientNames[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getSheetMasterData();
      if (res.clientName && Array.isArray(res.clientName)) {
        const employeeCompany: ClientNames[] = mapData().mapSheetDataClientName(
          res.clientName as string[][]
        );
        setDataEmployeeCompany(employeeCompany);
      } else {
        console.error("Invalid data format received:", res.clientName);
      }
        
    };
    fetchData();

    //console.log(data);
  }, []);

  const handleSelectChangeEmployeeCompany = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedKey = event.target.value;
    const selectedItem = dataEmployeeCompany.find((item) => item.clientName === selectedKey);

    if (selectedItem) {
      onSelectChangeEmployeeCompany(selectedItem); // ส่งค่าไปยัง Parent
    }
  }
  return (
    <>
      <select
        id="employeeCompany"
        name="employeeCompany"
        value={value}
        autoComplete="employeeCompany"
        onChange={handleSelectChangeEmployeeCompany}
        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
      >
        <option value="">Select Employee Company</option>
        {dataEmployeeCompany.map((item, index) => (
          <option value={item.clientName} key={index}>
            {item.clientName}
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
