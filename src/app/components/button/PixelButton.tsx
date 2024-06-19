import BackOfButtonFillLarge from "./backs/BackOfButtonFillLarge";
import BackOfButtonFillSmall from "./backs/BackOfButtonFillSmall";
import BackOfButtonOutlineLarge from "./backs/BackOfButtonOutlineLarge";
import BackOfButtonOutlineSmall from "./backs/BackOfButtonOutlineSmall";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  IconComponent?: React.ReactNode;
  mode?: "fill" | "outline";
  size?: "small" | "large";
};

export default function PixelButton({
  children,
  mode = "fill",
  IconComponent,
  size = "large",
  onClick = () => {},
}: ButtonProps) {
  return (
    <button onClick={onClick} className="group/button h-min">
      <div
        className={`
        group-active/button:translate-y-0.5
        relative
        ${
          size === "small"
            ? "px-4 py-0.5 pt-1.5 font-pixel text-15px"
            : "px-5 py-0.5 font-condensed text-32px"
        } 
        ${
          mode === "outline"
            ? "text-textPrimary group-hover/button:text-textSecondary"
            : "text-bgPrimary "
        }`}
      >
        <div className="flex gap-3 justify-center items-center relative z-[3]">
          {IconComponent && IconComponent}
          {children}
        </div>
        {mode === "outline" && size === "large" && <BackOfButtonOutlineLarge />}
        {size === "large" && <BackOfButtonFillLarge mode={mode} />}
        {mode === "outline" && size === "small" && <BackOfButtonOutlineSmall />}
        {size === "small" && <BackOfButtonFillSmall mode={mode} />}
      </div>
    </button>
  );
}
