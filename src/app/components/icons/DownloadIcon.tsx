export default function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      width="23"
      height="21"
      viewBox="0 0 23 21"
      className={`overflow-visible fill-current ${
        className ? className : "bg-bgPrimary"
      }`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 0H10V9H7V6H4V9H7V12H10V15H13V12H16V9H19V6H16V9H13V0Z"
        className="animate-up-down-2px"
      />
      <rect y="18" width="23" height="3" />
    </svg>
  );
}
