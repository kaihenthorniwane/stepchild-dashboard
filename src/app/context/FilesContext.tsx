"use client";

import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
} from "react";

export type StepchildFile = {
  path: string;
  name: string;
  fileSize: number;
  id: number;
  data: ArrayBuffer;
};

export type StepchildState = {
  files: StepchildFile[];
};

const initialState: StepchildState = {
  files: [],
};

// Helper function to generate random ArrayBuffer
const generateRandomArrayBuffer = (size: number): ArrayBuffer => {
  const buffer = new ArrayBuffer(size);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < size; i++) {
    view[i] = Math.floor(Math.random() * 256);
  }
  return buffer;
};

export const loadDataFromStepchild = async (): Promise<StepchildFile[]> => {
  // Mock function to simulate loading data from Stepchild
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
  return new Promise((resolve) => setTimeout(() => resolve(data), 1000)); // Simulate async call
};

type Action = { type: "SET_FILES"; payload: StepchildFile[] };

const reducer = (state: StepchildState, action: Action): StepchildState => {
  switch (action.type) {
    case "SET_FILES":
      return { ...state, files: action.payload };
    default:
      return state;
  }
};

const FilesContext = createContext<{
  state: StepchildState;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const FilesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <FilesContext.Provider value={{ state, dispatch }}>
      {children}
    </FilesContext.Provider>
  );
};

export const useFiles = () => useContext(FilesContext);
