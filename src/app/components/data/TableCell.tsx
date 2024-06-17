import React from "react";

type TableCellProps = {
  width: number;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const TableCell = ({ width, children, className, style }: TableCellProps) => {
  return (
    <td
      style={{
        width: `${width}px`,
        maxWidth: `${width}px`,
        ...style,
      }}
      className={className || "p-2 truncate "}
    >
      {children}
    </td>
  );
};

export default TableCell;
