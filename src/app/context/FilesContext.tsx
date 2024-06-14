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
};

export type StepchildState = {
  files: StepchildFile[];
};

const initialState: StepchildState = {
  files: [],
};

export async function loadDataFromStepchild(): Promise<StepchildFile[]> {
  // Mock function to simulate loading data from Stepchild
  const data: StepchildFile[] = [
    { path: "root/saves/save1.child", name: "Save 1", fileSize: 1024, id: 1 },
    { path: "root/saves/save2.child", name: "Save 2", fileSize: 2048, id: 2 },
    { path: "root/saves/save3.child", name: "Save 3", fileSize: 512, id: 3 },
    { path: "root/saves/save4.child", name: "Save 4", fileSize: 256, id: 4 },
    { path: "root/saves/save5.child", name: "Save 5", fileSize: 4096, id: 5 },
  ];
  return new Promise((resolve) => setTimeout(() => resolve(data), 1000)); // Simulate async call
}

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
