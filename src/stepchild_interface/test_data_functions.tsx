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
      path: "/SAVES/ambient_sounds_01.child",
      name: "Ambient Sounds 01",
      fileSize: 300,
      id: 1,
      data: generateRandomArrayBuffer(300),
    },
    {
      path: "/SAVES/session_2023_05_15.child",
      name: "Session 2023-05-15",
      fileSize: 400,
      id: 2,
      data: generateRandomArrayBuffer(400),
    },
    {
      path: "/SAVES/synthwave_bassline.child",
      name: "Synthwave Bassline",
      fileSize: 500,
      id: 3,
      data: generateRandomArrayBuffer(500),
    },
    {
      path: "/SAVES/idea_sketch_01.child",
      name: "Idea Sketch 01",
      fileSize: 350,
      id: 4,
      data: generateRandomArrayBuffer(350),
    },
    {
      path: "/SAVES/mixdown_final_v2.child",
      name: "Mixdown Final V2",
      fileSize: 450,
      id: 5,
      data: generateRandomArrayBuffer(450),
    },
  ];
  return new Promise((resolve) => setTimeout(() => resolve(data), 1000));
};
