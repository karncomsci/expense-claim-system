"use client";
import { useState, useEffect,ChangeEvent } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { getSheetMasterData } from "@/app/api/google-sheets.master";
import { Employees } from "@/app/models/Employees";
import mapData from "@/app/mapper/map-data";
//import { ExpenseClaim } from "@/app/models/ExpenseClaim";

interface SelectDropdownProps {
  value?: string;
  onChange: (value: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  type?: string;
  onSelectChangeEmployee: (data: Employees) => void;
}

const SelectDropdown = ({
  value,
  onChange,
  type,
  onSelectChangeEmployee
}: SelectDropdownProps) => {
  const [dataEmployee, setDataEmployee] = useState<Employees[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSheetMasterData();

      if (res.employee && Array.isArray(res.employee)) {
        const employee: Employees[] = mapData().mapSheetDataEmployee(
          res.employee as string[][]
        );
        setDataEmployee(employee);
      }else {
        console.error("Invalid data format received:", res.employee);
      }
    }
   
    fetchData();
  }, []);

  const handleChangeEmployee = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedKey = event.target.value;
    const selectedItem = dataEmployee.find((item) => item.employeeId === selectedKey);

    if (selectedItem) {
      onSelectChangeEmployee(selectedItem); // ส่งค่าไปยัง Parent
    }
  }
  
  return (
    <>
      <select
        id="employeeId"
        name="employeeId"
        value={value}
        autoComplete="employeeId"
        onChange={handleChangeEmployee}
        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
      >
        <option value="">Select Employee</option>
        {dataEmployee.map((item, index) => (
          <option value={item.employeeId} key={index}>
            {item.employeeName}
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
