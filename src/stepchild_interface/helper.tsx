import { StepchildFile } from "@/app/context/FilesContext";

export const isStepchildFile = (item: any): item is StepchildFile => {
  return (
    typeof item.path === "string" &&
    typeof item.name === "string" &&
    typeof item.fileSize === "number" &&
    typeof item.id === "number" &&
    item.data instanceof ArrayBuffer
  );
};
