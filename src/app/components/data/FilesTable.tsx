import React, { useCallback, useEffect, useRef, useState } from "react";
import { StepchildFile } from "@/app/context/FilesContext";
import { SortConfig } from "@/app/panels/FilesPanel";
import TableHeader from "./TableHeader";
import TableResizer from "./TableResizer";
import TableRow from "./TableRow";

type Props = {
  sortedFiles: StepchildFile[];
  requestSort: (key: string) => void;
  sortConfig: SortConfig | null;
  selectedRowIds: number[];
  handleRowClick: (id: number) => void;
};

export type TableLayout = {
  breakpoint: "default" | "minimal";
  columnWidths: {
    icon: number;
    name: number;
    fileName: number;
    fileSize: number;
  };
  minimalColumnWidths: {
    icon: number;
    name: number;
    fileSize: number;
  };
};

export default function FilesTable({
  sortedFiles,
  requestSort,
  sortConfig,
  selectedRowIds,
  handleRowClick,
}: Props) {
  const [tableLayout, setTableLayout] = useState<TableLayout>({
    breakpoint: "default",
    columnWidths: {
      icon: 75, //fixed
      name: 0, //dynamic
      fileName: 0, //dynamic
      fileSize: 150, //fixed}
    },
    minimalColumnWidths: {
      icon: 75, //fixed
      name: 0, //dynamic
      fileSize: 150, //fixed
    },
  });

  const tableRef = useRef<HTMLDivElement>(null);
  const nameResizeRef = useRef<HTMLDivElement>(null);

  const handleResize = useCallback(
    (key: "name", delta: number) => {
      setTableLayout((prevLayout) => {
        const tableWidth = tableRef.current ? tableRef.current.offsetWidth : 0;
        const newWidths = {
          ...prevLayout.columnWidths,
          [key]: Math.max(prevLayout.columnWidths[key] + delta, 50),
        };

        const newUsedWidth =
          newWidths.icon + newWidths.name + newWidths.fileSize;
        newWidths.fileName = tableWidth - newUsedWidth;

        if (newWidths.fileName < 50) {
          const excess = 50 - newWidths.fileName;
          newWidths[key] -= excess;
          newWidths.fileName = 50;
        }

        return { ...prevLayout, columnWidths: newWidths };
      });
    },
    [setTableLayout]
  );

  useEffect(() => {
    const updatetableLayout = () => {
      if (tableRef.current) {
        const tableRect = tableRef.current.getBoundingClientRect();
        const tableWidth = tableRect.width;

        setTableLayout((prevLayout) => {
          const prevWidths = prevLayout.columnWidths;
          const prevFileNameWidth = prevWidths.fileName;
          const prevNameWidth = prevWidths.name;
          const prevTotalWidth = prevFileNameWidth + prevNameWidth;
          const fileSizeWidth = prevWidths.fileSize;
          const iconWidth = prevWidths.icon;
          const currentRemainingWidth = tableWidth - fileSizeWidth - iconWidth;
          const minimalNameWidth = currentRemainingWidth;

          if (tableWidth < 650) {
            return {
              breakpoint: "minimal",
              columnWidths: {
                icon: iconWidth,
                name: prevNameWidth,
                fileName: prevFileNameWidth,
                fileSize: fileSizeWidth,
              },
              minimalColumnWidths: {
                icon: iconWidth,
                name: minimalNameWidth,
                fileSize: fileSizeWidth,
              },
            };
          }

          const prevFileNameRatio = prevFileNameWidth / prevTotalWidth;
          const prevNameRatio = prevNameWidth / prevTotalWidth;
          const fileNameWidth =
            prevWidths.fileName === 0
              ? currentRemainingWidth / 2
              : currentRemainingWidth * prevFileNameRatio;
          const nameWidth =
            prevWidths.name === 0
              ? currentRemainingWidth / 2
              : currentRemainingWidth * prevNameRatio;

          return {
            breakpoint: "default",
            columnWidths: {
              icon: iconWidth,
              name: nameWidth,
              fileName: fileNameWidth,
              fileSize: fileSizeWidth,
            },
            minimalColumnWidths: {
              icon: iconWidth,
              name: minimalNameWidth,
              fileSize: fileSizeWidth,
            },
          };
        });
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updatetableLayout();
    });

    if (tableRef.current) {
      resizeObserver.observe(tableRef.current);
    }

    return () => {
      if (tableRef.current) {
        resizeObserver.unobserve(tableRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={tableRef}
      className="relative overflow-y-auto overflow-x-hidden flex-grow min-h-0"
    >
      {tableLayout.breakpoint === "default" && (
        <TableResizer
          ref={nameResizeRef}
          onResize={(delta) => handleResize("name", delta)}
          style={{
            left: `${
              tableLayout.columnWidths.name + tableLayout.columnWidths.icon
            }px`,
          }}
        />
      )}
      <table className="min-w-full table-fixed">
        <thead>
          <tr>
            <th></th>
            <TableHeader
              columnKey="name"
              label="Name"
              width={
                tableLayout.breakpoint === "default"
                  ? tableLayout.columnWidths.name
                  : tableLayout.minimalColumnWidths.name
              }
              requestSort={requestSort}
              sortConfig={sortConfig}
            />
            {tableLayout.breakpoint === "default" && (
              <TableHeader
                columnKey="path"
                label="Filename"
                width={tableLayout.columnWidths.fileName}
                requestSort={requestSort}
                sortConfig={sortConfig}
              />
            )}
            <TableHeader
              columnKey="fileSize"
              label="Size"
              width={tableLayout.columnWidths.fileSize}
              requestSort={requestSort}
              sortConfig={sortConfig}
            />
          </tr>
        </thead>
        <tbody>
          {sortedFiles.map((file) => (
            <TableRow
              file={file}
              tableLayout={tableLayout}
              key={file.id}
              isSelected={selectedRowIds.some((a) => a === file.id)}
              toggleSelected={handleRowClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
