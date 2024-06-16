import React, { useCallback, useEffect, useRef, useState } from "react";
import { StepchildFile } from "@/app/context/FilesContext";
import { SortConfig } from "@/app/panels/FilesPanel";
import TableHeader from "./TableHeader";
import TableCell from "./TableCell";
import TableResizer from "./TableResizer";
import MusicFileIcon from "../icons/MusicFileIcon";
import DitherGroup from "./DitherGroup";
import PixelButton from "../button/PixelButton";

type Props = {
  sortedFiles: StepchildFile[];
  requestSort: (key: string) => void;
  sortConfig: SortConfig | null;
};

function formatPath(path: string): string {
  return path.split("/")[path.split("/").length - 1];
}

export default function FilesTable({
  sortedFiles,
  requestSort,
  sortConfig,
}: Props) {
  const [columnWidths, setColumnWidths] = useState({
    icon: 75, //fixed
    name: 0, //dynamic
    fileName: 0, //dynamic
    fileSize: 150, //fixed
  });

  const tableRef = useRef<HTMLDivElement>(null);
  const nameResizeRef = useRef<HTMLDivElement>(null);

  const handleResize = useCallback(
    (key: "name", delta: number) => {
      setColumnWidths((prevWidths) => {
        const tableWidth = tableRef.current ? tableRef.current.offsetWidth : 0;
        const newWidths = {
          ...prevWidths,
          [key]: Math.max(prevWidths[key] + delta, 50),
        };

        const newUsedWidth =
          newWidths.icon + newWidths.name + newWidths.fileSize;
        newWidths.fileName = tableWidth - newUsedWidth;

        if (newWidths.fileName < 50) {
          const excess = 50 - newWidths.fileName;
          newWidths[key] -= excess;
          newWidths.fileName = 50;
        }

        return newWidths;
      });
    },
    [setColumnWidths]
  );

  useEffect(() => {
    const updateColumnWidths = () => {
      if (tableRef.current) {
        const tableRect = tableRef.current.getBoundingClientRect();
        const tableWidth = tableRect.width;

        setColumnWidths((prevWidths) => {
          const prevFileNameWidth = prevWidths.fileName;
          const prevNameWidth = prevWidths.name;
          const prevTotalWidth = prevFileNameWidth + prevNameWidth;
          const prevFileNameRatio = prevFileNameWidth / prevTotalWidth;
          const prevNameRatio = prevNameWidth / prevTotalWidth;
          const fileSizeWidth = prevWidths.fileSize;
          const iconWidth = prevWidths.icon;
          const currentRemainingWidth = tableWidth - fileSizeWidth - iconWidth;
          const fileNameWidth =
            prevWidths.fileName === 0
              ? currentRemainingWidth / 2
              : currentRemainingWidth * prevFileNameRatio;
          const nameWidth =
            prevWidths.name === 0
              ? currentRemainingWidth / 2
              : currentRemainingWidth * prevNameRatio;

          return {
            icon: iconWidth,
            name: nameWidth,
            fileName: fileNameWidth,
            fileSize: fileSizeWidth,
          };
        });
      }
    };

    updateColumnWidths();

    window.addEventListener("resize", updateColumnWidths);
    return () => window.removeEventListener("resize", updateColumnWidths);
  }, []);

  return (
    <div ref={tableRef} className="relative overflow-y-auto overflow-x-hidden">
      <TableResizer
        ref={nameResizeRef}
        onResize={(delta) => handleResize("name", delta)}
        style={{ left: `${columnWidths.name + columnWidths.icon}px` }}
      />
      <table className="min-w-full table-fixed">
        <thead>
          <tr>
            <th></th>
            <TableHeader
              columnKey="name"
              label="Name"
              width={columnWidths.name}
              requestSort={requestSort}
              sortConfig={sortConfig}
            />
            <TableHeader
              columnKey="path"
              label="Filename"
              width={columnWidths.fileName}
              requestSort={requestSort}
              sortConfig={sortConfig}
            />
            <TableHeader
              columnKey="fileSize"
              label="Size"
              width={columnWidths.fileSize}
              requestSort={requestSort}
              sortConfig={sortConfig}
            />
          </tr>
        </thead>
        <tbody>
          {sortedFiles.map((file) => (
            <tr
              key={file.id}
              className="border-textTertiary border-b-2 relative group"
            >
              <td
                className="p-3"
                style={{
                  width: columnWidths.icon,
                  maxWidth: columnWidths.icon,
                }}
              >
                <MusicFileIcon />
              </td>
              <TableCell width={columnWidths.name} content={file.name} />
              <TableCell
                width={columnWidths.fileName}
                content={formatPath(file.path)}
              />
              <TableCell
                width={columnWidths.fileSize}
                content={`${file.fileSize} bytes`}
              />
              <td className="hidden group-hover:flex absolute top-0 right-0 bottom-0 gap-2 items-center justify-end z-20">
                <PixelButton mode="outline">Download</PixelButton>
                <PixelButton mode="fill">Preview</PixelButton>
                <DitherGroup />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
