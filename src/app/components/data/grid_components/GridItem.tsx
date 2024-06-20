import React, { useState } from "react";
import { StepchildFile } from "@/app/context/FilesContext";
import { formatPath } from "@/stepchild_interface/helper";
import BackOfButtonOutlineLarge from "../../button/backs/BackOfButtonOutlineLarge";
import BackOfButtonFillLarge from "../../button/backs/BackOfButtonFillLarge";
import BigMusicFileIcon from "../../icons/BigMusicFileIcon";
import GridActionButtons from "./GridActionButtons";

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
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      toggleSelected(file.id);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (e.shiftKey) {
      toggleShiftSelected(file.id);
    } else {
      toggleSelected(file.id);
    }
  };

  return (
    <div
      className={`p-12 relative leading-none text-textPrimary text-center select-none ${
        isSelected ? "invert-colors" : ""
      }`}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex relative z-[3] flex-col h-full justify-center items-center gap-3.5">
        <span>{file.name}</span>
        <div className="flex flex-col gap-2">
          <span className="text-12px font-regular text-textSecondary break-all">
            {formatPath(file.path)}
          </span>
          <span className="text-12px font-regular text-textSecondary">
            {file.fileSize} bytes
          </span>
        </div>
      </div>
      <BackOfButtonOutlineLarge mode={isSelected ? "file" : "file light"} />
      <BackOfButtonFillLarge mode="file" />
      {isHovered && <GridActionButtons data={file.data} id={file.id} />}
      {isSelected && (
        <div className="invert-colors absolute -left-0.5 -top-0.5 -bottom-0.5 -right-0.5">
          <BackOfButtonFillLarge mode="file" />
        </div>
      )}
    </div>
  );
}
