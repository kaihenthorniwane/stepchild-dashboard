import React from "react";

type TableCellProps = {
  width: number;
  content: string;
};

const TableCell: React.FC<TableCellProps> = ({ width, content }) => {
  return (
    <td
      style={{
        width: `${width}px`,
        maxWidth: `${width}px`,
      }}
      className="p-2 truncate"
    >
      {content}
    </td>
  );
};

export default TableCell;
