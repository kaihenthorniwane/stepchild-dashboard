import React from "react";
import { StepchildFile } from "@/app/context/FilesContext";

type Props = {
  file: StepchildFile;
  isSelected: boolean;
  toggleSelected: (id: number) => void;
  toggleShiftSelected: (id: number) => void;
};

export default function GridItem({
  file,
  isSelected,
  toggleSelected,
  toggleShiftSelected,
}: Props) {
  const handleClick = (e: React.MouseEvent) => {
    if (e.shiftKey) {
      toggleShiftSelected(file.id);
    } else {
      toggleSelected(file.id);
    }
  };

  return (
    <div
      className={`p-4 border rounded ${isSelected ? "invert-colors" : ""}`}
      onClick={handleClick}
    >
      <div className="flex flex-col items-start">
        <span className="font-bold">{file.name}</span>
        <span className="text-sm ">{file.path}</span>
        <span className="text-sm">{file.fileSize} bytes</span>
      </div>
    </div>
  );
}
