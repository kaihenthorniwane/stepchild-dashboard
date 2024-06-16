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

function arrayBufferToString(buffer: ArrayBuffer) {
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(buffer);
}
