import { useTheme } from "@/app/context/ThemeContext";
import PixelButton from "../button/PixelButton";

export default function ThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col gap-2 items-start">
      <PixelButton onClick={toggleTheme} mode="fill" size="large">
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </PixelButton>

      <PixelButton onClick={toggleTheme} mode="fill" size="small">
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </PixelButton>

      <PixelButton onClick={toggleTheme} mode="outline" size="large">
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </PixelButton>

      <PixelButton onClick={toggleTheme} mode="outline" size="small">
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </PixelButton>
    </div>
  );
}
