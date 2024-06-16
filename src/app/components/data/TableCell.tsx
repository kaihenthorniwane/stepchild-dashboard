import React from "react";

type TableCellProps = {
  width: number;
  className?: string;
  children: React.ReactNode;
};

const TableCell = ({ width, children, className }: TableCellProps) => {
  return (
    <td
      style={{
        width: `${width}px`,
        maxWidth: `${width}px`,
      }}
      className={className || "p-2 truncate"}
    >
      {children}
    </td>
  );
};

export default TableCell;
