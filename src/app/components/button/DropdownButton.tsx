import React, { useEffect, useRef, useState } from "react";
import BackOfButtonFillLarge from "../button/backs/BackOfButtonFillLarge";
import BackOfButtonOutlineLarge from "../button/backs/BackOfButtonOutlineLarge";
import SmallDropdownIcon from "../icons/SmallDropdownIcon";
import Clickable from "./Clickable";

type DropdownButtonProps = {
  text: string;
  openedText?: string;
  direction: "upwards" | "downwards";
  children: React.ReactNode;
  mode?: "outline" | "fill";
  showIconWhenClosed?: boolean;
  ancestorLevelToCheck?: number;
  showDropdownIcon?: boolean;
  IconComponent?: React.ReactNode;
};

export default function DropdownButton({
  text,
  openedText,
  direction,
  children,
  mode = "outline",
  ancestorLevelToCheck,
  showDropdownIcon = true,
  showIconWhenClosed = true,
  IconComponent,
}: DropdownButtonProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [autoDirection, setAutoDirection] = useState<
    "upwards" | "downwards" | null
  >(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    if (menuRef.current && ancestorLevelToCheck) {
      const menuRect = menuRef.current.getBoundingClientRect();
      let ancestor: HTMLElement = menuRef.current;

      for (let i = 0; i < ancestorLevelToCheck; i++) {
        if (ancestor.parentElement) {
          ancestor = ancestor.parentElement;
        }
      }

      const ancestorRect = ancestor.getBoundingClientRect();
      const xPixelsClose = 150;
      if (menuRect.bottom >= ancestorRect.bottom - xPixelsClose) {
        setAutoDirection("upwards");
      } else {
        setAutoDirection("downwards");
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
            relative
            group-active/button:translate-y-0.5
           font-condensed text-32px
           ${
             mode === "fill"
               ? "text-bgPrimary"
               : "text-textPrimary group-hover/button:text-textSecondary"
           }
          `}
        >
          <div className="relative z-[5] flex gap-3 items-center  px-5 py-0.5 ">
            {IconComponent && showIconWhenClosed && IconComponent}
            <span>{text}</span>
            {showDropdownIcon && (
              <SmallDropdownIcon key={`${text}-dropdown-icon`} isOpen={false} />
            )}
          </div>
          {!isMenuOpen && (
            <>
              {mode === "outline" && <BackOfButtonOutlineLarge />}
              <BackOfButtonFillLarge mode={mode} />
            </>
          )}
        </div>
      </button>
      {isMenuOpen && (
        <div
          className={`absolute z-15 left-0 top-0 right-0 bottom-0 flex justify-end ${
            direction === "upwards" || autoDirection === "upwards"
              ? "items-end"
              : ""
          }`}
        >
          <div className="h-min relative">
            <div className="relative z-10 flex flex-col gap-2 px-5 pt-2 pb-5">
              <div className="flex justify-between items-center min-w-max">
                <div className="flex gap-2 items-center  mr-2">
                  {IconComponent && IconComponent}
                  {openedText ? openedText : text}
                </div>
                {showDropdownIcon && (
                  <Clickable
                    additionalClasses="p-2 -mr-2 -mt-2"
                    onClick={toggleMenu}
                  >
                    <SmallDropdownIcon
                      key={`${text}-dropdown-icon`}
                      isOpen={true}
                    />
                  </Clickable>
                )}
              </div>
              <div className="flex flex-col gap-3">{children}</div>
            </div>
            <BackOfButtonOutlineLarge />
            <BackOfButtonFillLarge mode="outline" />
          </div>
        </div>
      )}
    </div>
  );
}
