import { useState } from "react";
import { StepchildFile } from "@/app/context/FilesContext";
import TableCell from "./TableCell";
import MusicFileIcon from "../icons/MusicFileIcon";
import ActionCell from "./ActionCell";
import { TableLayout } from "./FilesTable";

function formatPath(path: string): string {
  return path.split("/")[path.split("/").length - 1];
}

type TableRowProps = {
  file: StepchildFile;
  tableLayout: TableLayout;
  isSelected: boolean;
  toggleSelected: (id: number) => void;
  toggleShiftSelected: (id: number) => void;
};

export default function TableRow({
  file,
  isSelected,
  toggleSelected,
  toggleShiftSelected,
  tableLayout,
}: TableRowProps) {
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

  const className = isSelected
    ? "animate-up-down-2px truncate p-2"
    : "truncate p-2";
  const getDelays = (index: number): React.CSSProperties => {
    return {
      animationDelay: `${index * -150}ms`,
      animationFillMode: "both",
    };
  };

  return (
    <tr
      key={file.id}
      tabIndex={0}
      className={`border-textTertiary text-textPrimary bg-bgPrimary border-b-2 relative select-none ${
        isSelected ? "invert-colors" : ""
      }`}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <TableCell width={tableLayout.columnWidths.icon} className="p-3">
        <MusicFileIcon selected={isSelected} />
      </TableCell>

      <TableCell
        width={tableLayout.columnWidths.name}
        className={className}
        style={getDelays(1)}
      >
        {file.name}
      </TableCell>
      {tableLayout.breakpoint === "default" && (
        <TableCell
          width={tableLayout.columnWidths.fileName}
          className={className}
          style={getDelays(2)}
        >
          {formatPath(file.path)}
        </TableCell>
      )}
      <TableCell
        width={tableLayout.columnWidths.fileSize}
        className={className}
        style={getDelays(3)}
      >
        {`${file.fileSize} bytes`}
      </TableCell>
      <ActionCell shown={isHovered} data={file.data} id={file.id} />
    </tr>
  );
}
