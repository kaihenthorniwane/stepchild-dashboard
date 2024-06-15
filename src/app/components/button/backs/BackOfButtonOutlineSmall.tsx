export default function BackOfButtonOutlineSmall() {
  return (
    <div
      className="grid grid-cols-[auto,1fr,auto] grid-rows-[auto,1fr,auto] 
    w-full h-full absolute left-0 top-0 right-0 bottom-0 z-[-1]
    text-textPrimary group-hover:text-textSecondary"
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
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="currentColor"
    style={{ transform: `rotate(${rotation}deg)` }}
    className="min-w-3.5 max-w-3.5 w-3.5 min-h-3.5 max-h-3.5 h-3.5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1.74846e-07 14L0 10L2 10L2 14L1.74846e-07 14Z" />
    <path d="M2 10L2 6H4L4 10H2Z" />
    <path d="M6 4V2H10V4H6Z" />
    <path d="M4 6L4 4L6 4V6L4 6Z" />
    <path d="M10 2L10 1.74846e-07L14 0V2L10 2Z" />
  </svg>
);

const Top = ({ rotation }: { rotation: number }) => (
  <svg
    viewBox="0 0 114 14"
    preserveAspectRatio="none"
    fill="currentColor"
    style={{ transform: `rotate(${rotation}deg)` }}
    className="min-h-3.5 max-h-3.5 h-3.5 w-full"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="114" height="2" />
  </svg>
);
const Middle = () => (
  <svg
    preserveAspectRatio="none"
    viewBox="0 0 114 14"
    fill="none"
    className="w-full h-full opacity-0"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="114" height="14" />
  </svg>
);

const Left = ({ rotation }: { rotation: number }) => (
  <svg
    viewBox="0 0 14 14"
    fill="currentColor"
    preserveAspectRatio="none"
    className="min-w-3.5 max-w-3.5 w-3.5 h-full"
    style={{ transform: `rotate(${rotation}deg)` }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="2" height="14" />
  </svg>
);
