import { useState, useRef, useEffect, use } from "react";
import PixelButton from "../../button/PixelButton";
import DownloadIcon from "../../icons/DownloadIcon";
import DropdownButton from "../../button/DropdownButton";
import { useFilesPanelSettings } from "@/app/context/FilesPanelSettingsContext";
import GridDitherGroup from "./GridDitherGroup";

type Props = {
  data: ArrayBuffer;
  id: number;
};

export default function GridActionButtons({ data, id }: Props) {
  const { state } = useFilesPanelSettings();
  return (
    <div className="absolute left-0 right-0 bottom-0 p-3 leading-normal z-20">
      <div
        className="flex flex-col justify-end gap-2 relative z-[1]"
        onClick={(e) => e.stopPropagation()}
      >
        {state.defaultDownloadFormat === "none" && (
          <DropdownButton
            text="Download"
            openedText="Download as"
            showIconWhenClosed={false}
            direction={"downwards"}
            ancestorLevelToCheck={6}
            showDropdownIcon={false}
            IconComponent={<DownloadIcon />}
          >
            <div className="flex flex-col gap-1.5">
              <PixelButton mode="fill" size="small">
                .MIDI
              </PixelButton>
              <PixelButton mode="fill" size="small">
                .CHILD
              </PixelButton>
            </div>
            <p className="text-12px font-regular text-textSecondary">
              YOU CAN SET YOUR DEFAULT DOWNLOAD OPTION IN SETTINGS.
            </p>
          </DropdownButton>
        )}
        {state.defaultDownloadFormat !== "none" && (
          <PixelButton mode="outline" size="large">
            Download
          </PixelButton>
        )}
        <PixelButton mode="fill">Preview</PixelButton>
      </div>
      <div className="absolute -top-4 right-2 left-2 bottom-2 overflow-hidden">
        <GridDitherGroup />
      </div>
    </div>
  );
}
