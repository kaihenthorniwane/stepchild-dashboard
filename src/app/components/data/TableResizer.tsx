import React, { useCallback, forwardRef } from "react";

type ResizerProps = {
  onResize: (delta: number) => void;
  style: React.CSSProperties;
};

const TableResizer = forwardRef<HTMLDivElement, ResizerProps>(
  ({ onResize, style }, ref) => {
    const handleMouseDown = useCallback(
      (event: React.MouseEvent) => {
        let startX = event.clientX;

        const handleMouseMove = (moveEvent: MouseEvent) => {
          const delta = moveEvent.clientX - startX;
          onResize(delta);
          startX = moveEvent.clientX; // Reset startX to current mouse position
        };

        const handleMouseUp = () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      },
      [onResize]
    );

    return (
      <div
        style={style}
        ref={ref}
        className="absolute top-0 z-10 h-8 w-0 select-none "
      >
        <div
          onMouseDown={handleMouseDown}
          className="absolute border-transparent cursor-col-resize top-0 bottom-0 -left-2 -right-2 group"
        >
          <div className="absolute top-0 right-1.5 bottom-0 left-1.5 group-hover:bg-textSecondary "></div>
        </div>
      </div>
    );
  }
);

TableResizer.displayName = "TableResizer";

export default TableResizer;
