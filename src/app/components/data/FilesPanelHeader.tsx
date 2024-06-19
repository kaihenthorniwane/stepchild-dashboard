import { StepchildFile } from "@/app/context/FilesContext";
import { useCallback, useEffect } from "react";
import PixelButton from "../button/PixelButton";
import SelectAllIcon from "../icons/SelectAllIcon";
import DropdownButton from "../button/DropdownButton";
import DownloadIcon from "../icons/DownloadIcon";
import { useFilesPanelSettings } from "@/app/context/FilesPanelSettingsContext";
import ToggleButton from "../button/ToggleButton";

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
  const { state, dispatch } = useFilesPanelSettings();

  const handleControlAllClick = useCallback(() => {
    if (selectedRowIds.length === sortedFiles.length) {
      setSelectedRowIds([]);
    } else {
      setSelectedRowIds(sortedFiles.map((file) => file.id));
    }
  }, [selectedRowIds, sortedFiles, setSelectedRowIds]);

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

  const fileFormatToggleOptions = [
    {
      text: ".MIDI",
      isSelected: state.defaultDownloadFormat === ".midi",
      handleClick: () => {
        dispatch({ type: "SET_DEFAULT_DOWNLOAD_FORMAT", payload: ".midi" });
      },
    },
    {
      text: ".CHILD",
      isSelected: state.defaultDownloadFormat === ".child",
      handleClick: () => {
        dispatch({ type: "SET_DEFAULT_DOWNLOAD_FORMAT", payload: ".child" });
      },
    },
    {
      text: "None",
      isSelected: state.defaultDownloadFormat === "none",
      handleClick: () => {
        dispatch({ type: "SET_DEFAULT_DOWNLOAD_FORMAT", payload: "none" });
      },
    },
  ];

  return (
    <div className="flex justify-between items-center">
      <span className="font-slab text-56px text-left">Files</span>
      <div className="flex flex-col items-end sm:flex-row sm:items-center gap-2">
        <PixelButton onClick={handleControlAllClick} mode="outline">
          <SelectAllIcon selected={areAllSelected} />
          <span>{areAllSelected ? "Deselect All" : "Select All"}</span>
        </PixelButton>
        {showActionButtons && state.defaultDownloadFormat === "none" && (
          <DropdownButton
            text="Download Selected"
            direction="downwards"
            mode="fill"
            showDropdownIcon={false}
            openedText="Download Selected as"
            IconComponent={<DownloadIcon className="bg-transparent" />}
          >
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1.5">
                <PixelButton mode="fill" size="small">
                  .MIDI
                </PixelButton>
                <PixelButton mode="fill" size="small">
                  .CHILD
                </PixelButton>
              </div>
            </div>
            <p className="text-12px font-regular text-textSecondary">
              YOU CAN SET YOUR DEFAULT DOWNLOAD OPTION IN SETTINGS.
            </p>
          </DropdownButton>
        )}
        {showActionButtons && state.defaultDownloadFormat !== "none" && (
          <PixelButton
            mode="fill"
            size="large"
            IconComponent={<DownloadIcon className="bg-transparent" />}
          >
            Download Selected
          </PixelButton>
        )}
        <DropdownButton text={"Settings"} direction={"downwards"}>
          <div className="leading-none flex flex-col gap-3">
            <span className="w-max">Default file download type</span>
            <ToggleButton toggleOptions={fileFormatToggleOptions} />
          </div>
        </DropdownButton>
      </div>
    </div>
  );
}
