import { useEffect, useRef, useState } from "react";
import PixelButton from "../button/PixelButton";
import DownloadIcon from "../icons/DownloadIcon";
import BackOfButtonFillLarge from "../button/backs/BackOfButtonFillLarge";
import BackOfButtonOutlineLarge from "../button/backs/BackOfButtonOutlineLarge";

type Props = {
  data: ArrayBuffer;
  id: number;
};

export default function DownloadMenuButton({ data, id }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuDirection, setMenuDirection] = useState("downwards");
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    if (menuRef.current) {
      const menuRect = menuRef.current.getBoundingClientRect();
      let ancestor: HTMLElement = menuRef.current;

      for (let i = 0; i < 6; i++) {
        if (ancestor.parentElement) {
          ancestor = ancestor.parentElement;
        }
      }

      const ancestorRect = ancestor.getBoundingClientRect();
      const xPixelsClose = 150;
      if (menuRect.bottom >= ancestorRect.bottom - xPixelsClose) {
        setMenuDirection("upwards");
      } else {
        setMenuDirection("downwards");
      }
    }
    setIsMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="relative z-50 flex flex-col" ref={menuRef}>
      <button className="relative group/button h-min" onClick={toggleMenu}>
        <div
          className={`
          ${isMenuOpen ? "z-[0]" : "z-[5]"}
            flex items-center relative
            group-active/button:translate-y-0.5
            px-5 py-0.5 font-condensed text-32px
            text-textPrimary group-hover/button:text-textSecondary`}
        >
          <span>Download</span>
        </div>
        {!isMenuOpen && (
          <>
            <BackOfButtonOutlineLarge />
            <BackOfButtonFillLarge mode={"outline"} />
          </>
        )}
      </button>
      {isMenuOpen && (
        <div
          className={`absolute z-15 left-0 top-0 right-0 bottom-0 flex justify-end ${
            menuDirection === "upwards" ? "items-end" : ""
          }`}
        >
          <div className="h-min relative">
            <div className="relative z-10 flex flex-col gap-3 px-5 pt-2 pb-3">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <DownloadIcon />
                  <span className="w-max">Download as</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <PixelButton mode="fill" size="small">
                    .MIDI
                  </PixelButton>
                  <PixelButton mode="fill" size="small">
                    .CHILD
                  </PixelButton>
                </div>
              </div>
              <p className="text-12px font-regular text-textSecondary">
                YOU CAN SET YOUR DEFAULT DOWNLOAD OPTION IN SETTINGS.
              </p>
            </div>

            <BackOfButtonOutlineLarge />
            <BackOfButtonFillLarge mode={"outline"} />
          </div>
        </div>
      )}
    </div>
  );
}
