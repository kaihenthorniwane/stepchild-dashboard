import { StepchildFile } from "@/app/context/FilesContext";
import { isStepchildFile } from "./helper";

export const loadDataFromStepChild = async (): Promise<StepchildFile[]> => {
  const data: any = "some data"; // This will be replaced by the actual data from stepchild

  const parsedData = JSON.parse(data);

  if (Array.isArray(parsedData) && parsedData.every(isStepchildFile)) {
    return parsedData;
  } else {
    throw new Error("Invalid data: Expected an array of StepchildFile objects");
  }
};