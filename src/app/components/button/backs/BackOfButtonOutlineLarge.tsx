export default function BackOfButtonOutlineLarge() {
  return (
    <div
      className="grid grid-cols-[auto,1fr,auto] grid-rows-[auto,1fr,auto] 
    w-full h-full absolute left-0 top-0 right-0 bottom-0 z-[-1]
    text-textPrimary group-hover/button:text-textSecondary"
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
    <path d="M1.74846e-07 16L0 12H2L2 16H1.74846e-07Z" />
    <path d="M2 12L2 8H4L4 12L2 12Z" />
    <path d="M8 4V2L12 2V4L8 4Z" />
    <path d="M4 8L4 6H6L6 8H4Z" />
    <path d="M6 6V4H8L8 6L6 6Z" />
    <path d="M12 2L12 1.74846e-07L16 0V2L12 2Z" />
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
    <rect width="114" height="2" />
  </svg>
);
const Middle = () => (
  <svg
    preserveAspectRatio="none"
    viewBox="0 0 114 16"
    fill="none"
    className="w-full h-full opacity-0"
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
    className="min-w-4 max-w-4 w-4 h-full"
    style={{ transform: `rotate(${rotation}deg)` }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="2" height="16" />
  </svg>
);
