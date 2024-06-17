export default function MusicFileIcon({ selected }: { selected?: boolean }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      className={`${selected ? "animate-up-down-2px" : ""}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className={selected ? "fill-current" : "fill-textTertiary"}>
        <path d="M45 0V3L15 3V15H3V45H0V12H3V9H6V12H12V6H9V3L12 3V0H45Z" />
        <path d="M9 6H6V9H9V6Z" />
        <path d="M45 45V48H3L3 45H45Z" />
        <path d="M45 45H48V3L45 3V45Z" />
      </g>
      {!selected && (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M27 9V12H18V27H12V30H9V36H12V39H18V36H21V18H27V15H36V24H30V27H27V33H30V36H36V33H39V9H27ZM33 33H30V27H36V30H33V33ZM12 36H15V33H18V30H12V36Z"
          className="fill-current"
        />
      )}
      {selected && (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M39 12H36V15H33V18H30V21H27V24H24V27H21V30H18V27H15V24H12V21H9V24V27H12V30H15V33H18V36H21V33H24V30H27V27H30V24H33V21H36V18H39V15V12Z"
          className="fill-current"
        />
      )}
    </svg>
  );
}
