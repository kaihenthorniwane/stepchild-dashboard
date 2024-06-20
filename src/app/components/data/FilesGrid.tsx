import React from "react";
import { StepchildFile } from "@/app/context/FilesContext";
import GridItem from "./grid_components/GridItem";
import DropdownButton from "../button/DropdownButton";
import { SortConfig } from "@/app/panels/FilesPanel";
type Props = {
  sortedFiles: StepchildFile[];
  requestSort: (key: string) => void;
  sortConfig: SortConfig | null;
  selectedRowIds: number[];
  handleRowClick: (id: number) => void;
  handleShiftRowClick: (id: number) => void;
};

export default function FilesGrid({
  sortedFiles,
  requestSort,
  sortConfig,
  selectedRowIds,
  handleRowClick,
  handleShiftRowClick,
}: Props) {
  return (
    <div className="flex flex-col gap-4 overflow-y-auto">
      <div className="flex gap-4 sticky top-0 bg-bgPrimary z-[5]">
        {/* <DropdownButton
          text={`Sorting by ${sortConfig?.key} ${sortConfig?.direction}`}
          direction="downwards"
          mode="outline"
          horizontalDirection="right"
        >
          <button onClick={() => requestSort("name")} className="btn">
            Name
          </button>
          <button onClick={() => requestSort("path")} className="btn">
            Filename
          </button>
          <button onClick={() => requestSort("fileSize")} className="btn">
            Size
          </button>
        </DropdownButton> */}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-0.5">
        {sortedFiles.map((file) => (
          <GridItem
            file={file}
            key={file.id}
            isSelected={selectedRowIds.some((a) => a === file.id)}
            toggleSelected={handleRowClick}
            toggleShiftSelected={handleShiftRowClick}
          />
        ))}
      </div>
    </div>
  );
}
