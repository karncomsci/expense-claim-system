"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { getSheetMasterData } from "@/app/api/google-sheets.master";
import { ClientNames } from "@/app/models/ClientNames";
import { masterService } from "@/app/services/master-service";
import mapData from "@/app/mapper/map-data";
//import { ExpenseClaim } from "@/app/models/ExpenseClaim";

interface SelectDropdownProps {
  value?: string;
  onChange: (value: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  type?: string;
  onSelectChangeClientNames: (data: ClientNames) => void;
}

const SelectDropdown = ({
  value,
  onChange,
  type,
  onSelectChangeClientNames,
}: SelectDropdownProps) => {
  const [dataClientName, setDataClientName] = useState<ClientNames[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("clientName")) {
        const clientNames = localStorage.getItem("clientName");
        if (clientNames) {
          setDataClientName(JSON.parse(clientNames) as ClientNames[]);
        }
      } else {
        masterService().then((res) => {
          setDataClientName(res.clientName as ClientNames[]);
          res.clientName
            ? localStorage.setItem("clientName", JSON.stringify(res.clientName))
            : [];
        });
      }
    };


    fetchData();
  }, []);

  const handleChangeClientNames = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedKey = event.target.value;
    const selectedItem = dataClientName.find(
      (item) => item.clientName === selectedKey
    );

    if (selectedItem) {
      onSelectChangeClientNames(selectedItem); // ส่งค่าไปยัง Parent
    }
  };

  return (
    <>
      <select
        id="clientName"
        name="clientName"
        value={value}
        autoComplete="clientName"
        onChange={handleChangeClientNames}
        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
      >
        <option value="">Select Employee Company</option>
        {dataClientName.map((item, index) => (
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
