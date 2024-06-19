type Props = {
  mode: "fill" | "outline" | "file";
};

export default function BackOfButtonFillLarge({ mode }: Props) {
  return (
    <div
      className={`grid grid-cols-[auto,1fr,auto] grid-rows-[auto,1fr,auto] 
    w-full h-full absolute left-0 top-0 right-0 bottom-0 z-[0]
    rounded-full
    ${
      mode === "fill"
        ? " text-textPrimary group-hover/button:text-textSecondary "
        : " text-bgPrimary "
    }`}
    >
      {mode === "file" && <FileTopLeft />}
      {mode !== "file" && <TopLeft rotation={0} />}
      <Top rotation={0} />
      <TopLeft rotation={90} />
      <Left rotation={0} />
      <Middle />
      <Left rotation={180} />
      <TopLeft rotation={270} />
      <Top rotation={180} />
      <TopLeft rotation={180} />
    </div>
  );
}

const FileTopLeft = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14 0L14 2L12 2L12 4H10L10 6H8L8 8H6L6 10H4L4 12H2L2 14H0V16H2H4H6H8H10H12H14L16 16V14V0H14Z"
    />
  </svg>
);

const TopLeft = ({ rotation }: { rotation: number }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    style={{ transform: `rotate(${rotation}deg)` }}
    className="min-w-4 max-w-4 w-4 min-h-4 max-h-4 h-4"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16 0H12V2H8V4H6V6H4V8H2V12H0V16H16V0Z" />
  </svg>
);

const Top = ({ rotation }: { rotation: number }) => (
  <svg
    viewBox="0 0 114 16"
    preserveAspectRatio="none"
    fill="currentColor"
    style={{ transform: `rotate(${rotation}deg)` }}
    className="min-h-4 max-h-4 h-4 w-full"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="114" height="16" />
  </svg>
);

const Middle = () => (
  <svg
    preserveAspectRatio="none"
    viewBox="0 0 114 16"
    fill="currentColor"
    className="w-full h-full scale-105"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="114" height="16" />
  </svg>
);

const Left = ({ rotation }: { rotation: number }) => (
  <svg
    viewBox="0 0 16 16"
    fill="currentColor"
    preserveAspectRatio="none"
    style={{ transform: `rotate(${rotation}deg)` }}
    className="min-w-4 max-w-4 w-4 h-full"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="16" height="16" />
  </svg>
);
