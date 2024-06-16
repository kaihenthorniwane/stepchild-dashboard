import React, { useCallback, useEffect, useRef, useState } from "react";
import { StepchildFile } from "@/app/context/FilesContext";
import { SortConfig } from "@/app/panels/FilesPanel";
import Clickable from "../button/Clickable";
import SmallDropdownIcon from "../icons/SmallDropdownIcon";
import TableResizer from "./TableResizer";

type Props = {
  sortedFiles: StepchildFile[];
  requestSort: (key: string) => void;
  sortConfig: SortConfig | null;
};

function formatPath(path: string): string[] {
  return path.split("/");
}

export default function FilesTable({
  sortedFiles,
  requestSort,
  sortConfig,
}: Props) {
  const [columnWidths, setColumnWidths] = useState({
    name: 200,
    path: 300,
    fileSize: 100, // Initial width for the last column
  });

  const tableRef = useRef<HTMLDivElement>(null);
  const nameResizeRef = useRef<HTMLDivElement>(null);
  const pathResizeRef = useRef<HTMLDivElement>(null);

  const handleResize = useCallback(
    (key: "name" | "path", delta: number) => {
      setColumnWidths((prevWidths) => {
        const tableWidth = tableRef.current ? tableRef.current.offsetWidth : 0;
        const newWidths = {
          ...prevWidths,
          [key]: Math.max(prevWidths[key] + delta, 50), // Ensuring a minimum width
        };

        const newUsedWidth = newWidths.name + newWidths.path;
        newWidths.fileSize = tableWidth - newUsedWidth;

        // Restrict dragging beyond table width
        if (newWidths.fileSize < 50) {
          const excess = 50 - newWidths.fileSize;
          newWidths[key] -= excess;
          newWidths.fileSize = 50;
        }

        return newWidths;
      });
    },
    [setColumnWidths]
  );

  useEffect(() => {
    const updateColumnWidths = () => {
      if (tableRef.current && nameResizeRef.current && pathResizeRef.current) {
        const tableRect = tableRef.current.getBoundingClientRect();
        const nameHandleRect = nameResizeRef.current.getBoundingClientRect();
        const pathHandleRect = pathResizeRef.current.getBoundingClientRect();

        const nameWidth = nameHandleRect.left - tableRect.left;
        const pathWidth = pathHandleRect.left - tableRect.left - nameWidth;
        const tableWidth = tableRect.width;
        const fileSizeWidth = tableWidth - nameWidth - pathWidth;

        setColumnWidths({
          name: nameWidth,
          path: pathWidth,
          fileSize: fileSizeWidth,
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
        ref={pathResizeRef}
        onResize={(delta) => handleResize("path", delta)}
        style={{ left: `${columnWidths.name + columnWidths.path}px` }}
      />
      <TableResizer
        ref={nameResizeRef}
        onResize={(delta) => handleResize("name", delta)}
        style={{ left: `${columnWidths.name}px` }}
      />
      <table className="min-w-full table-fixed">
        <thead>
          <tr>
            <th style={{ width: `${columnWidths.name}px` }}>
              <Clickable
                onClick={() => requestSort("name")}
                mode="secondary"
                additionalClasses="w-full flex items-center font-regular text-12px uppercase p-2 gap-1.5"
              >
                <span>Name</span>
                <div className="pb-0.5">
                  <SmallDropdownIcon
                    isOpen={
                      sortConfig
                        ? sortConfig.key === "name" &&
                          sortConfig.direction === "ascending"
                        : false
                    }
                  />
                </div>
              </Clickable>
            </th>
            <th style={{ width: `${columnWidths.path}px` }}>
              <div className="flex font-regular text-12px uppercase text-textSecondary p-2">
                Path
              </div>
            </th>
            <th style={{ width: `${columnWidths.fileSize}px` }}>
              <Clickable
                onClick={() => requestSort("fileSize")}
                mode="secondary"
                additionalClasses="w-full flex items-center font-regular text-12px uppercase p-2 gap-1.5"
              >
                <span>Size</span>
                <div className="pb-0.5">
                  <SmallDropdownIcon
                    isOpen={
                      sortConfig
                        ? sortConfig.key === "fileSize" &&
                          sortConfig.direction === "ascending"
                        : false
                    }
                  />
                </div>
              </Clickable>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedFiles.map((file) => (
            <tr
              key={file.id}
              className="border-textTertiary border-b-2 relative"
            >
              <td
                style={{
                  width: `${columnWidths.name}px`,
                  maxWidth: `${columnWidths.name}px`,
                }}
                className="p-2 truncate"
              >
                {file.name}
              </td>
              <td
                style={{
                  width: `${columnWidths.path}px`,
                  maxWidth: `${columnWidths.path}px`,
                }}
                className="p-2 truncate"
              >
                <div className="flex items-center gap-1">
                  {formatPath(file.path).map((segment, index) => (
                    <span
                      key={index}
                      className={`${
                        index === formatPath(file.path).length - 1
                          ? "truncate"
                          : "flex items-center gap-1"
                      }`}
                    >
                      {segment}
                      {index < formatPath(file.path).length - 1 && (
                        <span>/</span>
                      )}
                    </span>
                  ))}
                </div>
              </td>
              <td
                style={{
                  width: `${columnWidths.fileSize}px`,
                  maxWidth: `${columnWidths.fileSize}px`,
                }}
                className="p-2 truncate"
              >
                <span className="">{file.fileSize} bytes</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}