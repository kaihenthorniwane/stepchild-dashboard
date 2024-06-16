type Props = {
  isOpen: boolean;
};

export default function SmallDropdownIcon({ isOpen }: Props) {
  return (
    <svg
      width="10"
      height="7"
      viewBox="0 0 10 7"
      fill="currentColor"
      className="transition-transform"
      style={{ transform: isOpen ? "rotate(-180deg)" : "rotate(0deg)" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y="0.5" width="2" height="2" />
      <rect width="2" height="2" transform="matrix(-1 0 0 1 10 0.5)" />
      <rect x="2" y="2.5" width="2" height="2" />
      <rect width="2" height="2" transform="matrix(-1 0 0 1 8 2.5)" />
      <rect x="4" y="4.5" width="2" height="2" />
    </svg>
  );
}
