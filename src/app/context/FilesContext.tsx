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
