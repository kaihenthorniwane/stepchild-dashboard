import BackOfButtonFillLarge from "./backs/BackOfButtonFillLarge";
import BackOfButtonFillSmall from "./backs/BackOfButtonFillSmall";
import BackOfButtonOutlineLarge from "./backs/BackOfButtonOutlineLarge";
import BackOfButtonOutlineSmall from "./backs/BackOfButtonOutlineSmall";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  mode?: "fill" | "outline";
  size?: "small" | "large";
};

export default function Button({
  children,
  mode = "fill",
  size = "large",
  onClick = () => {},
}: ButtonProps) {
  return (
    <button onClick={onClick} className="group h-min">
      <div
        className={`
        flex items-center relative
        group-active:translate-y-0.5
        ${
          size === "small"
            ? "px-4 py-1 pt-2 font-pixel text-15px"
            : "px-5 py-1 font-condensed text-32px"
        } 
        ${
          mode === "outline"
            ? "text-textPrimary group-hover:text-textSecondary"
            : "text-bgPrimary "
        }`}
      >
        {children}
        {mode === "outline" && size === "large" && <BackOfButtonOutlineLarge />}
        {mode === "fill" && size === "large" && (
          <BackOfButtonFillLarge mode={mode} />
        )}
        {mode === "outline" && size === "small" && <BackOfButtonOutlineSmall />}
        {mode === "fill" && size === "small" && (
          <BackOfButtonFillSmall mode={mode} />
        )}
      </div>
    </button>
  );
}
