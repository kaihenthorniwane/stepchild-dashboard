import { StepchildFile } from "@/app/context/FilesContext";

const generateRandomArrayBuffer = (size: number): ArrayBuffer => {
  const buffer = new ArrayBuffer(size);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < size; i++) {
    view[i] = Math.floor(Math.random() * 256);
  }
  return buffer;
};

export const loadTestData = async (): Promise<StepchildFile[]> => {
  const data: StepchildFile[] = [
    {
      path: "root/saves/save1.child",
      name: "Save 1",
      fileSize: 300,
      id: 1,
      data: generateRandomArrayBuffer(300),
    },
    {
      path: "root/saves/save2.child",
      name: "Save 2",
      fileSize: 400,
      id: 2,
      data: generateRandomArrayBuffer(400),
    },
    {
      path: "root/saves/save3.child",
      name: "Save 3",
      fileSize: 500,
      id: 3,
      data: generateRandomArrayBuffer(500),
    },
    {
      path: "root/saves/save4.child",
      name: "Save 4",
      fileSize: 350,
      id: 4,
      data: generateRandomArrayBuffer(350),
    },
    {
      path: "root/saves/save5.child",
      name: "Save 5",
      fileSize: 450,
      id: 5,
      data: generateRandomArrayBuffer(450),
    },
  ];
  return new Promise((resolve) => setTimeout(() => resolve(data), 1000));
};
