type Props = {
  mode: "fill" | "outline";
};

export default function BackOfButtonFillLarge({ mode }: Props) {
  return (
    <div
      className={`grid grid-cols-[auto,1fr,auto] grid-rows-[auto,1fr,auto] 
    w-full h-full absolute left-0 top-0 right-0 bottom-0 z-[-2]
    ${
      mode === "fill"
        ? "text-textPrimary group-hover:text-textSecondary"
        : "text-bgPrimary group-hover:text-textTertiary"
    }`}
    >
      <TopLeft rotation={0} />
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
    className="w-full h-full"
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
