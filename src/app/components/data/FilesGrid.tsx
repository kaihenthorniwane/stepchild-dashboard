import React from "react";
import { StepchildFile } from "@/app/context/FilesContext";
import GridItem from "./grid_components/GridItem";

type Props = {
  sortedFiles: StepchildFile[];
  requestSort: (key: string) => void;
  selectedRowIds: number[];
  handleRowClick: (id: number) => void;
  handleShiftRowClick: (id: number) => void;
};

export default function FilesGrid({
  sortedFiles,
  requestSort,
  selectedRowIds,
  handleRowClick,
  handleShiftRowClick,
}: Props) {
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex gap-4">
        <button onClick={() => requestSort("name")} className="btn">
          Name
        </button>
        <button onClick={() => requestSort("path")} className="btn">
          Filename
        </button>
        <button onClick={() => requestSort("fileSize")} className="btn">
          Size
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
