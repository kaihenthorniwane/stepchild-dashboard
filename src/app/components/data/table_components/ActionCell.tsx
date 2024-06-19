import { useState, useRef, useEffect, use } from "react";
import PixelButton from "../../button/PixelButton";
import DitherGroup from "./DitherGroup";
import DownloadIcon from "../../icons/DownloadIcon";
import DropdownButton from "../../button/DropdownButton";
import { useFilesPanelSettings } from "@/app/context/FilesPanelSettingsContext";

type Props = {
  data: ArrayBuffer;
  id: number;
  shown: boolean;
};

export default function ActionCell({ data, shown, id }: Props) {
  const { state } = useFilesPanelSettings();
  return (
    <td
      className="group relative min-w-0 max-w-0 w-0 top-auto bottom-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {shown && (
        <div className="flex absolute min-w-max top-0 right-2 bottom-0 gap-2 items-center justify-end z-20">
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
          <DitherGroup />
        </div>
      )}
    </td>
  );
}
