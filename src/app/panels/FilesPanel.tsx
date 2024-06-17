import React, { useState, useMemo, useEffect } from "react";
import { StepchildFile } from "../context/FilesContext";
import FilesTable from "../components/data/FilesTable";

type Props = {
  files: StepchildFile[];
};

export type SortConfig = {
  key: string;
  direction: "ascending" | "descending";
};

function isStepchildFileKey(key: string): key is keyof StepchildFile {
  return ["path", "name", "fileSize", "id", "data"].includes(key);
}

export default function FilesPanel({ files }: Props) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);

  const sortedFiles = useMemo(() => {
    let sortableFiles = [...files];
    const thisKey = sortConfig ? sortConfig.key : null;
    if (sortConfig && thisKey && isStepchildFileKey(thisKey)) {
      sortableFiles.sort((a, b) => {
        if (a[thisKey] < b[thisKey]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[thisKey] > b[thisKey]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableFiles;
  }, [files, sortConfig]);

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleRowClick = (id: number) => {
    setSelectedRowIds((prev) => {
      if (prev.some((a) => a === id)) {
        return prev.filter((a) => a !== id);
      }
      return [...prev, id];
    });
  };

  const handleShiftRowClick = (id: number) => {
    setSelectedRowIds((prev) => {
      const lastSelected = prev[prev.length - 1];
      const lastSelectedIndex = sortedFiles.findIndex(
        (file) => file.id === lastSelected
      );
      const clickedIndex = sortedFiles.findIndex((file) => file.id === id);
      const newSelection = sortedFiles.slice(
        Math.min(lastSelectedIndex, clickedIndex),
        Math.max(lastSelectedIndex, clickedIndex) + 1
      );
      return newSelection.map((file) => file.id);
    });
  };

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
  }, [sortedFiles, selectedRowIds]);

  return (
    <div className="p-6 min-w-0 min-h-0 flex flex-col">
      <span className="font-slab text-56px text-left">Files</span>
      <FilesTable
        sortedFiles={sortedFiles}
        requestSort={requestSort}
        sortConfig={sortConfig}
        selectedRowIds={selectedRowIds}
        handleRowClick={handleRowClick}
        handleShiftRowClick={handleShiftRowClick}
      />
    </div>
  );
}
