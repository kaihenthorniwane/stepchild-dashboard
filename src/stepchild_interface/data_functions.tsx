import { StepchildFile } from "@/app/context/FilesContext";
import { isStepchildFile } from "./helper";
import StepchildSerialInterface from "./StepchildSerialInterface/interface.js";

export const loadDataFromStepChild = async (): Promise<StepchildFile[]> => {

  const stepchildSerialPort = new StepchildSerialInterface();
  
  await stepchildSerialPort.connect();

  const data : any = await stepchildSerialPort.downloadFilesystem();

  // const data: any = "some data"; // This will be replaced by the actual data from stepchild

  const parsedData = JSON.parse(data);

  if (Array.isArray(parsedData) && parsedData.every(isStepchildFile)) {
    return parsedData;
  } else {
    throw new Error("Invalid data: Expected an array of StepchildFile objects");
  }
};