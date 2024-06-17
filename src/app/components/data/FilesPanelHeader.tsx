import { StepchildFile } from "@/app/context/FilesContext";
import { useEffect } from "react";
import DownloadMenuButton from "./DownloadMenuButton";
import PixelButton from "../button/PixelButton";
import SelectAllIcon from "../icons/SelectAllIcon";

type Props = {
  sortedFiles: StepchildFile[];
  selectedRowIds: number[];
  setSelectedRowIds: (ids: number[]) => void;
};

export default function FilesPanelHeader({
  sortedFiles,
  selectedRowIds,
  setSelectedRowIds,
}: Props) {
  const handleControlAllClick = () => {
    if (selectedRowIds.length === sortedFiles.length) {
      setSelectedRowIds([]);
    } else {
      setSelectedRowIds(sortedFiles.map((file) => file.id));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "a" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleControlAllClick();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [sortedFiles, selectedRowIds, handleControlAllClick]);

  const showActionButtons = selectedRowIds.length > 0;
  const areAllSelected = selectedRowIds.length === sortedFiles.length;
  const dataArrayForDownloadMenuButton = sortedFiles.map((file) => file.data);

  return (
    <div className="flex justify-between items-center">
      <span className="font-slab text-56px text-left">Files</span>
      <div className="flex flex-col items-end sm:flex-row sm:items-center gap-2">
        <PixelButton onClick={handleControlAllClick} mode="outline">
          <SelectAllIcon selected={areAllSelected} />
          <span>{areAllSelected ? "Deselect All" : "Select All"}</span>
        </PixelButton>
        {showActionButtons && (
          <DownloadMenuButton
            mode="multiple download"
            data={dataArrayForDownloadMenuButton}
          />
        )}
      </div>
    </div>
  );
}
