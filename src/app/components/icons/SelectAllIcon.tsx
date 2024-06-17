export default function SelectAllIcon({ selected }: { selected?: boolean }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      className="fill-current"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23 0H3V3H0V23H3V26H23V23H26V3H23V0ZM23 3V23H3V3H23Z"
      />
      {selected && (
        <>
          <rect x="3" y="3" width="20" height="20" />
          <path
            d="M21 7H18V10H15V13H12V16H9V13H6V16H9V19H12V16H15V13H18V10H21V7Z"
            className="fill-bgPrimary"
          />
        </>
      )}
    </svg>
  );
}
