import React from "react";
import Clickable from "../button/Clickable";
import SmallDropdownIcon from "../icons/SmallDropdownIcon";
import { SortConfig } from "@/app/panels/FilesPanel";

type TableHeaderProps = {
  columnKey: string;
  label: string;
  width: number;
  requestSort: (key: string) => void;
  sortConfig: SortConfig | null;
};

const TableHeader: React.FC<TableHeaderProps> = ({
  columnKey,
  label,
  width,
  requestSort,
  sortConfig,
}) => {
  return (
    <th
      style={{ width: `${width}px`, maxWidth: `${width}px` }}
      className="overflow-hidden"
    >
      <Clickable
        onClick={() => requestSort(columnKey)}
        mode="secondary"
        additionalClasses="w-full flex items-center font-regular text-12px uppercase p-2 gap-1.5"
      >
        <span>{label}</span>
        <div className="pb-0.5">
          <SmallDropdownIcon
            isOpen={
              sortConfig
                ? sortConfig.key === columnKey &&
                  sortConfig.direction === "ascending"
                : false
            }
          />
        </div>
      </Clickable>
    </th>
  );
};

export default TableHeader;
