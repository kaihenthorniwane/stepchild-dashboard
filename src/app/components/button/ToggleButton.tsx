import { motion } from "framer-motion";
import Clickable from "./Clickable";
import BackOfButtonFillSmall from "./backs/BackOfButtonFillSmall";
import BackOfButtonOutlineLarge from "./backs/BackOfButtonOutlineLarge";

type ToggleOption = {
  text: string;
  IconComponent?: React.ReactNode;
  handleClick: () => void;
  isSelected: boolean;
};

type Props = {
  toggleOptions: ToggleOption[];
  id: string;
};

export default function ToggleButton({ toggleOptions, id }: Props) {
  return (
    <div className="flex justify-stretch relative p-1">
      {toggleOptions.map((option, index) => (
        <div
          className="relative flex w-full"
          key={`${option.text}-toggle-option-${index}`}
        >
          <Clickable
            key={index}
            additionalClasses={`relative flex z-[3] px-4 py-2 w-full ${
              option.isSelected ? "invert-colors" : ""
            }`}
            onClick={!option.isSelected ? option.handleClick : () => {}}
          >
            {option.IconComponent && option.IconComponent}
            <span className="w-full ">{option.text}</span>
          </Clickable>
          {option.isSelected && (
            <motion.div
              className="absolute left-0 top-0 right-0 bottom-0"
              layout="position"
              transition={{ duration: 0.2, ease: "circOut" }}
              layoutId={`toggle-bg-${id}`}
            >
              <BackOfButtonFillSmall mode={"fill"} />
            </motion.div>
          )}
        </div>
      ))}
      <BackOfButtonOutlineLarge />
    </div>
  );
}
