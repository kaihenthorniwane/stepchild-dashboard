import { HTMLAttributes } from "react";

type Props = {
  children: React.ReactNode;
  additionalClasses?: HTMLAttributes<HTMLButtonElement>["className"];
  mode?: "primary" | "secondary";
  onClick?: () => void;
};

export default function Clickable({
  children,
  additionalClasses,
  mode,
  onClick,
}: Props) {
  return (
    <button
      className={`${additionalClasses ? additionalClasses : "flex"} ${
        mode === "primary"
          ? "text-textPrimary hover:text-textSecondary active:text-textTertiary active:translate-y-0.5"
          : "text-textSecondary hover:text-textPrimary active:text-textTertiary active:translate-y-0.5"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
